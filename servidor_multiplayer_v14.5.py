#!/usr/bin/env python3
"""Oito Entradas v14.5 · pacote de jogo 22.3 - servidor HTTP e salas WebSocket para Render/LAN.
Sem bibliotecas externas. Até 4 pessoas por sala, código aleatório de 6 caracteres.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from socketserver import ThreadingMixIn
from pathlib import Path
import base64, hashlib, json, os, secrets, socket, struct, threading, time, urllib.parse, webbrowser

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8765"))
HOST = os.environ.get("HOST", "0.0.0.0")
MAX_PLAYERS = 4
ALLOWED_CLASSES = {"survivor", "soldier", "medic", "rescuer", "explorer", "scout", "engineer", "carpenter", "mechanic", "farmer", "hunter", "watchman", "cook", "scientist", "locksmith", "mason", "citizen", "cartographer", "navigator", "commander", "mayor", "tourist", "hybrid", "hybrid_vampire", "hybrid_werewolf"}
CODES = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
ROOMS = {}
LOCK = threading.RLock()
EDITOR_CONFIG_PATH = Path(os.environ.get("EDITOR_CONFIG_PATH", str(Path(os.environ.get("RENDER_DISK_PATH", ROOT)) / "editor_config.json")))
MAX_EDITOR_CONFIG_BYTES = 2_000_000

def load_editor_config():
    try:
        if EDITOR_CONFIG_PATH.exists():
            data = json.loads(EDITOR_CONFIG_PATH.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else {}
    except Exception as exc:
        print("[EDITOR] Não foi possível ler configuração:", exc)
    return {}

def save_editor_config(data):
    EDITOR_CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    temp = EDITOR_CONFIG_PATH.with_suffix(".tmp")
    temp.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    temp.replace(EDITOR_CONFIG_PATH)

class RoomError(Exception): pass

def safe_name(value):
    name = " ".join(str(value or "Sobrevivente").split())[:18]
    return name or "Sobrevivente"

def safe_class_id(value):
    value = str(value or "survivor").strip().lower()
    return value if value in ALLOWED_CLASSES else "survivor"

def send_frame(handler, payload, opcode=1):
    if isinstance(payload, str): payload = payload.encode("utf-8")
    n = len(payload)
    if n < 126: head = bytes([0x80 | opcode, n])
    elif n < 65536: head = bytes([0x80 | opcode, 126]) + struct.pack("!H", n)
    else: head = bytes([0x80 | opcode, 127]) + struct.pack("!Q", n)
    with handler._send_lock:
        handler.wfile.write(head + payload)
        handler.wfile.flush()

def read_exact(stream, count):
    chunks=[]; remain=count
    while remain:
        data=stream.read(remain)
        if not data: return None
        chunks.append(data); remain-=len(data)
    return b"".join(chunks)

def read_frame(handler):
    head=read_exact(handler.rfile,2)
    if not head: return None,None
    b1,b2=head; opcode=b1&0x0f; masked=bool(b2&0x80); size=b2&0x7f
    if size==126:
        ext=read_exact(handler.rfile,2)
        if not ext:return None,None
        size=struct.unpack("!H",ext)[0]
    elif size==127:
        ext=read_exact(handler.rfile,8)
        if not ext:return None,None
        size=struct.unpack("!Q",ext)[0]
    if size>2_500_000: raise RoomError("Mensagem muito grande.")
    mask=read_exact(handler.rfile,4) if masked else None
    payload=read_exact(handler.rfile,size)
    if payload is None:return None,None
    if masked: payload=bytes(v^mask[i%4] for i,v in enumerate(payload))
    return opcode,payload

def player_list(room):
    return [{"id":p["id"],"name":p["name"],"classId":p.get("class_id", "survivor"),"role":"host" if p["id"]==room["host_id"] else "guest"} for p in room["players"].values()]

def send_json(peer, obj):
    try: send_frame(peer, json.dumps(obj,separators=(",",":"),ensure_ascii=False))
    except Exception: pass

def room_broadcast(room, obj, exclude=None):
    for pid, peer in list(room["players"].items()):
        if pid != exclude: send_json(peer["conn"], obj)

def make_code():
    for _ in range(100):
        code="".join(secrets.choice(CODES) for _ in range(6))
        if code not in ROOMS:return code
    raise RoomError("Não foi possível gerar um código. Tente novamente.")

class Handler(SimpleHTTPRequestHandler):
    protocol_version="HTTP/1.1"
    def __init__(self,*args,**kwargs):
        self._send_lock=threading.Lock(); self.peer_id=None; self.room_code=None; self.name="Sobrevivente"; self.class_id="survivor"
        super().__init__(*args,directory=str(ROOT),**kwargs)
    def log_message(self,fmt,*args):
        # Keep console output useful without dumping message payloads.
        print("[HTTP]",fmt%args)
    def do_GET(self):
        parsed=urllib.parse.urlparse(self.path)
        if parsed.path!="/ws":
            if parsed.path == "/api/editor-config":
                body=json.dumps({"config":load_editor_config()},ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type","application/json; charset=utf-8")
                self.send_header("Cache-Control","no-store")
                self.send_header("Content-Length",str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            if parsed.path in ("/healthz", "/health"):
                body=json.dumps({"status":"ok","version":"22.3"}).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            if parsed.path in ("/", "/index.html", "/game"):
                self.path="/index.html"
            elif parsed.path in ("/editor", "/editor.html"):
                self.path="/editor.html"
            return super().do_GET()
        key=self.headers.get("Sec-WebSocket-Key")
        if not key or self.headers.get("Upgrade","").lower()!="websocket":
            self.send_error(400,"WebSocket upgrade required"); return
        accept=base64.b64encode(hashlib.sha1((key+"258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode()).digest()).decode()
        self.send_response(101,"Switching Protocols")
        self.send_header("Upgrade","websocket"); self.send_header("Connection","Upgrade"); self.send_header("Sec-WebSocket-Accept",accept)
        self.end_headers()
        self.close_connection=True
        try: self.websocket_loop()
        except (BrokenPipeError,ConnectionResetError,ConnectionAbortedError): pass
        except Exception as exc: print("[WS] conexão encerrada:",exc)
        finally: self.remove_peer()
    def do_POST(self):
        parsed=urllib.parse.urlparse(self.path)
        if parsed.path != "/api/editor-config":
            self.send_error(404,"Not found"); return
        expected=os.environ.get("EDITOR_TOKEN","").strip()
        supplied=self.headers.get("X-Editor-Token","").strip()
        if not expected:
            self.send_error(503,"Configure EDITOR_TOKEN nas variáveis de ambiente do Render."); return
        if not secrets.compare_digest(supplied,expected):
            self.send_error(403,"Token do editor inválido."); return
        try:
            length=int(self.headers.get("Content-Length","0"))
            if length<=0 or length>MAX_EDITOR_CONFIG_BYTES:
                self.send_error(413,"Configuração vazia ou maior que 2 MB."); return
            raw=self.rfile.read(length)
            data=json.loads(raw.decode("utf-8"))
            if not isinstance(data,dict) or not isinstance(data.get("enemies",{}),dict):
                self.send_error(400,"Formato de configuração inválido."); return
            save_editor_config(data)
            body=json.dumps({"ok":True,"saved":True},ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type","application/json; charset=utf-8")
            self.send_header("Cache-Control","no-store")
            self.send_header("Content-Length",str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            print("[EDITOR] Configuração atualizada pelo editor.")
        except (ValueError,UnicodeDecodeError,json.JSONDecodeError) as exc:
            self.send_error(400,"JSON inválido.")
        except Exception as exc:
            print("[EDITOR] Erro ao salvar:",exc)
            self.send_error(500,"Não foi possível salvar a configuração.")

    def websocket_loop(self):
        while True:
            opcode,payload=read_frame(self)
            if opcode is None or opcode==8: break
            if opcode==9:
                send_frame(self,payload or b"",opcode=10); continue
            if opcode!=1: continue
            try: msg=json.loads(payload.decode("utf-8"))
            except Exception:
                send_json(self,{"type":"ERROR","message":"Mensagem inválida."}); continue
            if not isinstance(msg,dict): continue
            try: self.handle_message(msg)
            except RoomError as exc: send_json(self,{"type":"ERROR","message":str(exc)})
    def handle_message(self,msg):
        kind=msg.get("type")
        if kind=="CREATE":
            if self.peer_id: self.remove_peer()
            with LOCK:
                code=make_code(); pid=secrets.token_hex(8); self.peer_id=pid; self.room_code=code; self.name=safe_name(msg.get("name")); self.class_id=safe_class_id(msg.get("classId"))
                room={"code":code,"host_id":pid,"players":{},"started":False,"last_state":None,"created":time.time()}
                room["players"][pid]={"id":pid,"name":self.name,"class_id":self.class_id,"conn":self}
                ROOMS[code]=room
            send_json(self,{"type":"ROOM","code":code,"selfId":pid,"role":"host","players":player_list(room)})
            print(f"[SALA] {code} criada por {self.name}")
            return
        if kind=="JOIN":
            if self.peer_id:self.remove_peer()
            code="".join(c for c in str(msg.get("code"," ")).upper() if c in CODES)[:6]
            with LOCK:
                room=ROOMS.get(code)
                if not room: raise RoomError("Sala não encontrada. Confira o código.")
                if len(room["players"])>=MAX_PLAYERS: raise RoomError("Esta sala já tem quatro jogadores.")
                selected=safe_class_id(msg.get("classId"))
                if selected in {"commander", "mayor"} and any(p.get("class_id")==selected for p in room["players"].values()):
                    label="Comandante" if selected=="commander" else "Prefeito"
                    raise RoomError("Esta sala já tem um "+label+". Só pode haver um por equipe.")
                pid=secrets.token_hex(8); self.peer_id=pid; self.room_code=code; self.name=safe_name(msg.get("name")); self.class_id=selected
                room["players"][pid]={"id":pid,"name":self.name,"class_id":self.class_id,"conn":self}
                people=player_list(room); last_state=room.get("last_state"); started=room["started"]
            send_json(self,{"type":"ROOM","code":code,"selfId":pid,"role":"guest","players":people})
            host=room["players"].get(room["host_id"])
            if host: send_json(host["conn"],{"type":"PEER_JOINED","player":{"id":pid,"name":self.name,"classId":self.class_id},"players":people})
            room_broadcast(room,{"type":"ROOM_INFO","players":people})
            if started and last_state: send_json(self,{"type":"START","state":last_state})
            print(f"[SALA] {self.name} entrou em {code}")
            return
        if not self.room_code or not self.peer_id: raise RoomError("Crie ou entre em uma sala primeiro.")
        with LOCK:
            room=ROOMS.get(self.room_code)
            if not room or self.peer_id not in room["players"]: raise RoomError("A sala não está mais ativa.")
            is_host=self.peer_id==room["host_id"]
            if kind=="LEAVE":
                self.remove_peer(); return
            if kind=="START":
                if not is_host: raise RoomError("Somente o anfitrião pode iniciar a partida.")
                state=msg.get("state")
                if not isinstance(state,dict): raise RoomError("Estado inicial inválido.")
                room["started"]=True; room["last_state"]=state
                room_broadcast(room,{"type":"START","state":state},exclude=self.peer_id)
                print(f"[SALA] {self.room_code} iniciou a partida")
                return
            if kind=="STATE":
                if not is_host:return
                state=msg.get("state")
                if not isinstance(state,dict):return
                room["last_state"]=state
                room_broadcast(room,{"type":"STATE","state":state},exclude=self.peer_id)
                return
            if kind in ("INPUT","ACTION"):
                if is_host:return
                host=room["players"].get(room["host_id"])
                if not host:return
                if kind=="INPUT":
                    data=msg.get("input") if isinstance(msg.get("input"),dict) else {}
                    send_json(host["conn"],{"type":"REMOTE_INPUT","id":self.peer_id,"name":self.name,"input":data})
                elif msg.get("action") in ("interact","toggleExplore"):
                    send_json(host["conn"],{"type":"REMOTE_ACTION","id":self.peer_id,"action":msg.get("action")})
                return
            if kind=="CLASS_SELECT":
                selected=safe_class_id(msg.get("classId"))
                if selected in {"commander", "mayor"} and any(pid!=self.peer_id and p.get("class_id")==selected for pid,p in room["players"].items()):
                    label="Comandante" if selected=="commander" else "Prefeito"
                    raise RoomError("Esta sala já tem um "+label+". Só pode haver um por equipe.")
                room["players"][self.peer_id]["class_id"]=selected
                self.class_id=selected
                if room.get("started") and isinstance(room.get("last_state"), dict):
                    last=room["last_state"]
                    if self.peer_id==room.get("host_id") and isinstance(last.get("player"), dict):
                        last["player"]["classId"]=selected
                    for actor in last.get("remotePlayers", []):
                        if actor.get("id")==self.peer_id: actor["classId"]=selected
                room_broadcast(room,{"type":"ROOM_INFO","players":player_list(room)})
                return
            if kind=="ROOM_INFO":
                if not is_host:return
                room_broadcast(room,{"type":"ROOM_INFO","players":player_list(room)})
    def remove_peer(self):
        if not self.peer_id or not self.room_code:return
        code=self.room_code;pid=self.peer_id;self.peer_id=None;self.room_code=None
        with LOCK:
            room=ROOMS.get(code)
            if not room:return
            room["players"].pop(pid,None)
            if pid==room["host_id"]:
                for p in list(room["players"].values()): send_json(p["conn"],{"type":"ROOM_CLOSED"})
                ROOMS.pop(code,None); print(f"[SALA] {code} encerrada pelo anfitrião"); return
            people=player_list(room)
            host=room["players"].get(room["host_id"])
            if host:send_json(host["conn"],{"type":"PEER_LEFT","id":pid,"players":people})
            room_broadcast(room,{"type":"ROOM_INFO","players":people})
            print(f"[SALA] jogador saiu de {code}")
    def end_headers(self):
        self.send_header("Cache-Control","no-store")
        super().end_headers()

class Server(ThreadingHTTPServer):
    daemon_threads=True
    allow_reuse_address=True

def lan_addresses():
    found=set()
    try:
        for info in socket.getaddrinfo(socket.gethostname(),None,socket.AF_INET):
            ip=info[4][0]
            if not ip.startswith("127."):found.add(ip)
    except Exception:pass
    return sorted(found)

if __name__=="__main__":
    os.chdir(ROOT)
    server=Server((HOST,PORT),Handler)
    print("="*58)
    print(" OITO ENTRADAS v22.3 · SERVIDOR MULTIPLAYER + JOGO")
    print("="*58)
    print(f"Neste computador: http://127.0.0.1:{PORT}/")
    for ip in lan_addresses(): print(f"Na mesma rede Wi-Fi/LAN: http://{ip}:{PORT}")
    print("Salas privadas: até 4 jogadores · convites de 6 caracteres · 15 classes")
    print("Para amigos fora da sua rede, hospede este servidor em um serviço online com WebSocket.")
    print("Pressione Ctrl+C para encerrar o servidor.\n")
    if not os.environ.get("PORT"):
        threading.Timer(1.0, lambda: webbrowser.open(f"http://127.0.0.1:{PORT}")).start()
    try:server.serve_forever(poll_interval=.25)
    except KeyboardInterrupt:print("\nServidor encerrado.")
    finally:server.server_close()
