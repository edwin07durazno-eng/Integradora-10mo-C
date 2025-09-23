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

    async updateEmployee(
        id: number,
        data: { fullName: string; phone: string; curp: string; salary: number }
    ) {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            throw new Error("Empleado no encontrado.");
        }

        try {
            await employee.update(data);
            return employee;
        } catch (error: any) {
            if (error.name === "SequelizeUniqueConstraintError") {
                if (error.errors[0].path === "curp") {
                    throw new Error("El CURP ya está registrado.");
                }
                if (error.errors[0].path === "phone") {
                    throw new Error("El teléfono ya está registrado.");
                }
            }
            throw error;
        }
    }

    async deleteEmployee(id: number) {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            throw new Error("Empleado no encontrado.");
        }
        await employee.destroy();
        return { message: "Empleado eliminado correctamente." };
    }
}
