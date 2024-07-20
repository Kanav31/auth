import { Router } from 'express';
import {
    addAdmin,
    loginAdmin,
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
    changeAdmin
} from '../controllers/admin.controller.js';
import { verifyJWT } from '../middlewares/adminAuth.middleware.js';

const router = Router();

router.post("/add-admin", addAdmin);
router.post("/login-admin", loginAdmin);
router.post('/employees', verifyJWT, createEmployee);
router.get('/employees', verifyJWT, getAllEmployees);
router.get('/employees/:id', verifyJWT, getEmployeeById);
router.delete('/employees/:id', verifyJWT, deleteEmployee);
router.post("/change-admin", changeAdmin);


export default router;
