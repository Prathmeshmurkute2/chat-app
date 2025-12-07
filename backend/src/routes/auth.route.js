import express from "express"
import { login , signuup } from '../controllers/auth.controller.js'
const router = express.Router();

router.get("/login",login);
router.post('/signup',signup);

export default router 