import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface EmployeeAttributes {
    id: number;
    fullName: string;
    phone: string;
    curp: string;
    salary: number;
}

interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, "id"> { }

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes>
    implements EmployeeAttributes {
    public id!: number;
    public fullName!: string;
    public phone!: string;
    public curp!: string;
    public salary!: number;
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true, // Teléfono único
        },
        curp: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true, // CURP único
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "employees",
        timestamps: true,
    }
);

export default Employee;
