import { Instance } from 'sequelize';

export interface ProfileAttributes {
  Profile_Id: number;
  Name: string;
  Email: string;
  Passwd: string;
  IsActive: boolean;
}

export interface ProfileInstance extends Instance<ProfileAttributes> {
  dataValues: ProfileAttributes;
}
