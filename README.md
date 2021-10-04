# Challenge ubistart

## Descrição

O projeto foi desenvolvido utilizando o framework NestJS. Tomei essa decisão pela agilidade + custo-benefício.

#### Estrutura de um módulo
  - services
  - repository
  - controller
  - /dto/
  - entities

## Acesso a documentação da API(Swagger)
- ``` http://localhost:3000/api ```

## Instalação
#### caso na hora de instalar os pacotes dê algum erro, preferível usar o Yarn como instalador de pacote

```bash
$ npm install
$ yarn install
```

## Rodar o projeto com Docker
```bash
$ docker-compose up
```

## Rodar o projeto localmente

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Ficou faltando algumas coisas..
Ficaram faltando algumas coisas devido a falta de tempo,
-Faltou filters
-alguns tratamentos de erros mais específicos
-Desenvolvimento de testes unitários e E2E
_Faltou alguns filters 
-Não fiz o expires_at da task
-Começei a deleção lógica, mas faltou dar o Exclude() do class-tranformer, para nao aparecer para o usuario. 
-Faltou configurar algumas variaveis ambiente,
-Faltou configurar o admin roles. 
-Faltou implementaçao de logging;


# O feito é melhor que o perfeito né :)
Com o tempo que tive tentei implementar uma arquitetura aplicando o SOLID,
e tentei mostrar mais a forma como eu trabalho do que o terminar a aplicação em sí. 

Espero que o resultado tenha agradado; 
