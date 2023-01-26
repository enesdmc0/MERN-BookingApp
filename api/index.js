import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
//routes
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongodb");
    }catch (error){
        throw error
    }
}


mongoose.connection.on("disconnected" , () => {
    console.log("mongodb disconnected!");
})

//middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack: err.stack
    });
})

app.listen("8800", () => {
    connect()
    console.log("Backend is running..");
})


