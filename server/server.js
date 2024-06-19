const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//importing apollo server, expressmiddle ware and auth middleware
const {ApolloServer} = require("@apollo/server");
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// importing the typedef and resolvers
const {typeDefs, resolvers} = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

// new instance of apollo server which takes both parts of the schema as parameters which allows schema handle data
const server = new ApolloServer ({
  typeDefs, 
  resolvers
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
