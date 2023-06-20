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
      type: DataTypes.DOUBLE(10,10),
      allowNull: false
    },
    shipping_type: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "regular"
    },
    cost: {
      type: DataTypes.DOUBLE(10,10),
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
    receiver_city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
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
      allowNull: false,
      unique: "sender_phone"
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
    sender_city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    sender_branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branches',
        key: 'id'
      }
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
        name: "sender_phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sender_phone" },
        ]
      },
      {
        name: "receiver_city_id",
        using: "BTREE",
        fields: [
          { name: "receiver_city_id" },
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
        name: "sender_city_id",
        using: "BTREE",
        fields: [
          { name: "sender_city_id" },
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
