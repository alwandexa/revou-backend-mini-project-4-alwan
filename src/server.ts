import express from "express";

import movieRouter from "./routes/movie-router";
import scheduleRouter from "./routes/schedule-router";
import userRouter from "./routes/user-router";
import bookingRouter from "./routes/booking-router";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

    app.use(movieRouter);
    app.use(scheduleRouter);
    app.use(userRouter);
    app.use(bookingRouter);

    const PORT = 3001;

    app.listen(PORT, () => {
      console.log(`Server is running in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server :", error);
    process.exit(1);
  }
};

startServer();
