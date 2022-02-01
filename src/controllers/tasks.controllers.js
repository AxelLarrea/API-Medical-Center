const pool = require('../db');


const getAllTasks = async (req, res, next) => {

    try {
        const result = await pool.query('select * from obrasocial');
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
}

const getTask = async (req, res, next) => {
    
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

const createTask = async (req, res, next) => {
    
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

const deleteTask = async (req, res, next) => {
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

const updateTask = async (req, res, next) => {
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

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}