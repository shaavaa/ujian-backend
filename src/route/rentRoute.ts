import express from "express"
import { verifyAdmin } from "../middleware/Login"
import { createRent, deleteRent, readRent, updateRent } from "../controller/rentController"

const app = express()

app.use(express.json())

app.get(`/rent`, readRent)
app.post(`/rent`, createRent)
app.put(`/rent/:rentID`, updateRent)
app.delete(`/rent/:rentID`, deleteRent)

export default app