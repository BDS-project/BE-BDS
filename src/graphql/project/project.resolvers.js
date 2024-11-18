import ProjectService from '../../services/ProjectService.js';

const resolvers = {
  Query: {
    projects: async () => await ProjectService.getAllProjects(),
    project: async (_, { id }) => await ProjectService.getProjectById(id)
  },

  Mutation: {
    createProject: async (_parent, _args, user, _info) => {
      console.log('user:', user);
      console.log('_args:', _args);
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.createProject(_args.input);
      }
    },

    updateProject: async (_, { id, ...args }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.updateProject(id, args);
      }
    },

    deleteProject: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.deleteProject(id);
      }
    }
  }
};

export default resolvers;
