// server.ts - Next.js + Socket.IO for Railway
import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import { setupSocket } from "@/lib/socket";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10); // Railway sets PORT
const host = "0.0.0.0"; // must be 0.0.0.0, not 127.0.0.1

async function createCustomServer() {
  try {
    const nextApp = next({
      dev,
      dir: process.cwd(),
      conf: dev ? undefined : { distDir: "./.next" },
    });

    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    const server = createServer((req, res) => {
      if (req.url?.startsWith("/api/socketio")) return;
      handle(req, res);
    });

    const io = new Server(server, {
      path: "/api/socketio",
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    setupSocket(io);

    server.listen(port, host, () => {
      console.log(`🚀 Server ready on http://${host}:${port}`);
      console.log(`🛰️ Socket.IO active at ws://${host}:${port}/api/socketio`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
}

createCustomServer();
