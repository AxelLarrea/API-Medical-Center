const pool = require('../db');
const mercadopago = require('mercadopago');


mercadopago.configure({
    access_token: 'TEST-6681852449549527-011114-6e1298bcd02883483764079ad1bb0677-323174271'
})


const getMedicosObraSocial = async (req, res, next) => {
    try {
        const result = await pool.query('select * from medico_especialidad_obraSocial');
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
}


const getAllMedico = async (req, res, next) => {
    try {
        const result = await pool.query('select * from lista_medico');
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
}

const GetEspecialidades = async (req, res, next) => {
    try{
        const result = await pool.query('select * from especialidad');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const GetObraSocial = async (req, res, next) => {
    try{
        const result = await pool.query('select * from obrasocial');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const GetObraSocialIndividual = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query('select * from obrasocial where id = $1', [id]);
        
        if (result.rows.length === 0) 
        return res.status(404).json({
            message: "Obra social no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const GetHistoriaClinicaIndividual = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query('select * from historiaclinica_paciente where dni = $1',[id]);
        
        if (result.rows.length === 0) 
        return res.status(404).json({
            message: "Historia clinica no encontrada"
        });
        
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const GetHistoriaClinicaDetalleIndividual = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query('select * from historiaclinica_paciente where id = $1',[id]);
        
        if (result.rows.length === 0) 
        return res.status(404).json({
            message: "Historia clinica no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const GetTurno = async (req, res, next) => {
    try{
        const result = await pool.query('select * from turno');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const GetTipoTurno = async (req, res, next) => {
    try{
        const result = await pool.query('select * from tipoturno');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getTurnosIndividual = async (req, res, next) => {
    try{
        const { id } = req.params;
        const result = await pool.query('select fecha, hora, montoapagar, nombre, apellido, id from turno_usuario where id_usuariop = $1',
                        [id]);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const deleteTurnoIndividual = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('delete from turno where id = $1', [id]);

        if (result.rowCount.length === 0) 
            return res.status(404).json({
                message: "Turno no encontrado"
        });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
    
}


const updateNomyApe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, apellido} = req.body;

        const result = await pool.query(
            'update usuario set nombre = $1, apellido = $2 where dni = $3 returning *', 
            [nombre, apellido, id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Usuario no encontrado"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateCorreoElectronico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { correo} = req.body;

        const result = await pool.query(
            'update usuario set correoelectronico = $1 where dni = $2 returning *', 
            [correo, id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Usuario no encontrado"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateContraseña = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { contraseña } = req.body;

        const result = await pool.query(
            'update usuario set contraseña = $1 where dni = $2 returning *', 
            [contraseña, id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Usuario no encontrado"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateTelefono = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { telefono } = req.body;

        const result = await pool.query(
            'update usuario set telefono = $1 where dni = $2 returning *', 
            [telefono, id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Usuario no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


/* DATOS DE LA TABLA NOTICIAS */

const getAllNoticias = async (req, res, next) => {

    try {
        const result = await pool.query('select * from noticia');
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
}



const getNoticia = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        
        const result = await pool.query('select * from noticia where id = $1', [id]);
        
        if (result.rows.length === 0) 
        return res.status(404).json({
            message: "Noticia no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

/* """"""""""LOGIN""""""""""" */

const getUsuarios = async (req, res, next) => {
    try {
        const { correo } = req.params;
        
        const result = await pool.query('select correoelectronico, contraseña, dni, idrol from usuario where correoelectronico  = $1', [correo]);
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
}



const createTurno = async (req, res, next) => {
    try{
        const { precio, fecha, hora, paciente, tipoTurno, medico, id_transaccion, pago } = req.body;

        const result = await pool.query(
            'insert into turno (fecha, hora, montoapagar, id_usuariom, id_usuariop, id_tipoturno, id_transaccion, pago) values($1, $2, $3, $4, $5, $6, $7, $8) returning *',
            [fecha, hora, precio, medico, paciente, tipoTurno, id_transaccion, pago]);

            res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}


const deleteTurnoTransaccion = async (req, res, next) => {
    try{
        const { transaccion } = req.params;

        const result = await pool.query('delete from turno where id_transaccion = $1', [transaccion]);

        if (result.rowCount.length === 0) 
            return res.status(404).json({
                message: "Turno no encontrado"
        });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }    
} 

const GetTurnoTransaccion = async (req, res, next) => {
    try{
        const { transaccion } = req.params;
    
        const result = await pool.query('select * from turno_usuario_transaccion where id_transaccion = $1', [transaccion]);
        
        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

const PutTurnoTransaccion = async (req, res, next) => {
    try{
        const { transaccion } = req.params;

        const result = await pool.query('update turno set pago = $1 where id_transaccion = $2', ["true", transaccion]);
        res.json(result.rows[0]);

    } catch (error){
        next(error)
    }
}



const createUsuario = async (req, res, next) => {
    try {
        const { nombre , apellido, correoElectronico, contraseña, genero, fechaNac, dni, telefono, factorSanguineo, nroAfiliadoOS, id_obrasocial, idrol} = req.body;

        const result = await pool.query(
        'insert into usuario (dni, nombre, apellido, genero, correoelectronico, contraseña, fechanac, factorsanguineo, telefono, nroAfiliadoOS, id_obrasocial, idrol) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *', 
        [dni, nombre, apellido, genero, correoElectronico, contraseña, fechaNac, factorSanguineo, telefono, nroAfiliadoOS, id_obrasocial, idrol]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

const deleteTurnoImpagoTransaccion = async (req, res, next) => {
    try {
        const result = await pool.query('delete from turno where pago is false ');

        if (result.rowCount.length === 0) 
            return res.status(404).json({
                message: "Obra social no encontrada"
        });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
    
}


// Funciones para Obras Sociales

const getAllObras = async (req, res, next) => {

    try {
        const result = await pool.query('select * from obrasocial');
        res.json(result.rows);
        
    } catch (error) {
        next(error);
    }
}

const getObra = async (req, res, next) => {
    
    try {
        const { id } = req.params;

        const result = await pool.query('select * from obrasocial where id = $1', [id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Obra social no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createObra = async (req, res, next) => {
    
    try {
        const { nombre , porcentajecobertura } = req.body;
        
        const result = await pool.query(
        'insert into obrasocial (nombre, porcentajecobertura) values ($1, $2) returning *', 
        [nombre, porcentajecobertura]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

const deleteObra = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('delete from obrasocial where id = $1', [id]);

        if (result.rowCount.length === 0) 
            return res.status(404).json({
                message: "Obra social no encontrada"
        });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
    
}

const updateObra = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, porcentajecobertura} = req.body;

        const result = await pool.query(
            'update obrasocial set nombre = $1, porcentajecobertura = $2 where id = $3 returning *', 
            [nombre, porcentajecobertura, id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Obra social no encontrada"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

// Funciones para Médicos

const getAllMedicos = async (req, res, next) => {

    try {
        const result = await pool.query('select * from medico join usuario on medico.dni = usuario.dni');
        res.json(result.rows);
        
    } catch (error) {
        next(error);
    }
}

const getMedico = async (req, res, next) => {
    
    try {
        const { id } = req.params;

        const result = await pool.query('select * from medico join usuario on medico.dni = usuario.dni where cuil = $1', [id]);

        if (result.rows.length === 0) 
            return res.status(404).json({
                message: "Medico no encontrado"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nromatricula, provincia, ciudad, direccion, codigopostal, especialidad, mutual, nombre, apellido, genero, correoelectronico, fechanac, factorsanguineo, telefono} = req.body;

        const dni = id.slice(2,10);

        const result = await pool.query(
            'update medico set nromatricula = $1, provincia = $2, ciudad = $3, direccion = $4, codigopostal = $5, especialidad = $6, mutual = $7 where cuil = $8 returning *', 
            [nromatricula, provincia, ciudad, direccion, codigopostal, especialidad, mutual, id]);

        const result2 = await pool.query(
            'update usuario set nombre = $1, apellido = $2, genero = $3, correoelectronico = $4, fechanac = $5, factorsanguineo = $6, telefono = $7 where dni = $8 returning *', 
            [nombre, apellido, genero, correoelectronico, fechanac, factorsanguineo, telefono, dni]);

        if (result.rows.length === 0 || result2.rows.length === 0) 
            return res.status(404).json({
                message: "Médico no encontrado"
        });
        
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createMedico = async (req, res, next) => {
    try {
        
        const { dni, cuil, nromatricula, provincia, ciudad, direccion, codigopostal, especialidad, mutual, nombre, apellido, genero, correoelectronico, fechanac, factorsanguineo, telefono} = req.body;

        
        const result2 = await pool.query(
            'insert into usuario (dni, nombre, apellido, genero, correoelectronico, contraseña, fechanac, factorsanguineo, telefono, id_obrasocial, idrol) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *', 
            [dni, nombre, apellido, genero, correoelectronico, 'contraseña', fechanac, factorsanguineo, telefono, 3, 1]);
            
        const result = await pool.query(
            'insert into medico (dni, cuil, nromatricula, provincia, ciudad, direccion, codigopostal, especialidad, mutual) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *', 
            [dni, cuil, nromatricula, provincia, ciudad, direccion, codigopostal, especialidad, mutual]);

        
        res.json([result.rows[0], result2.rows[0]]);
    } catch (error) {
        next(error);
    }
}

const deleteMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dni = id.slice(2,10);

        const result = await pool.query('delete from medico where cuil = $1', [id]);
        const result2 = await pool.query('delete from usuario where dni = $1', [dni]);

        if (result.rowCount.length === 0 || result2.rowCount.length === 0) 
            return res.status(404).json({
                message: "Médico y usuario no encontrado"
        });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllObras,
    getObra,
    createObra,
    deleteObra,
    updateObra,
    getAllMedico,
    getMedico,
    updateMedico,
    createMedico,
    deleteMedico,
    getAllMedicos,
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
}