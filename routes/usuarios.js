const express = require('express');
const rutaUsuario = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/basedatos');

rutaUsuario.get('/obtenerUsuarios/:nombre([A-Za-z]+)', async (req, res, next) => {
    var nombre = req.params.nombre;
    if (nombre) {
        let query = "SELECT id_us,nombre,apellidos,telefono,correo,direccion FROM usuarios WHERE lower(nombre) = lower(?);";
        const consulta = await db.query(query, [nombre]).catch((error) => {
            res.status(500).json({
                code: 500,
                message: "Se produjo un error"
            });
        });
        if (consulta.length > 0) {
            res.status(200).json({
                code: 200,
                message: consulta
            });
        } else {
            res.status(404).json({
                code: 404,
                message: "No se encontraron resultados"
            });
        }
    } else {
        res.status(404).json({
            code: 404,
            message: "Por favor, ingrese un nombre para buscar"
        });
    }

});
rutaUsuario.post('/altaUsuario', async (req, res, next) => {
    const {
        nombre,
        apellidos,
        telefono,
        correo,
        direccion,
        contrasena
    } = req.body;
    console.log(req.body);
    if (nombre && apellidos && telefono && correo && direccion && contrasena) {
        let query = "INSERT INTO usuarios VALUES (null,?,?,?,?,?,?,default)";
        const rows = await db.query(query, [nombre, apellidos, telefono, correo, direccion, contrasena]).catch((error) => {
            res.status(500).json({
                code: 500,
                message: "Se produjo un error"
            });
        });
        console.log(rows);
        if (rows.affectedRows == 1) {
            res.status(200).json({
                code: 200,
                message: "Usuario dado de alta correctamente"
            });
        } else {
            res.status(404).json({
                code: 404,
                message: "No se encontraron resultados"
            });
        }
    } else {
        res.status(404).json({
            code: 404,
            message: "Uno o mas campos vacios"
        });
    }

});
rutaUsuario.patch('/modificarUsuario/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const {
        nombre,
        apellidos,
        telefono,
        direccion
    } = req.body;
    if (nombre && apellidos && telefono && direccion && id) {
        let query = "UPDATE usuarios SET nombre = ?, apellidos = ?, telefono = ? , direccion = ? WHERE id_us = ?;";
        const rows = await db.query(query, [nombre, apellidos, telefono, direccion, id]).catch((error) => {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: "Se produjo un error"
            });
        });
        if (rows.affectedRows == 1) {
            res.status(200).json({
                code: 200,
                message: "Informacion actualizada correctamente"
            });
        } else {
            res.status(404).json({
                code: 404,
                message: "No se encontraron resultados"
            });
        }
    } else {
        res.status(404).json({
            code: 404,
            message: "Uno o mas campos vacios"
        });
    }

});
rutaUsuario.delete('/eliminarUsuario/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        let query = "DELETE FROM usuarios WHERE id_us = ?;";
        const rows = await db.query(query, [id]).catch((error) => {
            res.status(500).json({
                code: 500,
                message: "Se produjo un error"
            });
        });
        if (rows.affectedRows == 1) {
            res.status(200).json({
                code: 200,
                message: "Usuario eliminado correctamente"
            });
        } else {
            res.status(404).json({
                code: 404,
                message: "No se encontraron resultados"
            });
        }
    } else {
        res.status(404).json({
            code: 404,
            message: "Uno o mas campos vacios"
        });
    }

});

module.exports = rutaUsuario;