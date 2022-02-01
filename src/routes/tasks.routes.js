const { Router } = require('express');
const { getAllTasks, 
        getTask, 
        createTask, 
        deleteTask, 
        updateTask 
    } = require('../controllers/tasks.controllers');


const router = Router();

router.get('/tarea', getAllTasks);

router.get('/tarea/:id', getTask);

router.post('/tarea', createTask);

router.delete('/tarea/:id', deleteTask);

router.put('/tarea/:id', updateTask);

module.exports = router;