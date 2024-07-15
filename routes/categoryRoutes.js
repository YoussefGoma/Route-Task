import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controller/categoryController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;