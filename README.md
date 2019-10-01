# Wishlist
Wishlist API, to manage clients products.

API Criada com o intuido de gerenciar uma lista de clientes, bem como sua `wishlist` de compras

## Tecnologias
Tecnologia | Versão
--- | --- 
`node`| `^v10`
`axios`| `^0.19.0`,
`chai`| `^4.2.0`,
`koa`| `^2.8.2`,
`koa-bodyparser`| `^4.2.1`,
`koa-jwt`| `^3.6.0`,
`koa-router`| `^7.4.0`,
`mocha`| `^6.2.1`,
`mongo-mock`| `^3.7.1`,
`mongodb`| `^3.3.2`,
`supertest`| `^4.0.2`

## Configuração
A aplicação utiliza as seguintes variáveis de ambiente que devem ser especificadas, quando não for utilizada via docker.

Variavel | Default | Descrição
--- | --- | ----    
PORT | ```3000``` | Porta onde a aplicação ira receber os requests.
AUTH\_TOKEN\_VALUE | `auth` | Valor recebido no recurso `/auth` no `header: token`, que irá fazer a autenticação e retornar um token `JWT` para as seguintes requisições.
JWT\_SECRET\_VALUE | `S3cr3T` | Utilizado para assinatura e validação do `JWT`.
MONGO\_DB\_CONNECTION | "mongodb://mongo:27017/WishlistDB" | Url de conexão com a base de dados `MONGO`
PRODUCT\_API\_BASE\_URL | "http://challenge-api.luizalabs.com" | Url base para API de produtos
PRODUCT\_API\_PATH | "api/product" | Path de acesso da API de produtos

## Iniciando a aplicação 
### Com DOCKER (recomendado)
Na pasta raiz do projeto encontram-se os arquivos `Dockerfile` e `docker-compose.yml`. Com isto ao executar o comando `docker-compose up --build` será criada a imagem da aplicação e executada em conjunto com a imagem `mongo` (já inclusa no compose). A imagem será criada com os valores default para as variaveis de ambiente, caso seja necessario modificar alguma basta alterar nesses arquivos e executar o comando novamente.

### Localmente SEM DOCKER
Após configurar as variaveis de ambientes necessarias (descritas na sessão anterior), garanta que possui `node versão 10` ou superior instalado. Com isso execute o comando `npm install` para instalar as dependencias necessarias do projeto, após instaladas execute `npm test`, para garantir a integridade da aplicação e por fim inicie com `npm start`. Obs: Garanta que exista um servidor `mongodb` executando com acesso via a URL de conexão apontada em `MONGO\_DB\_CONNECTION`.


## Testes
Para executar os testes na aplicação, estando na pasta da aplicação com `node` versão 10 ou superior e com as dependencias instaladas(`npm install`) execute o comando
`npm test`, este irá executar tanto testes unitários, quanto testes de API(end-to-end). Por esse motivo garanta que possui conexão com o servidor da API Products (`'http://challenge-api.luizalabs.com'`).

# Executanto a aplicação
## APIs
Na pasta raiz, todas as APIs estão descritas no documento `documentation.swagger`. Utilize um visualizador `swagger` para visualizar as APIs. (As APIs não serão descritas nesse README, pois serão muito melhor compreendidas atravez da documentação swagger.)

# Auth
Toda chamada nessa API está protegida por `token JWT`, para realizar a autenticação e obtenção do token autenticado, deve ser realizada chamada no recurso `\auth`. O mesmo irã validar se o valor passado no `header token` é igual ao valor da variavel de ambiente `AUTH\_TOKEN\_VALUE`. Caso seja, irá ser retornado um token que devera ser passado no formato `Bearer <token>` no header `Authorization`.

## Chamadas via `Postman`
Na mesma localidade existe a pasta `postman` onde se encontra a collection e o ambiente para auxiliar nas chamadas da `API`. Na chamada do recurso `\auth` via essa collection o token de autenticação ja será colocado como variavel e utilizado nas chamadas posteriores, para facilitar os testes.


## Version: 1.0.0

**Contact information:**  
marcospaulo.vilelasantos@gmail.com  