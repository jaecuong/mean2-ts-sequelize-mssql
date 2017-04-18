/* tslint:disable:variable-name */

import * as SequelizeStatic from "sequelize";
import { DataTypes, Sequelize } from "sequelize";
import { ProfileAttributes, ProfileInstance } from "./interfaces/profile-interface";

export default function (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<ProfileInstance, ProfileAttributes> {
  let Profile = sequelize.define<ProfileInstance, ProfileAttributes>("Profile", {
    Profile_Id: { type: dataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    Name: { type: dataTypes.STRING(50), allowNull: true },
    Email: { type: dataTypes.STRING(50), allowNull: false, unique: true },
    Passwd: { type: dataTypes.STRING, allowNull: true }, // STRING default is 255
    IsActive: { type: dataTypes.BOOLEAN, defaultValue: false }
  }, {
      indexes: [],
      classMethods: {},
      timestamps: true,
      createdAt: "CreatedDate",
      updatedAt: "ChangedDate",
    }, {
      hooks: { // http://docs.sequelizejs.com/en/latest/docs/hooks/
        beforeCreate: function (Profile, options) {
          Profile.CreatedDate = Date.now();
        },
        beforeUpdate: function (Profile, options) {
          Profile.ChangedDate = Date.now();
        }
      }
    });

  return Profile;
}
