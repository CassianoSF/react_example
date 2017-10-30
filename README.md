## Conteudo

- [Introdução](#introdução)
- [Setup](#setup)
  - [Instalando o Ruby](#instalando-o-ruby)
  - [Instalando o Rails](#instalando-o-rails)
  - [Instalando o PostgreSQL](#instalando-o-postgresql)
- [Desenvolvimento](#desenvolvimento)
  - [Front-end](#front-end)
    - [React](#react)
    - [CoreUi](#coreui)
    - [Axios](#axios)
    - [J-Toker](#j-toker)
    - [Crud](#crud)
  - [Back-end](#back-end)
    - [Ruby](#ruby)
    - [Rails](#rails)
    - [Gems](#gems)
    - [MVC](#mvc)
    - [Devise](#devise)



## Introdução

  Esse projeto foi criado para uma atividade avaliativa na matéria de programação web.
  O objetivo do projeto era construir um aplicativo web para fluxo de caixa utilizando
  frameworks de desenvolvimento web populares, escolhemos o framewok Ruby on Rails(http://rubyonrails.org/)
  utilizado como API RestFULL no back-end e a biblioteca ReactJS(https://reactjs.org/) no front-end.

## Setup

  O sistema operacional utilizado para desenvolvimento foi o Ubuntu 16.04 que pode ser econtrado aqui(https://www.ubuntu.com/download/desktop). Para instalar foi utilizado um pendrive e a ferramenta Rufus(https://rufus.akeo.ie/?locale=pt_BR) para tornar o pendrive bootavel.
  
  Para a instalação do Ruby on Rails eu segui o guia(https://gorails.com/setup/ubuntu/16.04) da GoRails, aonde está bem documentado e sempre bem atualizado multiplas versões do Ubuntu.

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

  Como banco de dados escolhemos o banco padrão da comunidade rails o Postgres:

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
  # se você deseja criar uma senha para seu usuário você digite ainda no terminal:
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

  Se tudo correu bem seu servidor já esta rodando em localhost:3000(http://localhost:3000)



## Desenvolvimento

## Front-end

## React

## CoreUi

## Axios

## J-Toker

## Crud

## Back-end

## Ruby

## Rails

## Gems

## MVC

## Devise
