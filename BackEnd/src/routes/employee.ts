import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { authenticateToken } from "../middleware/authMiddleware"; // Dueño autenticado

const router = Router();
const employeeController = new EmployeeController();

// Registrar un nuevo empleado
router.post("/", authenticateToken, (req, res) => employeeController.register(req, res));

// Obtener todos los empleados
router.get("/", authenticateToken, (req, res) => employeeController.getAll(req, res));

// Modificar empleado
router.put("/:id", authenticateToken, (req, res) => employeeController.update(req, res));

// Eliminar empleado
router.delete("/:id", authenticateToken, (req, res) => employeeController.delete(req, res));

export default router;
