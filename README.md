# Sample ICO #

This is the source code of a Sample Token Sale built on the Ethereum Ropsten network.

## Features ##

The current project is built on top of ReactJS and Next.js.

The current stack allows to export the whole projecto into a static HTML/JS/CSS folder, so that the web application can be served from IPFS or Ethereum Swarm, where server interesaction is not possible.

The project includes the source code of the web site and the Solidity Smart Contracts deployed to the Ropsten net.

## Get started ##

In order to get started:
* Clone the current branch and run `yarn` to install the dependencies.
* Install the MetaMask extension in your browser
* Run `npm run dev`
* Open `http://localhost:8080`

## Utilities ##

The `package.json` file provides several scripts to perform the most important tasks.

`npm run dev` will start the development server on `8080` and will reload the contents when a file is changed.

`npm run build` will compile the project so that the production version can be served with `npm start`.

`npm run export` will export a static standalone version of the project in the `out` folder.

## About ##

The current project is a work of @ledfusion.

You can have a look at a live version at [https://ledfusion.github.io/](https://ledfusion.github.io/)
