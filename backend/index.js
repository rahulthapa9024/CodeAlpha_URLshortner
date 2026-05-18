import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectToDB } from "./utils/ConnectToDB.js"
import { RedirectUrl } from "./controllers/url.shortnerAPI.js";

dotenv.config()
const app = express()

// CORS configuration supporting cookie credentials and typical dev ports
app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());
app.use(morgan("dev"))

app.get("/check",(req,res)=>{
    res.send("Server Running Successfully")
})

import userRouter from "./routes/user.route.js"

app.use("/user",userRouter)

// Root level short URL redirect route
app.get("/:shortCode", RedirectUrl)

app.listen(process.env.PORT,()=>{
    ConnectToDB()
    console.log("Server Running on PORT 3000")
})