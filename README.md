## Conteudo

- [Introdução](#introdução)
- [Setup](#setup)
  - [Instalando o Ruby](#instalando-o-ruby)
  - [Instalando o Rails](#instalando-o-rails)
  - [Instalando o PostgreSQL](#instalando-o-postgresql)
- [Desenvolvimento](#desenvolvimento)
  - [Back-end](#back-end)
    - [Criando a API](#criando-a-api)
    - [Seção de usuário](#seção-de-usuário)
    - [Relacionamentos](#relacionamentos)
  - [Front-end](#front-end)
    - [Criando a SPA](#criando-a-spa)

## Introdução

  Esse projeto tem por objetivo construir um aplicativo web para fluxo de caixa utilizando frameworks de desenvolvimento web populares, escolhemos o framewok [Ruby on Rails](http://rubyonrails.org/)
  utilizado como API RESTful no back-end e a biblioteca [ReactJS](https://reactjs.org/) no front-end.

## Setup

  O sistema operacional utilizado para desenvolvimento foi o Ubuntu 16.04 que pode ser econtrado [aqui](https://www.ubuntu.com/download/desktop). Para instalar foi utilizado um pendrive e a ferramenta [Rufus](https://rufus.akeo.ie/?locale=pt_BR) para tornar o pendrive bootavel.
  
  Para a instalação do Ruby on Rails eu segui o [guia](https://gorails.com/setup/ubuntu/16.04) da GoRails, aonde está bem documentado e sempre bem atualizado multiplas versões do Ubuntu.

  ## Instalando o Ruby

  Primeiro é necessário instalar algumas dependências, no terminal digite:

```
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs  
```

  Feito isso podemos instalar o ruby de diversas maneiras, é recomendado instalar um versionador ruby(rvm ou rbenv), optamos por rbenv:

```
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.4.2
rbenv global 2.4.2
ruby -v
```

  Por ultimo devemos instalar o gerenciador de pacotes ruby o bundler:
```
gem install bundler
```

## Instalando o Rails

  Utilizamos o Rails 5, para instalá-lo mais alguns comando no terminal:

```
  gem install rails -v 5.1.4
  rbenv rehash
  rails -v
```

  Se tudo der certo o terminal deve imprimir a versão instalada do rails.

## Instalando o PostgreSQL

  Como banco de dados escolhemos o banco padrão da comunidade rails, o Postgres:

```
sudo sh -c "echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' > /etc/apt/sources.list.d/pgdg.list"
wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-common
sudo apt-get install postgresql-9.5 libpq-dev
```
  
  Criando o usuário:

```
  sudo -u postgres createuser nome_do_usuario -s
  # se você deseja criar uma senha para seu usuário, digite ainda no terminal:
  sudo -u postgres psql
  postgres=# \password nome_do_usuario
```

  Agora você pode criar um projeto rails da seguinte forma:

```
rails new nome_do_projeto
cd nome_do_projeto
rake db:create
rails s
```

  Se tudo correu bem seu servidor já esta executando em [localhost:3000](http://localhost:3000)



## Desenvolvimento

  Boa parte do trabalho de desenvolvimento foi procurar a ferramenta ou a biblioteca certa. Na internet tem quase tudo pronto ai é só enteder como funciona e usar. A unica parte em que foi realmente colocado a mão na massa foi o CRUD e algumas alterações de layout.
  Algo que me deixou meio perdido a principio foi a sintaxe do React, que mistura HTML e js tudo junto. Mas uma coisa que ajudou bastante foi o Sublime Text, a sintaxe do react(jsx / babel) não vem por default no sublime então eu tive que instalar um pacote para o "Highlight" ficar correto. Se você tambem esta com esse problema instale o Package Control no Sublime, [aqui](https://packagecontrol.io/installation) explica como fazer isso. E para instalar a syntaxe use o (Ctrl + Shift + P) do sublime e digite 'install package' aperte 'enter' espera alguns segundos e digite 'babel' e aperte 'enter', assim você instalou a sintaxe certa para utilizar no react.


## Back-end  

  No back-end usamos o rails como api. Pode parecer um exagero utilizar o rails para criar uma simples api RESTful, mas a facilidade de criar a estrutura inicial e a quantidade de gems (bibliotecas) prontas para utilizar com ele é incrivel.
  Conseguimos criar api inteira com seção de usuário, envio de emails, cross request e estrutura do banco com apenas alguns comandos no terminal e pouquissimas alterações no código.

## Criando a API

  Para criar a estrutura inicial do projeto usamos o seguinte comando no terminal:
```
  rails new rails_api_example --api --database=postgresql
```
  
  O rails possui uma série de cenveções para facilitar o desenvolvimento, uma delas é a criação dinamica de plurais e singulares para as palavras. Porém como vou utliziar palavras em portugues precisei fazer uma alteração nessa conveção.
  No Arquivo 'config/initializers/inflection.rb' inclui a seguinte linha:
```
  inflect.irregular 'categoria', 'categorias'
```
  Caso contrario categoria seria plural e categorium seria singular. Nada demais, mas vale a pena para ver uma das funcionalidades do rails.


  Feito isso criamos a estrutura básica de lançamentos e categorias:
```
  rails generate scaffold categoria nome cor user_id:integer
  rails generate scaffold lancamento valor:float descricao user_id:integer categoria_id:integer tipo
```

  Esses comandos criam todo o MVC do rails para o respectivo model (categoria e lançamento), inclusive cria as migrações, as quais podem ser utilizadas com qualquer banco sem a necessidade de alterar nada além da gem e a configuração de acesso ao banco. Por exemplo se quisermos alterar para sqlite seria só entrar no GEMFILE e alterar a gem 'pg' para 'sqlite' e no arquivo 'config/database' alterar as configurações para o adaptador correto.

  Feito isso basta criar o banco:
```
  rake db:create  
```

  E executar as migrações:
```
  rake db:migrate
```

## Seção de usuário

  Utilizamos a gem [devise token auth](https://github.com/lynndylanhurley/devise_token_auth) para criar seção de usuário, com registro por email, confirmação do email e autenticação por token.

  A primeira coisa a fazer foi instalar a gem, então inserimos no arquivo GEMFILE a seguinte linha:
```
  gem "devise_token_auth"
```
  E com o terminal aberto na pasta root da aplicação:
```
bundle install
```
  Feito isso criamos o modelo autenticado com o seguinte comando:
```
  rails g devise_token_auth:install User auth
```
  No arquivo de configuração config/initializers/devise_token_auth definimos a url de redirecinamento dos emails apos a configuração do registro:
```
  config.default_confirm_success_url = "http://localhost:8080"
```
  E para que o token não altere a cada request: 
```
  config.change_headers_on_each_request = false
```

## Relacionamentos

  Foram criadas as foreign keys de user_id nos modelos categoria e lancamento e a foreign key categoria_id em lancamento, para relacioná-los precimos adicionar algums linhas nos modelos:

  app/models/lancamento.rb
```
  belongs_to :user
  belongs_to :categoria
```
  app/models/categoria.rb
```
  belongs_to :user
  has_many :lancamentos
```
  app/models/user.rb
```
  has_many :categorias
  has_many :lancamentos
```
  Agora os modelos estão relacionados corretamento mas os controllers ainda precisam ser ajustados para que mostrem apenas os registros relacionados ao usuário, para isso precisamos fazer tres coisas:

  A primeira foi criar um controller autenticado, que herdará do application controller e só poderá ser acessado por usuários logados. Então criamos o /app/controllers/authencated_controller.rb:
```
class AuthenticatedController < ApplicationController
  before_action :authenticate_user!
end
```
  
  A segunda foi fazer com que os controllers de lançamentos e categorias herdem do authenticated_controller:

```
class LancamentosController < AuthenticatedController
...
class CategoriasController < AuthenticatedController
```

   E por ultimo fazer com que peguem os dados apenas do current_user, um medoto que o devise criou para nós que indentifica o usuário logado:
  
  No app/controllers/categorias_controllers.rb

```
  # aonde era:
  Categoria.all
  # fica agora:
  current_user.categorias
  # e aonde era:
  Categoria.find(params[:id])
  # fica agora:
  current_user.categorias.find(params[:id])
```

  E no app/controllers/lancamentos_controllers.rb

```
  # aonde era:
  Lancamento.all
  # fica agora:
  current_user.lancamentos
  # e aonde era:
  Lancamento.find(params[:id])
  # fica agora:
  current_user.lancamentos.find(params[:id])
```

## Front-end
  Para criar o front utilizamos node.js, reactjs, axios e o tema para bootstrap CoreUI.
  Não se pode chamar nenhum desses de framework, são mais um conjunto de bibliotecas isoladas mas que funcionam muito bem juntas.

## Criando a SPA

  A SPA foi criada em cima do [projeto](https://github.com/mrholek/CoreUI-React/tree/master/React_Full_Project) da [CoreUI](http://coreui.io/), aonde limpamos o layout e recriamos as rotas da aplicação para atender o objetivo do projeto.

  Para instalar foi só clonar o repositorio:
```
git clone https://github.com/mrholek/CoreUI-React.git
```
  Entrar na pasta React_Full_Project:
```
cd CoreUI-React/React_Full_Project
```
  E mandar o npm fazer o que ele foi feito pra fazer:
```
npm update
```
  Para comunicar com a API foi utilizado o [axios](https://github.com/axios/axios). Um exemplo de uso:
```
  // no terminal:
  npm install axios --save

  // no código:
  import axios from "axios"
    
  axios
    .get( 
      "http://url_da_minha_api.com.br/records", 
      {headers: {chave: "valor"}}
    )
    .then(res =>{
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    });
```

  Para registro e login utilizamos [J-Toker](https://github.com/lynndylanhurley/j-toker) que com apenas a configuração da url da api já faz toda a parte de regitro e autenticação.
  
```
  // no terminal:
  npm install j-toker --save

  // no código:
  import Auth from 'j-toker'

  // configuração
  Auth.configure({apiUrl: 'http://url_da_minha_api.com.br'});

  // login
  Auth.emailSignIn(
      {
        email: this.state.email, 
        senha: this.state.senha
      }
    )
    .then(res => {
      self.props.history.push('/home')
    });

  // Retorna os dados de autenticação a serem mandados em cada requisição
  Auth.retrieveData('authHeaders')


```
  E o [CRUD](https://github.com/CassianoSF/react_spa_example/blob/master/src/components/Crud/Crud.js) é um componente criado para aceitar diversos tipos de dados, aonde se passa a estrutura do registro e a url da API, ai ele monta a lista, formularios, confirmações, etc.
