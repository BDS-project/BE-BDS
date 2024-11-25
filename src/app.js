import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import connectDB from './config/db.js';
import { typeDefs, resolvers } from './graphql/index.js';
import authenticate from './utils/middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(graphqlUploadExpress());

const startServer = async () => {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        // return await authenticate(req);
      }
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT}`);
      console.log(`GraphQL http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('error:', error);
    process.exit(1);
  }
};

startServer();
