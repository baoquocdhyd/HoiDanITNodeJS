"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctor_clinic_specialty extends Model {
    static associate(models) {}
  }
  doctor_clinic_specialty.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctor_clinic_specialty",
    }
  );
  return doctor_clinic_specialty;
};
