import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
});

export default User;
