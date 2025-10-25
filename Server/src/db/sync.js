import sequelize from './db.js';
import User from '../models/user.model.js';
import Snippet from '../models/snippets.model.js';
import Tag from '../models/tags.model.js';
import SnippetTag from '../models/snippettag.js';

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established!');
    
    await sequelize.sync({ force: false });
    console.log('All tables synced!');
  } catch (err) {
    console.error('Error connecting to DB:', err);
    throw err;
  }
};

export default syncDB;
