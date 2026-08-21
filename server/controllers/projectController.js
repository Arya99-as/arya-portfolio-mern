import { Project } from '../models/Project.js';
import { initialProjectsData } from '../seed.js';

let inMemoryProjects = [...initialProjectsData];

// GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    try {
      let dbProjects = await Project.find({}).sort({ createdAt: 1 });
      if (!dbProjects || dbProjects.length === 0) {
        dbProjects = await Project.insertMany(initialProjectsData);
      }
      return res.json(dbProjects);
    } catch (e) {
      // Fallback
    }
    return res.json(inMemoryProjects);
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        return res.json({ success: true, data: project });
      }
    } catch (e) {
      // Fallback
    }

    const item = inMemoryProjects.find((p) => p._id === req.params.id || p.id === req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Project not found');
    }
    return res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const { title, description, category, technologies, image, githubUrl, github, liveUrl, liveDemo, featured, initials, typeBadge, cardAccent, keyFeatures } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required for a project');
    }

    const newProjectData = {
      _id: Date.now().toString(),
      title,
      description,
      category: category || 'Web Development',
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(s => s.trim()) : ['React', 'JavaScript']),
      image: image || '',
      githubUrl: githubUrl || github || 'https://github.com/Arya99-as',
      github: github || githubUrl || 'https://github.com/Arya99-as',
      liveUrl: liveUrl || liveDemo || '#',
      liveDemo: liveDemo || liveUrl || '#',
      featured: Boolean(featured),
      initials: initials || title.slice(0, 2).toUpperCase(),
      typeBadge: typeBadge || 'Web Application',
      cardAccent: cardAccent || 'linear-gradient(135deg, #F2B84B, #E67E22)',
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      createdAt: new Date().toISOString()
    };

    try {
      const created = await Project.create(newProjectData);
      return res.status(201).json({ success: true, message: 'Project created successfully', data: created });
    } catch (e) {
      inMemoryProjects.unshift(newProjectData);
      return res.status(201).json({ success: true, message: 'Project created successfully', data: newProjectData });
    }
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        Object.assign(project, req.body);
        const updated = await project.save();
        return res.json({ success: true, message: 'Project updated successfully', data: updated });
      }
    } catch (e) {
      // Fallback
    }

    const index = inMemoryProjects.findIndex((p) => p._id === req.params.id || p.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Project not found');
    }

    inMemoryProjects[index] = { ...inMemoryProjects[index], ...req.body };
    return res.json({ success: true, message: 'Project updated successfully', data: inMemoryProjects[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        await project.deleteOne();
        return res.json({ success: true, message: 'Project removed successfully' });
      }
    } catch (e) {
      // Fallback
    }

    const index = inMemoryProjects.findIndex((p) => p._id === req.params.id || p.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Project not found');
    }

    inMemoryProjects.splice(index, 1);
    return res.json({ success: true, message: 'Project removed successfully' });
  } catch (error) {
    next(error);
  }
};
