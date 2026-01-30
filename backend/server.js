// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// ===== Load env (works locally; on Render env vars are injected) =====
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middlewares =====
app.set("trust proxy", 1); // good practice on Render
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ===== Database (optional boot) =====
// Only attempt connection if MONGO_URI is defined.
// If your API needs DB, be sure to set MONGO_URI in Render.
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => {
      console.error("❌ MongoDB connection error:", err.message);
      // If your routes require DB, you can process.exit(1) here instead.
    });
} else {
  console.warn("⚠️  MONGO_URI not set; skipping MongoDB connection.");
}

// ===== Routes (API) =====
// Import after mongoose (if your routes depend on models)
import paymentRoutes from "./routes/payments.js";
import adminRoutes from "./routes/admin.js";

app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// ===== Frontend static =====
const frontendDir = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendDir)); // serves /css, /js, images, and direct *.html hits

// ===== SEO & Assets (highest priority) =====
app.get("/robots.txt", (req, res) => {
  const host = req.headers.host; // e.g., la-maisonnette.onrender.com or your custom domain
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const siteUrl = `${protocol}://${host}`;
  res.type("text/plain").send(
`User-agent: *
Disallow:

Sitemap: ${siteUrl}/sitemap.xml`
  );
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(frontendDir, "sitemap.xml"));
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(frontendDir, "favicon.ico"));
});

// ===== Frontend routing rules =====
// 1) "/" — bots get index.html; humans get lang.html
app.get("/", (req, res) => {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const isBot =
    ua.includes("googlebot") ||
    ua.includes("bingbot") ||
    ua.includes("slurp") ||
    ua.includes("duckduckbot") ||
    ua.includes("baiduspider") ||
    ua.includes("yandexbot");

  const target = isBot ? "index.html" : "lang.html";
  res.sendFile(path.join(frontendDir, target));
});

// 2) Any non-API path → try to serve as static file; fallback to index.html
app.get(/^\/(?!api).+/, (req, res) => {
  // Normalize and attempt to send the requested path
  const requestedPath = path.normalize(req.path);
  const filePath = path.join(frontendDir, requestedPath);

  res.sendFile(filePath, err => {
    // If the file doesn't exist, fall back to homepage (good for simple routing)
    if (err) {
      res.sendFile(path.join(frontendDir, "index.html"));
    }
  });
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});