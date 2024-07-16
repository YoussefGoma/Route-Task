import Task from '../model/task.js';
import Category from '../model/category.js';
import { paginateResults, formatPaginatedResponse } from '../utils/pagination.js';
import { buildFilterQuery} from '../utils/filtration.js';

export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const {page,limit, category, shared } = req.query;
    const paginationOptions = paginateResults(page, limit);

        const filters = {
            shared: shared,
            userId: req.userId,
            category: category,
          }
        Object.keys(filters).forEach(
            (key) => filters[key] === undefined && delete filters[key]
          )

          
          let tasks = new Task()
          if (filters.category) {
            const category = await Category.findOne({ name: filters.category })
            filters.category = category._id
            tasks = await Task
              .find(filters)
              .limit(paginationOptions.limit)
              .skip(paginationOptions.skip)
              .populate("category")
          } else if (!filters.category) {
            tasks = await Task
              .find(filters)
              .limit(paginationOptions.limit)
              .skip(paginationOptions.skip)
              .populate("category")
          }
          const total = await Task.find(filters).count();

        return res.json(formatPaginatedResponse(tasks, total, page, paginationOptions.limit));
      
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicTasks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const query = { shared: true };
    const paginationOptions = paginateResults(page, limit);

    const tasks = await Task.find(query, null, {
      ...paginationOptions
    }).populate('category', 'name');

    const total = await Task.countDocuments(query);

    res.json(formatPaginatedResponse(tasks, total, page, paginationOptions.limit));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, shared: true }).populate('category', 'name');
    if (!task) {
      return res.status(404).json({ message: 'Public task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    console.log(req.userId)
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};