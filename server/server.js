const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//importing apollo server, expressmiddle ware and auth middleware
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// importing the typedef and resolvers
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

// new instance of apollo server which takes both parts of the schema as parameters which allows schema handle data
const server = new ApolloServer({
  typeDefs,
  resolvers
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  //middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // graphql ApI route passing  second arg into expressmiddleware setting the "context" property for the authMiddleware.
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    //routes index.js has the app.use to serve up react front-end in production in the routes.
    app.use(routes);
  }


  // express will use the grapql api route 
  app.use('/graphql', expressMiddleware(server));

  // once the app is running the terminal will displaying that the api is running and a link to use graphql.
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}
// Call the async function to start the server
startApolloServer();