import userSchema from './user/user.schema.js';
import userResolvers from './user/user.resolvers.js';
import appointmentSchema from './appointment/appointment.schema.js';
import appointmentResolvers from './appointment/appointment.resolvers.js';
import propertySchema from './property/property.schema.js';
import chatbotSchema from './chatbot/chatbot.schema.js';
import blogSchema from './blog/blog.schema.js';
import propertyResolvers from './property/property.resolvers.js';
import chatbotResolvers from './chatbot/chatbot.resolvers.js';
import blogResolvers from './blog/blog.resolvers.js';
import projectResolvers from './project/project.resolvers.js';
import furnitureSchema from './furniture/furniture.schema.js';
import projectSchema from './project/project.schema.js';
import furnitureResolvers from './furniture/furniture.resolvers.js';

export const typeDefs = [userSchema, appointmentSchema, propertySchema, chatbotSchema, blogSchema, propertySchema, projectSchema, furnitureSchema];
export const resolvers = [userResolvers, appointmentResolvers, propertyResolvers, chatbotResolvers, blogResolvers, projectResolvers, furnitureResolvers];
