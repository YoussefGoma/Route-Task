import express from 'express';
import { createTask, getTasks, getPublicTasks, getPublicTaskById, updateTask, deleteTask } from '../controller/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/public', getPublicTasks);
router.get('/public/:id', getPublicTaskById);

router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;