import express from "express";
import { verifyAdmin } from "../middleware/Login";
import { createAdmin, deleteAdmin, login, readAdmin, updateAdmin } from "../controller/adminController";

const app = express()

app.use(express.json())

app.get(`/admin`, verifyAdmin, readAdmin)
app.post(`/admin`, createAdmin)
app.put(`/admin/:adminID`, verifyAdmin, updateAdmin)
app.delete(`/admin/:adminID`, verifyAdmin, deleteAdmin)
app.post(`/admin/login`, login)

export default app