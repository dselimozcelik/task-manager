import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Task from './Task';
import CreateTask from './CreateTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      setTasks(prevTasks => [...prevTasks, data]);
      setShowCreateModal(false);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedTask)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      setTasks(prevTasks =>
        prevTasks.map(task => task._id === data._id ? data : task)
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add New Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {showCreateModal && (
        <CreateTask
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTask}
        />
      )}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No tasks found. Create one to get started!</p>
        ) : (
          tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList; 