import { Request, Response } from "express";
import { EmployeeService } from "../services/employeeService";

const employeeService = new EmployeeService();

export class EmployeeController {
    async register(req: Request, res: Response) {
        try {
            const { fullName, phone, curp, salary } = req.body;

            // Validación de campos requeridos
            if (!fullName || !phone || !curp || !salary) {
                return res.status(400).json({ message: "Todos los campos son requeridos." });
            }

            // Llama al servicio para crear el empleado
            const employee = await employeeService.createEmployee({ fullName, phone, curp, salary });

            // Si todo es exitoso, devuelve 201 Created
            return res.status(201).json(employee);

        } catch (error: any) {
            // Manejo de errores específicos
            if (error.message.includes("CURP ya está registrado") || error.message.includes("teléfono ya está registrado")) {
                // Error de conflicto, idealmente desde el servicio
                return res.status(409).json({ message: error.message });
            }

            // Si no es un error conocido, asume que es un error del servidor
            console.error("Error en la creación de empleado:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const employees = await employeeService.getAllEmployees();
            return res.json(employees);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    }
}