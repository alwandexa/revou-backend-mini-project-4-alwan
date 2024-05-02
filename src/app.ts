import express from "express";
import morgan from "morgan";

import movieRouter from "./routes/movie-router";
import scheduleRouter from "./routes/schedule-router";
import userRouter from "./routes/user-router";
import bookingRouter from "./routes/booking-router";
import studioRouter from "./routes/studio-router";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(movieRouter);
app.use(scheduleRouter);
app.use(userRouter);
app.use(bookingRouter);
app.use(studioRouter);

export default app;
