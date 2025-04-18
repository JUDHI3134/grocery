import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./configs/db.js"
import "dotenv/config"
import userRouter from "./routes/userRoutes.js"
import sellerRouter from "./routes/sellerroutes.js"
import connectCloudinary from "./configs/cloudinary.js"

const app = express()
const port = process.env.PORT || 4000

//db connection
await connectDB()
await connectCloudinary()

//allow multiple origins
const allowedOrigin = ['http://localhost:5173']

//middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigin, credentials: true}))


app.get("/", (req, res) => res.send("API Working"))
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    
})