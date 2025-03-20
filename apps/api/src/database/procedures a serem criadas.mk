# Procedures a serem criadas

Algumas procedures deverão ser criadas no banco de dados **SIMB**. Para facilitar a reutilização de código em partes do sistema e melhorar em performance o backend, por não ter a necessida de novas requisições por parte do cliente ou do próprio backend no SGBD Postgres.


##Acerto de fechamento
**+ Procedure de lançamento automático de valores **

## Almoxarifado
**+ Controle do Saldo**
**+ Desabilitar o item em caso de saldo < =0**

## Cobranças
**+ Alterar os dados da mesa**
**+ Caso a mesa tenha composição, atualizar o saldo da composição (tabela composição), e criar registro no histórico de composição (tabela historico_composicao) **

## Composição
**+ Qualquer modificação de valor deve ser gerado o histórico de composição**

##histórico pontos
**+ Trigger deve ser executada no encerramento da cobrança gerando todo histórico da movimentação atual sobre os pontos**

##Mesa Entrada
**+ Mudar o status da mesa**
**+ Mudar o status do ponto para ativo caso esteja desabilitado**

##Mesa Saída
**+ Mudar o status da mesa**
**+ Mudar o status do ponto para desativo caso esteja ativado e recordcount = 1**

##Mesa
**+ Criar log de mudanças para qualquer alteração de mesa**
**+ Não permitir que a mesa mude de situação caso esteja ocupada**

##Itens-pedidos-almoxarifado
**+ ataulizar saldo de almoxarifado quando o status for true / false**

##Movimentações
**+Executar procedure para histórico do ponto **


!!! Verificar e fazer os itens do acerto, deve ser autorelacionada, assim, ao lançar um item pode-se escolher um item anterior para incidir o valor



- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.







## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|



## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```