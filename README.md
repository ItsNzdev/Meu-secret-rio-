# Meu Secretário — Enzo v4

Versão visual refinada a partir das referências e dos dois assets enviados.

### Visual
- preto/cinza/branco, sem verde e sem cores saturadas
- estética premium, fina e futurista
- fotografia de Nova York fornecida pelo utilizador como fundo
- ícone fornecido pelo utilizador como núcleo/identidade
- glassmorphism discreto
- cartões claros para informação financeira
- widgets compactos de sistema, próxima conta e progresso das metas
- navegação Finanças / Contas / Agenda / Metas
- mobile-first

### Funcionalidades mantidas
- contas Portugal (EUR) e Brasil (BRL), separadas
- saldo, entradas e saídas
- movimentações
- contas futuras e recorrência mensal
- marcar conta como paga remove do total pendente
- compromissos
- metas
- comando rápido por texto
- voz quando suportada pelo navegador
- PIN
- passkey/WebAuthn em HTTPS
- PWA/offline
- backup JSON
- bloqueio manual

### Privacidade
Esta versão continua a ser um PWA local. Os dados não são enviados pelo código para um servidor.
Para sincronização por conta, login, armazenamento cifrado no servidor e recuperação de dados entre dispositivos é necessário backend próprio.


## 🔔 Lembretes push

Ao cadastrar uma conta existe a opção **“Lembrar 1 dia antes”**.

A v5:
- pede permissão para notificações;
- registra o lembrete na conta;
- mostra os próximos lembretes no painel;
- usa o Service Worker para apresentar notificações;
- suporta recebimento de Web Push quando conectado a um servidor Web Push.

### Limitação importante do navegador
Uma PWA local, sozinha, não consegue garantir que o Android execute código exatamente amanhã às 09:00 quando o app estiver fechado. Para um **push real e confiável com o app fechado**, é necessário um servidor que mantenha a subscription Web Push e dispare a notificação no horário calculado.

Foi incluído `server-example.js` como base para essa parte. A publicação final exige HTTPS, chaves VAPID e banco de dados por utilizador.
