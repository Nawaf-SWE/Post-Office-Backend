const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cities.init(sequelize, DataTypes);
}

class cities extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_ar: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "name_ar_UNIQUE"
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "name_en_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'cities',
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
        name: "name_ar_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name_ar" },
        ]
      },
      {
        name: "name_en_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name_en" },
        ]
      },
    ]
  });
  }
}
