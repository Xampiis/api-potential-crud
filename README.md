# Pontential-crud
Projeto de um pontencial crud para cadastro de desenvolvedores, desenvolvido para o processo seletivo da Gazin Tech de Maringá.

Foi a primeira vez que criei uma aplicação utilizando testes unitários.

### Descrição
`API JSON REST` desenvolvida com `NODE.JS`, que utiliza os métodos (​GET​, ​POST​, ​PUT​, DELETE​), `POSTGRES`, `TESTES UNITÁRIOS` e `DOCKER`.

### Início
Para dar início à aplicação, deve-se seguir os seguintes passos: 

# Instalação 

## Baixar as imagens e criar um container no Docker:
```
    docker-compose up -d 
```

## Comando para executar as migrations no Banco de Dados

```
    docker exec -it api npx sequelize-cli db:migrate
```
# Testes unitários

### Comando para executar: 

```
    npm test
```
### TEST
   ![](assets\testeUnit.png)

# Rotas
Todas as rotas foram testadas utilizando o framework Insomnia.

### Download do arquivo Json do Insomnia
  
  <a href="https://drive.google.com/file/d/1hdNuzNoqmDa3QjFJaPKnu2UCZ-D2aayC/view?usp=sharing" download>Click aqui para baixar</a>

  `Obs: É necessário ter o Insomnia instalado em sua máquina.`

  # Screenshots do insomnia

  ### GET
   ![GET](assets\get.png)

    
  ### POST
   ![POST](assets\post.png)


  ### PUT
   ![PUT](assets\put.png)

  ### DELETE
   ![DELETE](assets\delete.png)