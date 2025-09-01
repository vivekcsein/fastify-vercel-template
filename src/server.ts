import dotenv from "dotenv";
import createApp from "./app";
import { envAppConfig } from "./libs/env/env.app";

// ✅ Load environment variables early
dotenv.config();

// Validate essential env variables
if (!envAppConfig.APP_PORT || !envAppConfig.API_PATH) {
  console.error("Missing required environment configuration.");
  process.exit(1);
}

// ✅ Start server with safe async handling
const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();
    const PORT = envAppConfig.APP_PORT;

    app.listen({ port: PORT }, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 API docs: http://localhost:${PORT}/documentation`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
