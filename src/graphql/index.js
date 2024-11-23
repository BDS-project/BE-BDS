import userSchema from './user/user.schema.js';
import userResolvers from './user/user.resolvers.js';
import appointmentSchema from './appointment/appointment.schema.js';
import appointmentResolvers from './appointment/appointment.resolvers.js';
import propertySchema from './property/property.schema.js';
import blogSchema from './blog/blog.schema.js';
import propertyResolvers from './property/property.resolvers.js';
import blogResolvers from './blog/blog.resolvers.js';
import projectResolvers from './project/project.resolvers.js';
import projectSchema from './project/project.schema.js';
import propertyImageSchema from './propertyImage/propertyImage.schema.js';

export const typeDefs = [
  userSchema,
  appointmentSchema,
  blogSchema,
  projectSchema,
  propertySchema,
  propertyImageSchema
];
export const resolvers = [
  userResolvers,
  appointmentResolvers,
  blogResolvers,
  projectResolvers,
  propertyResolvers
];
