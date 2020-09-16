<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><h1 align="center">vue-front-install-kit</h1>
<p align="center">
		<a href="https://david-dm.org/trepichio/kit-builder-frontend-vue"><img alt="Dependencies" src="https://img.shields.io/david/trepichio/kit-builder-frontend-vue.svg" height="20"/></a>
<a href="https://github.com/trepichio/kit-builder-frontend-vue/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/trepichio/kit-builder-frontend-vue.svg" height="20"/></a>
<a href="#"><img alt="Not maintained" src="https://img.shields.io/badge/maintained%3F-No-red" height="20"/></a>
	</p>

<p align="center">
  <b>a VueJS frontend for MBD-Kit-builder</b></br>
  <sub>Gerador de instalações customizadas para clientes (a.k.a. Kits). Desenvolvido por minha iniciativa própria para uso interno da empresa, afim de agilizar o processo e a qualidade do pós-atendimento do suporte automatizando e padronizando as implementações. Apesar de funcional, não está com sua arquitetura completa planejada, e seu desenvolvimento foi descontinuado.<sub>
</p>

<br />


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Este repositório](#-este-repositrio)
	* [➤ Descrição](#-descrio)
	* [➤ Arquitetura](#-arquitetura)
	* [➤ Contributors](#-contributors)
	* [➤ License](#-license)
* [➤ Setup](#-setup)
	* [➤ Clone repository](#-clone-repository)
	* [➤ Project setup](#-project-setup)
		* [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
		* [Compiles and minifies for production](#compiles-and-minifies-for-production)
		* [Lints and fixes files](#lints-and-fixes-files)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#este-repositrio)

# ➤ Este repositório


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#descrio)

## ➤ Descrição
Este é o repositório do Frontend, o qual coleta dados para efetuar a requisição ao Builder para gerar e entregar o executável do instalador por e-mail. A requisição é enviada à uma API que valida e adiciona um job à fila no Firebase (Job queue).


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#arquitetura)

## ➤ Arquitetura
![https://raw.githubusercontent.com/trepichio/kit-builder-frontend-vue/master/Kit-Builder-Architecture.png](https://raw.githubusercontent.com/trepichio/kit-builder-frontend-vue/master/Kit-Builder-Architecture.png)

Veja também o repositório das outras partes desta arquitetura:

- [Kit-Builder](https://github.com/trepichio/kit-builder-app)
- [Installer](https://github.com/trepichio/kit-installer)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#contributors)

## ➤ Contributors
	

| [<img alt="João Trepichio" src="https://avatars2.githubusercontent.com/u/11396817?s=460&u=085712d4f1296e6ad0a220ae7c0ea5278a9c40ed&v=4" width="100">](https://trepichio.github.io) |
|:--------------------------------------------------:|
| [João Trepichio](https://trepichio.github.io)    |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#license)

## ➤ License
	
Licensed under [ISC](https://opensource.org/licenses/ISC).

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#setup)

# ➤ Setup


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#clone-repository)

## ➤ Clone repository
```
git clone https://github.com/trepichio/kit-builder-frontend-vue.git
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#project-setup)

## ➤ Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
