const initModels = require('./init-models');
const {sequelize} = require("../config/db");

module.exports = initModels(sequelize);