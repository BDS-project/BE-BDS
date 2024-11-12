import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { typeDefs, resolvers } from './graphql/index.js';

// Khởi tạo ứng dụng
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Thiết lập các route
app.use('/api/property', propertyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/blog', blogRoutes);

// Khởi tạo server
const startServer = async () => {
  try {
    // Kết nối MongoDB
    await connectDB();
    console.log('Kết nối MongoDB thành công');

    // Thiết lập Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    // Lắng nghe yêu cầu
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
      console.log(`GraphQL đang chạy tại http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Lỗi khi khởi tạo server:', error);
    process.exit(1);
  }
};

startServer();
