import ProjectService from '../../services/ProjectService.js';

const resolvers = {
  Query: {
    projects: async () => await ProjectService.getAllProjects(),
    project: async (_, { id }) => await ProjectService.getProjectById(id)
  },

  Mutation: {
    createProject: async (_parent, _args, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.createProject(_args.input);
      }
    },

    updateProject: async (_parent, _args, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.updateProject(_args.id, _args.input);
      }
    },

    deleteProject: async (_parent, _args, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.deleteProject(_args.id);
      }
    }
  }
};

export default resolvers;
