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
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    ]
  });
  }
}
