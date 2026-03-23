import express from 'express';
import cors from 'cors';
import teamRoutes from './routes/teamRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"

const app = express();

app.use(cors({
  origin: ["https://bynixtechnology.com","https://admin.bynixtechnology.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api", teamRoutes);

app.use("/api", adminRoutes);

app.use("/api", blogRoutes);

app.use("/api", contactRoutes);

export default app;
