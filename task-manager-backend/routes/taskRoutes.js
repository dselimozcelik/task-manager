const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

// Tüm görevler ve yeni görev oluşturma
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

// Tek görev işlemleri (getirme, güncelleme, silme)
router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
