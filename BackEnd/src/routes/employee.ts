import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { authenticateToken } from "../middleware/authMiddleware"; // Dueño autenticado

const router = Router();
const employeeController = new EmployeeController();

router.post("/employees", authenticateToken, (req, res) => employeeController.register(req, res));

export default router;
