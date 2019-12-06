# VueJS (Frontend) - NETLIFY
- coleta parâmetros
- POST na API com params
- GET link/id/alerta

# NodeJS + Express + Queue (API) - NETLIFY
- recebe params e add job na queue
	- não aceita request já existentes na queue ou done
- grava params e o job no Firebase
- retorna link/id/alerta (ao front)
- recebe lista de jobs do Firebase e seta queue (quando starta)
- watch jobs done, remove da queue e manda e-mail de notificação com PATH
- watch jobs failed e notifica por e-mail

# Firebase
- Armazena parâmetros para o kit
- Armazena metadados: data de criação, queue e status do Job


# VM WINDOWS (BUILDER)
- ambiente preparado com Firebird 2.5
- DLLs instaladas e registradas
- node script: (start pelo PM2?)
	- recebe lista de jobs do Firebase e seta queue (quando starta)
	- watch Firebase changes e add job na queue
	- seta job processing no firebase e executa EXE
	- seta job done no firebase com PATH e remove da queue
	- executa EXE conforme job na queue
	- limpa pasta mbd após job done (sem otimização)
	- renomeia pastas com suas versões após job done ()
	- seta Job failed e replica no firebase
- exe (node script do builder)
	1 usa os params para copiar arquivos do repo se não existir no CACHE
	2 copia do CACHE para STAGE (C:\MBD)
	3 faz cópia e altera config.ini *(a partir do BAK)*
	4 faz cópia e cadastra cliente *(pelo BD ou AutoIt)*
	5 **FUTURE: configura outros parâmetros (pelo BD ou AutoIt)**
	6 Compacta em ZIP (Não incluir .BAK)
	7 PKG do zip com Node Script do Installer
	8 Move o .EXE para FTP
	9 Sinaliza Sucess (Retorna PATH) ou Failed

** POSSIVEL OTIMIZAÇÃO DE I/O E TRÁFEGO NA REDE:
- CACHE REPLICADO EM C:\MBD\SISTEMAS\KIT-PROGRAMA-VERSÃO
- PASTAS DOS ITENS SELECIONADOS SÃO RENOMEADAS PARA 'PROGRAMA'
- RENOMEIA OS CONFIG.INI COMO CONFIG.INI.BAK (*)
- RENOMEIA OS BANCOS DE DADOS COMO BD.FDB.BAK (*)
- EXECUTA BUILDER A PARTIR DE PASSO 3




* DISPONIBILIZAR NO FTP (192.168.1.5): CLIENTE-SIAC-V19.0.11-5288-CR-DD-MM-YYYY.zip com o .EXE de mesmo nome.
