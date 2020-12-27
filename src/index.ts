// impport thirdparty packages
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import logger from 'jethro';
import helmet from 'helmet';
import compression from 'compression';

// import databsase
import db from './db';

// import schema
import typeDefs from './schema';

// import resolvers
import resolvers from './resolvers';

const initDb = async () => {
  
  try {

    await db();

    logger("success", "Database", "Successfuly connected to mongo database");

  } catch (err) {
    logger("error", "Database", "Unable to connect to mongo database");
  }

}
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();

app.use(helmet());

app.use(compression({
  level: 2
}));

server.applyMiddleware({ app });
 
app.listen({ port: config.get("port") }, async () => {
  logger("success", "Apollo Server", `Apollo Server ready at http://localhost:${config.get("port")}${server.graphqlPath}`);
  await initDb();
});