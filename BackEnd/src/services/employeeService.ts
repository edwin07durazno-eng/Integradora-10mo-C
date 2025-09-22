import Employee from "../models/employee";

export class EmployeeService {
    async createEmployee(data: {
        fullName: string;
        phone: string;
        curp: string;
        salary: number;
    }) {
        // Verificar si el CURP ya existe
        const existingCurp = await Employee.findOne({ where: { curp: data.curp } });
        if (existingCurp) {
            throw new Error("El CURP ya está registrado");
        }

        // Verificar si el teléfono ya existe
        const existingPhone = await Employee.findOne({ where: { phone: data.phone } });
        if (existingPhone) {
            throw new Error("El teléfono ya está registrado");
        }

        const employee = await Employee.create(data);
        return employee;
    }
    
    async getAllEmployees() {
        return await Employee.findAll({
            attributes: ["id", "fullName", "phone", "curp", "salary"],
        });
    }
}
