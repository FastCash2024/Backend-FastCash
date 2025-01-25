import express from "express";
import { getUsersAttendance, getUsersAttendanceById, registerAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get('/', getUsersAttendance);
router.get('/:user', getUsersAttendanceById);
router.post('/registerAttendance', registerAttendance);
// router.put('/update', updateAttendance);

export default router;