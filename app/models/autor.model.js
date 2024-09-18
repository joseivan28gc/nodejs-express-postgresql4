module.exports = (sequelize, Sequelize) => {
	const Autor = sequelize.define('autor', {
	  id_autor: {
			type: Sequelize.INTEGER,
      autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
	    type: Sequelize.STRING
	  },
    apellido: {
      type: Sequelize.STRING
    },
    nacionalidad: {
      type: Sequelize.STRING
    },
    fecha_nacimiento: {
      type: Sequelize.DATE
    }
	});
	
	return Autor;
}
