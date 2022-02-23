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
        deleteMedico,
        getAllMedico,
        getAllNoticias,
        getNoticia,
        getUsuarios,
        createUsuario,
        GetEspecialidades,
        GetObraSocial,
        getMedicosObraSocial,
        GetTurno,
        GetTipoTurno,
        GetObraSocialIndividual,
        updateNomyApe,
        updateTelefono,
        updateCorreoElectronico,
        updateContraseña,
        getTurnosIndividual,
        deleteTurnoIndividual,
        GetHistoriaClinicaIndividual,
        GetHistoriaClinicaDetalleIndividual,
        createTurno,
        deleteTurnoTransaccion,
        GetTurnoTransaccion,
        PutTurnoTransaccion,
        deleteTurnoImpagoTransaccion
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

// Si

router.get('/medicos', getAllMedico);

router.get('/noticias', getAllNoticias);

router.get('/noticias/:id', getNoticia);

router.get('/login/:correo', getUsuarios);

router.post('/registro', createUsuario);

router.get('/especialidad', GetEspecialidades);

router.get('/obrasocial', GetObraSocial);

router.get('/medicosobrasocial', getMedicosObraSocial);

router.get('/turno', GetTurno);

router.get('/tipoturno', GetTipoTurno);

router.get('/obrasocial/:id', GetObraSocialIndividual);

router.put('/nombreapellido/:id', updateNomyApe);

router.put('/correoelectronico/:id', updateCorreoElectronico);

router.put('/telefono/:id', updateTelefono);

router.put('/contrasena/:id', updateContraseña);

router.get('/misturnos/:id', getTurnosIndividual);

router.delete('/deleteturno/:id', deleteTurnoIndividual);

router.get('/historiaclinica/:id', GetHistoriaClinicaIndividual)

router.get('/historiaclinicadetalle/:id', GetHistoriaClinicaDetalleIndividual);

router.post('/cargarturno', createTurno);

router.delete('/deletetransaccion/:transaccion', deleteTurnoTransaccion)

router.get('/turnoindividual/:transaccion', GetTurnoTransaccion);

router.put('/turnouptransaccion/:transaccion', PutTurnoTransaccion);

router.delete('/deleteimpagos', deleteTurnoImpagoTransaccion)


module.exports = router;