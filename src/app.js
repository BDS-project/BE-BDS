import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import propertyRoutes from './routes/propertyRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import chatbotRoutes from './routes/chatbotRoutes.js';
// import appointmentRoutes from './routes/appointmentRoutes.js';
// import blogRoutes from './routes/blogRoutes.js';
import { typeDefs, resolvers } from './graphql/index.js';
import authenticate from './utils/middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Thiết lập các route
// app.use('/api/property', propertyRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/chatbot', chatbotRoutes);
// app.use('/api/appointment', appointmentRoutes);
// app.use('/api/blog', blogRoutes);

const startServer = async () => {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        const { operationName } = req.body;
        if (operationName === 'RegisterUser' || operationName === 'LoginUser') {
          return {};
        }
        const user = await authenticate(req);
        return user;
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
