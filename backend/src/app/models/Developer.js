const { Model, DataTypes } = require('sequelize');

class Developer extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sexo: DataTypes.STRING,
      idade: DataTypes.INTEGER,
      hobby: DataTypes.STRING,
      datanascimento: DataTypes.DATEONLY,
    }, {
      sequelize
    });
  }
};

module.exports = Developer;