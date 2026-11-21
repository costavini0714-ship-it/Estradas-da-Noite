# Oito Entradas — sincronização do Editor com o Render (v22.4)

## Arquivos principais
- `index.html`: jogo publicado.
- `editor.html`: editor publicado.
- `servidor_multiplayer_v14.5.py`: servidor HTTP/WebSocket e API de configuração.
- `requirements.txt`: dependências.
- `render.yaml`: configuração do serviço Render.
- `.gitignore`: ignora backups, exportações versionadas e arquivos locais temporários.

## Publicação
Envie os arquivos da raiz deste pacote para o repositório GitHub conectado ao Render e faça commit. O serviço deve iniciar com:
`python servidor_multiplayer_v14.5.py`

O `render.yaml` cria automaticamente `EDITOR_TOKEN` como segredo. Se o serviço já existir, confira em Render > Environment se a variável `EDITOR_TOKEN` foi criada. Se não, adicione uma variável com esse nome e um token aleatório forte.

## Usar o editor publicado
1. Abra `/editor` no mesmo domínio do jogo.
2. Faça as alterações.
3. Clique em **Salvar no servidor**.
4. Na primeira vez, informe o valor de `EDITOR_TOKEN` configurado em Render > Environment.
5. Abra o jogo em `/`. Ele consulta `/api/editor-config` a cada 5 segundos e aplica a configuração recebida.

O botão **Carregar do servidor** baixa a última configuração armazenada e recarrega o editor.

## Persistência
Sem um disco persistente ou banco de dados externo, o sistema de arquivos de uma instância gratuita do Render pode ser temporário. A configuração pode ser perdida em reinicializações ou novos deploys. Para persistência duradoura, configure um armazenamento persistente compatível com o plano do serviço ou um banco de dados externo. Não coloque o token no GitHub.

## Segurança
A leitura da configuração é pública para o jogo poder carregá-la. A gravação exige `X-Editor-Token`. Não compartilhe esse token. O endpoint limita o JSON a 2 MB.

## Observação sobre o .gitignore
O `.gitignore` impede que novos arquivos correspondentes sejam adicionados por engano, mas não remove do Git arquivos antigos que já estejam rastreados. Esses arquivos permanecem no repositório até serem removidos manualmente.
