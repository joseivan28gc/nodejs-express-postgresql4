const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo Libro
exports.create = (req, res) => {
    let libro = {};

    try {
        // Asignar los valores del cuerpo de la solicitud al objeto libro
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        // Crear el libro en la base de datos
        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el libro!",
            error: error.message
        });
    }
};

// Obtener todos los Libros
exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "¡Libros obtenidos exitosamente!",
                libros: libroInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los libros!",
                error: error.message
            });
        });
};

// Obtener un Libro por ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;

    Libro.findByPk(libroId)
        .then(libro => {
            if (!libro) {
                return res.status(404).json({
                    message: "Libro no encontrado con id = " + libroId
                });
            }
            res.status(200).json({
                message: "Libro obtenido exitosamente con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el libro con id!",
                error: error.message
            });
        });
};

// Actualizar Libro por ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el Libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };

            let result = await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un libro con id = " + libroId,
                    error: "No se pudo actualizar el libro",
                });
            } else {
                res.status(200).json({
                    message: "Actualización exitosa del Libro con id = " + libroId,
                    libro: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un libro con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar Libro por ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe el libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del Libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un libro con id = " + req.params.id,
            error: error.message,
        });
    }
};
