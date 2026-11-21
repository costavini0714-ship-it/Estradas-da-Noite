# Oito Entradas 22.2 — publicação no Render

## Publicação pelo Blueprint

1. Envie todos os arquivos desta pasta para a raiz do seu repositório GitHub.
2. No Render, escolha **New → Blueprint** e conecte esse repositório.
3. Confirme a criação do serviço definido em `render.yaml`.
4. Quando o deploy terminar, abra o endereço `https://SEU-SERVICO.onrender.com/`.
5. O jogo fica em `/` e o editor em `/editor.html`. O endpoint `/healthz` confirma a saúde do serviço.

## Configuração manual

- Tipo: **Web Service** (necessário para o servidor cooperativo por WebSocket).
- Runtime: Python.
- Build command: `pip install --no-input -r requirements.txt`.
- Start command: `python servidor_multiplayer_v14.5.py`.
- Host: `0.0.0.0`; porta: variável de ambiente `PORT`.
- WebSocket público: `wss://SEU-SERVICO.onrender.com/ws`.

## Desempenho e limites

O Render hospeda os arquivos, as salas e o servidor multiplayer. A renderização Canvas, a câmera, a simulação local e a maior parte das colisões continuam no navegador de cada jogador. Portanto, o Render não transforma o PC em um cliente sem processamento gráfico nem aumenta diretamente o FPS local. A v22.2 reduz atualizações repetitivas do HUD no navegador; o desenho do jogo continua responsivo.

As salas e o estado cooperativo ficam em memória no processo. Reinícios e novos deploys encerram salas ativas; esta versão não inclui banco de dados ou Redis. O limite atual continua em quatro jogadores por sala.
