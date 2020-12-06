const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');
require('dotenv').config() // Loading env variables
const { loadModels } = require('./models')

// Configuracion de la DB
// Esta configuracion utiliza el adapter knex
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const adapterConfig = { knexOptions: { connection: process.env.DB_URL } };

// Aca estamos inicializando el adapter para la DB y en el hook onConnect estamos setando una config basica
// que seria llamar al initialiseData si la variable de entorno CREATE_TABLE no es true. 
// El initialiseData lo que va a hacer es crear un usuario base para poder loggearnos.
const keystone = new Keystone({
  adapter: new Adapter(adapterConfig), //Set db connection
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
  cookieSecret: process.env.COOKIE_SECRET // Necesitamos configurar un cookie secret para "firmar" las sesiones, si no lo seteamos se va a generar uno nuevo cada vez que inicializamos el servidor y las sesiones previas ya no podran ser utilizadas
});

loadModels(keystone)

// Configuracion de la autenticacion por password
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: process.env.PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
