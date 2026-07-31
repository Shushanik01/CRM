import express from "express"; 
import connectDB from "./src/config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./src/routes/authRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import dealRoute from "./src/routes/dealRoutes.js";

const app = express(); 
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRouter);
app.use("/api/company", companyRoutes);
app.use("/api/deal", dealRoute)

app.get("/", (req, res)=> {
   res.send("CRM API is running")
});

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, ()=> {
    console.log("Server is running on port", PORT);

} );

server.on("error", (err) => {
    console.error("Server failed to start:", err);
});