const DataTypes = require("sequelize").DataTypes;
const _branches = require("./branches");
const _cities = require("./cities");
const _customers = require("./customers");
const _fees = require("./fees");
const _packages = require("./packages");
const _tracking = require("./tracking");
const _users = require("./users");

function initModels(sequelize) {
  const branches = _branches(sequelize, DataTypes);
  const cities = _cities(sequelize, DataTypes);
  const customers = _customers(sequelize, DataTypes);
  const fees = _fees(sequelize, DataTypes);
  const packages = _packages(sequelize, DataTypes);
  const tracking = _tracking(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  packages.belongsTo(branches, { as: "receiver_branch", foreignKey: "receiver_branch_id"});
  branches.hasMany(packages, { as: "packages", foreignKey: "receiver_branch_id"});
  packages.belongsTo(branches, { as: "sender_branch", foreignKey: "sender_branch_id"});
  branches.hasMany(packages, { as: "sender_branch_packages", foreignKey: "sender_branch_id"});
  tracking.belongsTo(branches, { as: "branch", foreignKey: "branch_id"});
  branches.hasMany(tracking, { as: "trackings", foreignKey: "branch_id"});
  users.belongsTo(branches, { as: "branch", foreignKey: "branch_id"});
  branches.hasMany(users, { as: "users", foreignKey: "branch_id"});
  branches.belongsTo(cities, { as: "city", foreignKey: "city_id"});
  cities.hasMany(branches, { as: "branches", foreignKey: "city_id"});
  tracking.belongsTo(packages, { as: "package", foreignKey: "package_id"});
  packages.hasMany(tracking, { as: "trackings", foreignKey: "package_id"});
  tracking.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(tracking, { as: "trackings", foreignKey: "user_id"});

  return {
    branches,
    cities,
    customers,
    fees,
    packages,
    tracking,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
