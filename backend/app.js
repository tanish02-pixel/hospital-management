import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbconnection } from './database/dbConnection.js';
import messageRouter from './router/messageRouter.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js'
import userRouter from './router/userRouter.js';
import appointmentRouter from './router/appointmentRouter.js';


const app = express();
config({path: "./config/config.env"});



const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:'/tmp/',
}));

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);



app.use(errorMiddleware);


export default app;
