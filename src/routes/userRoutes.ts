import express from "express";
import userController from "../controller/userController";
import { verifyToken, verifyEmailAndPassword} from "../middleware/auth"; 
const router = express.Router();


router.get("/users", userController.getUsers); 
router.get("/users/:id", userController.getUserById);
router.get("/users/:id/runs", userController.getUserWithRuns); // Assuming this is the route to get user with runs
router.put("/users/:id", verifyToken, userController.updateUser)  
router.delete("/users/:id", verifyEmailAndPassword, userController.deleteUser);

export default router;

