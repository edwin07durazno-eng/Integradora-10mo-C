import { Request, Response } from "express";
import { EmployeeService } from "../services/employeeService";

const employeeService = new EmployeeService();

export class EmployeeController {
    async register(req: Request, res: Response) {
        try {
            const { fullName, phone, curp, salary } = req.body;

            if (!fullName || !phone || !curp || !salary) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }

            const employee = await employeeService.createEmployee({ fullName, phone, curp, salary });

            return res.status(201).json(employee);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
