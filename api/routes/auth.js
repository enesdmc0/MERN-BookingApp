import express from "express";
import {login, register} from '../controllers/auth.js';

const router = express.Router();

// USER REGISTRATION
router.post("/register", register);
// USER LOGIN
router.post("/login", login)

export default router;