'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')


module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:'A name is require'
        },
        notEmpty:{
          msg:'Please provide a name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:'A last name is require'
        },
        notEmpty:{
          msg:'Please provide a last name'
        }
      }    
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg:'The email entered already exist'
        },
        validate:{
          notNull:{
            msg:'A email is require'
          },
          isEmail:{
            msg:'Please provide a valid email'
          }
        }    
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg:'A password is require'
        },
        notEmpty:{
          msg:'Please provide a password'
        },  
      },
      set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
      }
    },
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};