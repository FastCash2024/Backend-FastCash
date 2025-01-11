import express from "express";
import { getUsersAttendance, registerAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get('/', getUsersAttendance);
router.post('/registerAttendance', registerAttendance);
// router.put('/update', updateAttendance);

export default router;