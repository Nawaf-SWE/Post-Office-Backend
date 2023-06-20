const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return branches.init(sequelize, DataTypes);
}

class branches extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    name_ar: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT(10,10),
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT(10,10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'branches',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "city_id",
        using: "BTREE",
        fields: [
          { name: "city_id" },
        ]
      },
    ]
  });
  }
}
