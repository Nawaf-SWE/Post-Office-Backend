const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return packages.init(sequelize, DataTypes);
}

class packages extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weight: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    shipping_type: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "Regular"
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package_category: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    receiver_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    receiver_phone: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    receiver_email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    receiver_building_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiver_postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiver_street: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    receiver_branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id'
      }
    },
    sender_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    sender_phone: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    sender_email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    sender_building_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sender_postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sender_street: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sender_branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id'
      }
    },
    tracking_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "tracking_number_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'packages',
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
        name: "tracking_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tracking_no" },
        ]
      },
      {
        name: "receiver_branch_id",
        using: "BTREE",
        fields: [
          { name: "receiver_branch_id" },
        ]
      },
      {
        name: "sender_branch_id",
        using: "BTREE",
        fields: [
          { name: "sender_branch_id" },
        ]
      },
    ]
  });
  }
}
