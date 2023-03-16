import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connect from './config/connectDB.js';
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js";
import helmet from 'helmet';
const app = express();

// midddlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(cors());
app.disable('x-powered-by') // less hackers know about our stack
app.use(express.static("/public"));
app.use(helmet()) // this will add some properise to http response header for security

const port = 8000;

// Apis
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);



connect().then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
}).catch((err) => {
    console.log('Cannot connect to server', err.message)
})
