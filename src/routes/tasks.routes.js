const { Router } = require('express');
const { getAllObras, 
        getObra, 
        createObra, 
        deleteObra, 
        updateObra, 
        getAllMedicos,
        getMedico,
        updateMedico,
        createMedico,
        deleteMedico
    } = require('../controllers/tasks.controllers');


const router = Router();

// Rutas para Obras Sociales

router.get('/obra-social', getAllObras);

router.get('/obra-social/:id', getObra);

router.post('/obra-social', createObra);

router.delete('/obra-social/:id', deleteObra);

router.put('/obra-social/:id', updateObra);



// Rutas para Médicos

router.get('/medicos', getAllMedicos);
router.get('/medicos/:id', getMedico);
router.put('/medicos/:id', updateMedico);
router.post('/medicos', createMedico);
router.delete('/medicos/:id', deleteMedico);

module.exports = router;