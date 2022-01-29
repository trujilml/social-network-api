# Social Network API

![Social Network API GIF](./demo/social-network-api.gif)

This is a project demonstrating an API for a social network web application where users can share their thoughts, react to their friends' thoughts and create a friend list.

## Description

This is an API application that uses a MongoDB database to establish the NoSQL database to handle the unstructured data, the Mongoose ODM (Object Data Modeling) to establish the input data of users, thoughts, reactions, and friends, and Express.js to establish the Get, Post, Put, and Delete routes to obtain submitted info from the controllers and models. Moment.js is used to format the upload date of thoughts and reactions.

When the server is started (`npm start`), the Mongoose models sync to the MongoDB database and the established Express routes are triggered in Insomnia. The API GET routes are able to obtain users and thoughts, seperately all together and individually by their id. The data is then displayed in a formatted JSON on the preview file. The API POST, PUT and DELETE routes are able to create, update, and delete users and thoughts in the database. For reactions and friend lists, they have their respective API POST and DELETE routes to create and delete reactions to thoughts and to add or remove friends on a user's friend list. 

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Developed With](#Developed-with)

## Installation
- The following npm packages listed in the `Developed With` tab are required to be installed prior to accessing and using the routes in the database.
- MongoDB and Insomnia must be installed on your computer to access the database.
- This file can be cloned through GitHub into your own repository by selecting the above Code button.

## Usage
- `npm i` to preinstall all of the programs - will be visible in the 'package.json' file.
- `npm start` will start the server and allow you to test the routes in Insomnia.

## Developed With
- NoSQL - A non-tabular database that stores data differently than relational tables. MongoDB is an example of a NoSQL type database.
- MongoDB - A NoSQL database that is an open-source document database allowing data to be formatted easier than a regular SQL database. - https://www.mongodb.com/
- Mongoose - Schema based solution to model application data, acts as a front-end to MongoDB. - https://mongoosejs.com/
- Express.js - Web framework connected with MongoDB and Mongoose, functions routes for the social network API. - https://expressjs.com/ 
- Moment - A JS framework that formats dates and times. - https://momentjs.com/
- JavaScript - Back-end development code
- Insomnia - Collaborative API Client and Design Tool used to build and test APIs with an active server. - https://insomnia.rest/products/insomnia