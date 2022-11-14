# Tododouo 

Tododuo é uma API escrita em typescript que lista suas tarefas do dia a dia.

## Instalação

- 1- Clone o repositório
- 2- Instale as dependencias.
```bashas
npm i 
```
- 3- Configure as variaveis de ambiente em um arquivo `.env` utilizando o arquivo `.env.example` como base.
- 4- Crie um banco de dados PostgreSQL com o nome que preferi.
- 5- Popule o banco de dados com o arquivo dump.sql.
- 6- Rode o comando.
```bashas
npm start
```
## Documentação

- Rota post `/signup`: Recebe um body do tipo:

```json
{
  "name": "nome",
  "password": "senha"
}
```
Retorna status `201` caso o objeto seja cadastrado, `401` para caso a propriedade `name` já esteja cadastrado no banco de dados.
#
- Rota post `/signin`: Recebe um objeto do tipo:
```json
{
  "name": "nome",
  "password": "senha"
}
```
Retorna status `200` e um token do tipo: `19c02ec9-3ec1-4946-b550-3bd8594693d9` caso o corpo do objeto coincida com algum usuário já cadastrado no banco de dados e `401` caso o usuário não exista.


## Rotas autenticadas
- Devem receber no headers um token do tipo auth que é obtido ao fazer um post na rota `signin` caso não receba ou seja um token invalido, todas as rotas autenticadas irão retornar status `401`.

#
- Rota post `/task`: Recebe um body do tipo:
```json
{
  "name": "nome",
  "description": "descrição"
}
```
Onde description é opcional, cria uma tarefa com nome e descrição recebidos, retorna status `201` caso a tarefa seja criada.

- Rota get `/task`: Recebe uma array todas as tarefas criadas pelo usuário do tipo:

```json
[
  {
    "id": id_da_tarefa,
    "name": "nome",
    "description": "descrição",
    "user_id": id_do_usuario_criador
  }
]
```

- Rota delete `/task/:id`: recebe por params o id da tarefa, retorna status `204` caso a tarefa seja deletada, `404` caso o id da tarefa não exista e `401` caso o usuário não seja o criador da tarefa selecionada.

- Rota put `/task/:id`: recebe por params o id da tarefa e um body do tipo:
```json
  {
    "description": "descrição",
  }
```
Atualiza a descrição da tarefa selecionada, retorna status `202` caso a atualização seja efetuada, `404` caso o id da tarefa não exista e 401 caso o usuário não seja o criador da tarefa selecionada.

- Rota post `/task/day/:id`: Onde recebe por params o id da tarefa e um body do tipo:
```json
  {
    "day": dia_da_semana,
  }
```
Os dias da semana são numerados de 1 a 6, 1 sendo Domingo e 6 Sábado, retorna status `200` caso o dia seja atribuído a tarefa, `422` caso o dia seja invalido, `404` caso o id da tarefa não exista e `401` caso o usuário não seja o criador da tarefa selecionada.

- Rota get `/task/today`: Uma rota agregadora, retorna a contagem de tarefas no dia da semana que for feita a requisição junto com as próprias tarefas.