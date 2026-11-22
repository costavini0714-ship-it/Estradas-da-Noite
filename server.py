"""Compatibilidade com serviços Render configurados para iniciar com 'python server.py'.

O servidor real do projeto continua em servidor_multiplayer_v14.5.py.
"""
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parent
TARGET = ROOT / "servidor_multiplayer_v14.5.py"

if not TARGET.is_file():
    raise FileNotFoundError(f"Arquivo principal não encontrado: {TARGET}")

runpy.run_path(str(TARGET), run_name="__main__")
