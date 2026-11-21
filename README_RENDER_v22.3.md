# Oito Entradas — Deploy Render (v22.3)

Este repositório contém o jogo, o editor e o servidor WebSocket.

## Configuração
- Runtime: Python
- Build Command: `pip install --no-input -r requirements.txt`
- Start Command: `python servidor_multiplayer_v14.5.py`
- Health Check Path: `/healthz`

O serviço lê a porta de `PORT` e escuta em `0.0.0.0`. O arquivo `render.yaml` já contém essas configurações.

## Páginas
- `/` ou `/index.html`: jogo
- `/editor` ou `/editor.html`: editor
- `/healthz`: verificação de saúde

O sistema de IA autônoma da versão 22.3 é baseado em regras e roda dentro do jogo; não precisa de API de IA externa nem consome créditos de inferência. É diferente de um LLM como Llama.
