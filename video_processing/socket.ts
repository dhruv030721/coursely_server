import { Server } from "http"
import { Server as SocketServer } from "socket.io"
import { logger } from "yayinstocks_shared_module"

let io: SocketServer;

function initSocket(server: Server) {

    io = new SocketServer(server, {
        cors: {
            origin:
                process.env.ENV_MODE === "QA"
                    ? ["https://qa-admin.yayinstocks.in", "https://www.qa.yayinstocks.in"]
                    : process.env.ENV_MODE === "PROD"
                        ? ["https://admin.yayinstocks.in", "https://www.yayinstocks.in"]
                        : true,
            credentials: true,
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {
        logger.info("[Socket] : Admin connected");
    });
}

function getIo() {
    return io;

}
export { initSocket, getIo }