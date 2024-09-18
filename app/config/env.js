const env = {
    database: 'umg202414036_qcir',
    username: 'umg202414036_qcir_user',
    password: 'L0Hni7xhgaJQYlcEqyaIphv6YnEatlAu',
    host: 'dpg-cr6k0jdds78s73bv04ng-a.oregon-postgres.render.com', 
    dialect: 'postgres',
    ssl: true,
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;