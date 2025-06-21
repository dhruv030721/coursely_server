import { Application, Request, Response } from "express"
import express from "express"
import dotenv from "dotenv"
import routes from "./routes/router"
import { logger, morganMiddleware } from "yayinstocks_shared_module/utility/logger"
import { initalizeDBPackage } from "yayinstocks_shared_module"
import cors from "cors";

// Load environment variables
dotenv.config()
const PORT = process.env.PORT || 3000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: ["https://qa1.yayinstocks.com", "http://localhost:5173"], credentials: true }));
app.use(morganMiddleware)

// Server Listening
app.listen(PORT, () => {
    logger.info(`Server started on ${PORT} successfully!`)

    // Database connection 
    initalizeDBPackage()

    routes(app)
})

// Server main route
app.get('/', (req: Request, res: Response) => {
    res.send('Yayinstocks server running....')
})