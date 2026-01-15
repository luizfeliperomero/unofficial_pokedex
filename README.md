<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="src/assets/unofficial_pokedex.png" alt="Logo" width="150" height="150">

<h3 align="center">Unofficial Pokédex</h3>

  <p align="center">
    Unofficial Pokédex is an application that allows users to explore Pokémon data, manage favorites, and access detailed information powered by the PokéAPI.
    <br />
    <a href="http://34.228.25.225/">Check out!</a>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is the frontend of the Unofficial Pokédex, it communicates with the [Pokemon Service](https://github.com/luizfeliperomero/pokemon_service) to build the UI.


### Built With

* [![Vue][Vue.js]][Vue-url]
* [![Tailwind][TailwindCSS]][TailwindCSS-url]
* [![Docker][Docker]][Docker-url]



<!-- GETTING STARTED -->
## Getting Started

You can use NPM to run in development and Docker for production.

### Prerequisites

Regardless of whether you are running the application in development or production, you must have an instance of the [Pokemon Service](https://github.com/luizfeliperomero/pokemon_service) running.

#### Development

* You must have Node.js and NPM installed: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

#### Production

* You must have docker installed: https://docs.docker.com/engine/install/
 
### Installation

At the root of the project.

#### Development

1. ```sh
    npm install
    ```
2. ```sh
   npm run dev
   ```

#### Production

1. Build the image
   
   ```sh
   docker build -t unofficial_pokedex .
   ```
3. Run the container
   ```sh
    docker run -p 80:80 unofficial_pokedex
    ```

<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[TailwindCSS]: https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Docker]: https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
