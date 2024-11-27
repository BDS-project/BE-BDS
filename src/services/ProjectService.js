import Project from '../models/Project.js';

const ProjectService = {
  getAllProjects: async (filter) => {
    const query = {};

    if (filter?.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter?.province) {
      query.province = filter.province;
    }

    if (filter?.district) {
      query.district = filter.district;
    }

    if (filter?.ward) {
      query.ward = filter.ward;
    }

    if (filter?.is_featured !== undefined) {
      query.is_featured = filter.is_featured;
    }

    if (filter?.launch_year !== undefined) {
      query.launch_year = filter.launch_year;
    }

    if (filter?.start_date || filter?.end_date) {
      query.created_at = {};
      if (filter.start_date)
        query.created_at.$gte = new Date(filter.start_date);
      if (filter.end_date) query.created_at.$lte = new Date(filter.end_date);
    }

    try {
      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const skip = (page - 1) * limit;

      const projects = await Project.find(query).skip(skip).limit(limit);

      return projects;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createProject: async (projectData) => {
    try {
      const project = new Project(projectData);
      await project.save();
      return project;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Project with this name already exists');
      }
      throw new Error(error.message);
    }
  },

  getProjectById: async (projectId) => {
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const project = await Project.findByIdAndUpdate(projectId, projectData, {
        new: true
      });
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProject: async (projectId) => {
    try {
      const project = await Project.findByIdAndDelete(projectId);
      if (!project) {
        throw new Error('Project not found');
      }
      return { message: 'Project deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ProjectService;
