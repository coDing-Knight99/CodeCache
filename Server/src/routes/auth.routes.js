import {Router} from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
const authrouter = Router();
authrouter.route('/register').post(registerUser);
authrouter.route('/login').post(loginUser);
authrouter.route('/logout').post(verifyJWT,logoutUser);
export default authrouter;