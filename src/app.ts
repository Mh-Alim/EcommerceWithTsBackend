import express, { Request, Response } from "express";
import { connectToDatabase } from "./database.js";

const port = 5000;
const app = express();

app.use(express.json());
connectToDatabase();


app.get("/", (req: Request, res: Response) => {
    return res.send("Server is working")
});


import userRoutes from "./routes/user.js";
app.use("/api/v1/user", userRoutes);



import { errorMiddleware } from "./middlewares/error.middleware.js"
app.use(errorMiddleware);



app.listen(port, () => {
    console.log(`Server is running on  Port: ${port}`);
})