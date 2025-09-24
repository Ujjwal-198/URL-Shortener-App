import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import DBconnection from './config/DBconnection.js';
import userRoute from './routes/userRoute.js';
import urlRoute from './routes/urlRoute.js';
import { authMiddleware, UrlLimiter, UserLimiter } from './middlewares/index.js';

// config
const app = express();
const port = process.env.PORT;
const DBurl = process.env.DB_URL;
await DBconnection(DBurl);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// routes
app.use('/api/user', UserLimiter, userRoute);
app.use('/api/url', authMiddleware, urlRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});


app.listen(port, () => {
  console.log(`Server started at port ${port} : http://localhost:${port}`);
})
