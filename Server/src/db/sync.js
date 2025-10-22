import sequelize from './db.js';
import User from '../models/user.model.js';

const syncDB = async () => {
  try {
    await sequelize.authenticate(); // Test connection
    console.log('Connection established!');
    
    await sequelize.sync({ force: false }); // Creates table if not exists
    console.log('All tables synced!');
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
};

export default syncDB;