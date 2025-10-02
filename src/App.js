import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cookieParser());

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({
    limits:"40kb"
}));

app.use(express.urlencoded({
    extended:true,
    limits:"40kb"
}));

app.use(express.static("public"));


import userRouter from "./Routes/user.route.js"

app.use("/Users" , userRouter)
app.use("/api/v1/users" , userRouter);

export default app;