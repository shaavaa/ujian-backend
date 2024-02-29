import { log } from "console";
import express, {Request, Response} from "express";
import {verifyAdmin} from "./middleware/Login";
import adminRoute from "./route/adminRoute";
import carRoute from "./route/carRoute";
import rentRoute from "./route/rentRoute";

const app = express()

const PORT = 8000

app.use(express.json())

app.use(adminRoute)
app.use(carRoute)
app.use(rentRoute)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})