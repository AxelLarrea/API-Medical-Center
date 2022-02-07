const pool = require('../db');


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
    getAllMedicos,
    getMedico,
    updateMedico,
    createMedico,
    deleteMedico
}