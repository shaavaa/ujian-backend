import express from "express"
import { createCar, deleteCar, readCar, updateCar } from "../controller/carController"
import { verifyAdmin } from "../middleware/Login"

const app = express()

app.use(express.json())

app.get(`/car`, readCar)
app.post(`/car`, createCar)
app.put(`/car/:carID`, updateCar)
app.delete(`/car/:carID`, deleteCar)

export default app