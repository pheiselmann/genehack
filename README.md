[![Build Status](https://travis-ci.org/pheiselmann/genehack.svg?branch=master)](https://travis-ci.org/pheiselmann/genehack) [![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://rocky-basin-59938.herokuapp.com/)

# [Genehack](https://rocky-basin-59938.herokuapp.com/)

## Table of Contents

  - [Introduction](#introduction)
  - [How It Works](#how-it-works)
  - [Demo](#demo)
  	- [Create Account](#create-account)
  	- [Log In](#log-in)
  	- [See Report and Edit Account](#see-report-and-edit-account)
  - [Responsive Design](#responsive-design)
  	- [Galaxy S5 (360 X 640)](#galaxy-s5-\(360-x-640\))
  	- [Nexus 5X (412 x 732)](#Nexus-5X)
  	- [Nexus 6P (412 x 732)](#Nexus-6P)
  	- [iPhone 5 (320 x 568)](#iPhone-5)
  	- [iPhone 6 (375 x 667)](#iPhone-6)
  	- [iPhone 6 Plus (414 x 736)](#iPhone-6-Plus)
  - [Technology](#technology)


## Introduction

This app was initially developed as a capstone project for the server-side web development portion of Thinkful's full stack web development program.  The app creates a RESTful API using Node.js, Express, and the Express Router, and it uses Mongoose to interact with and model data from a MongoDB persistence layer.  Passport.js, Bcrypt.js, and JSON Web Token are used for user authentication, encryption, and access control.  Body-parser middleware is used to parse each http request body - and Morgan middleware is used to automatically log http request details.  Chai-http (along with the Chai asssertion library) is used to run mock CRUD requests to the API and test the responses; this testing is automatically carried out by Travis CI each time any changes to the app are pushed up to the Github repo.  Through the use of HTML, CSS, JavaScript, JQuery, and Ajax calls to the RESTful API, this app creates an interactive educational experience regarding an important genetic mutation related to folate metabolism.  Finally, the app is made accessible to end users via deployment to the Heroku cloud-based production server platform.


## How It Works

On the first page of the app, the user will receive information regarding the purpose of the site, e.g., to learn about the possible health impacts of having each of three variants of an important locus on the MTHFR gene.  From this screen, the user has the choice of either clicking on a "Create Account" or a "Log In" button.  

If the user chooses the first option, the "Create Account" page will load, and the user will be prompted to enter a first and last name, a username, a password, and gene variant.  An error message will appear if the user fails to enter a first and last name, a username of at least one character that is not already taken, and a password between 10 and 72 characters.  An error message will also appear if the user enters a username or password that begins or ends with a whitespace, or if the user enters a gene variant other than TT, GT, or GG.  A blank entry will be accepted for the gene variant, as this account field can be edited later.

If the user chooses the second option, or the user successfully creates an account, the "Log In" page will load.  The user will be prompted to enter a username and password.  If either of these entries is unsuccessful, an error message will appear.

Once the user has successfully logged in, the "Account Information" page will load.  On this page, the user will be able to view the full name, username, and variant in the user's account.  The user will also have the option of clicking on buttons to 1) view a report regarding the variant currently listed, 2) edit the variant, 3) log out, or 4) delete the account.

If the user chooses "View Report", and the user has a variant listed in the user's account, a "Genehack Report" page will load; this page will provide health impact information for the variant currently listed, as well as providing a "Back" button for returning to the "Account Information" page.  However, if the user did not enter a variant when creating the user's account, an error page will load instructing the user to visit the "Edit Variant" page.  

If the user choose the "Edit Variant" option, a page will load prompting the user to enter a variant.  If the user attempts to submit a blank entry or an entry other than TT, GT, or GG, an error message will appear.  If the user succesfully submits a variant, the "Account Information" page will load with that variant listed.  The user can also use the "Back" button to return to the "Account Information" page without editing the variant field.

## Demo

### Create Account

![Create Account](public/images/genehack-create-account.gif)

### Log In

![Log In](public/images/genehack-login.gif)

### See Report and Edit Account

![See Report and Edit Account](public/images/genehack-report-and-edit-account.gif)

## Responsive Design

### Galaxy S5 (360 X 640)

![Galaxy S5 (360 X 640)](public/images/GalaxyS5.png)

### Nexus 5X

![Nexus-5X](public/images/Nexus5X.png)

### Nexus 6P

![Nexus-6P](public/images/Nexus6P.png)

### iPhone 5

![iPhone-5](public/images/iPhone5.png)

### iPhone 6

![iPhone-6](public/images/iPhone6.png)

### iPhone 6 Plus

![iPhone-6-Plus](public/images/iPhone6Plus.png)

## Technology

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS "CSS"), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML "HTML"), [JavaScript](https://www.javascript.com/ "Javascript"), [JQuery](https://jquery.com/ "JQuery"), [Ajax](http://api.jquery.com/jquery.ajax/ "Ajax"), [Node.js](https://nodejs.org/en/ "Node.js"), [Express](http://expressjs.com/ "Express"), [MongoDB](https://www.mongodb.com/ "MongoDB"), [Mongoose](http://mongoosejs.com/ "Mongoose"), [Morgan](https://www.npmjs.com/package/morgan "Morgan"), [Body-parser](https://www.npmjs.com/package/body-parser "Body-parser"), [Passport.js](http://www.passportjs.org/ "Passport"), [Bcrypt.js](https://www.npmjs.com/package/bcryptjs "Bcrypt.js"), [Chai](http://chaijs.com/ "Chai"), [Chai-http](http://chaijs.com/plugins/chai-http/ "Chai-http"), [JSON Web Token](https://jwt.io/ "JSON Web Token"), [Travis CI](https://travis-ci.org/ "Travis CI"), [Heroku](https://www.heroku.com/ "Heroku")



