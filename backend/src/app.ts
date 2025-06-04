import { Application, Request, Response } from "express"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/mongo.db"
import routes from "./routes/router"
import { logger } from "yayinstocks_shared_module/utility/logger"

// Load environment variables
dotenv.config()
const PORT = process.env.PORT || 3000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Server Listening
app.listen(PORT, () => {
    logger.info(`Server started on ${PORT} successfully!`)

    // Database connection 
    connectDB()
        .then(() => {
            logger.info('Database connected successfully!')
        })
        .catch((error) => {
            logger.error('Database connection failed:', error);
        })

    routes(app)
})

// Server main route
app.get('/', (req: Request, res: Response) => {
    res.send('Yayinstocks server running....')
})