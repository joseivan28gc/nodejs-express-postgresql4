const db = require('../config/db.config.js');
const Autor = db.Autor;

// Crear un nuevo Autor
exports.create = (req, res) => {
    let autor = {};

    try {
        // Asignar los valores del cuerpo de la solicitud al objeto autor
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        // Crear el autor en la base de datos
        Autor.create(autor).then(result => {
            res.status(200).json({
                message: "Autor creado exitosamente con id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el autor!",
            error: error.message
        });
    }
};

// Obtener todos los Autores
exports.retrieveAllAutores = (req, res) => {
    Autor.findAll()
        .then(autorInfos => {
            res.status(200).json({
                message: "¡Autores obtenidos exitosamente!",
                autores: autorInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los autores!",
                error: error.message
            });
        });
};

// Obtener un Autor por ID
exports.getAutorById = (req, res) => {
    let autorId = req.params.id;

    Autor.findByPk(autorId)
        .then(autor => {
            if (!autor) {
                return res.status(404).json({
                    message: "Autor no encontrado con id = " + autorId
                });
            }
            res.status(200).json({
                message: "Autor obtenido exitosamente con id = " + autorId,
                autor: autor
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el autor con id!",
                error: error.message
            });
        });
};

// Actualizar Autor por ID
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró el Autor para actualizar con id = " + autorId,
                autor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };

            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });

            if (!result[0]) { // result[0] contiene el número de filas afectadas
                res.status(500).json({
                    message: "No se puede actualizar un autor con id = " + autorId,
                    error: "No se pudo actualizar el autor",
                });
            } else {
                res.status(200).json({
                    message: "Actualización exitosa del Autor con id = " + autorId,
                    autor: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un autor con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar Autor por ID
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No existe el autor con id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del Autor con id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un autor con id = " + req.params.id,
            error: error.message,
        });
    }
};
