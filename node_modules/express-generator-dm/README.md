# express-generator-dm

## Installation

```bash
$ npm install
```

## Run Application

Using the -n flag, name your project and the program will subsiquently generate the project template layout.   

```bash
$ exp-gen -n <name>
```

Navigate to the created project:

```bash
$ cd <name>
```

Install package dependencies:

```bash
$ npm install
```

Run the application locally at:

```bash
$ node app.js
```

Navigate to a browser and type the following link to display the applicaion.
`http://localhost:3000/`:

## Command Line Options

This generator can also be further configured with the following command line flags.

    -h, --help          output usage information
        --version       output the version number
    -n, --name <name>   Project name

## Info

The express-generator generates a blank express project with a rMVC structure. The project uses an ejs view engine and includes the Materialize framework to style the pages. A Procfile and a .env file is also generated to deploy the application to Heroku.
