import express, { Router } from "express";

import { MovieController } from "./controllers/movie-controller";
import { ShowtimeController } from "./controllers/showtime-controller";
import { ScheduleController } from "./controllers/schedule-controller";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

    const movieRouter = Router();
    movieRouter.post("/movie/add", MovieController.createMovie);
    movieRouter.delete("/movie/delete", MovieController.deleteMovie);
    movieRouter.patch("/movie/update", MovieController.updateMovie);
    movieRouter.get("/movie", MovieController.getMovieById);
    movieRouter.get("/movie/list", MovieController.getAllMovies);

    const showtimeRouter = Router();
    showtimeRouter.post("/showtime/add", ShowtimeController.createShowtime);
    showtimeRouter.patch("/showtime/update", ShowtimeController.updateShowtime);

    const scheduleRouter = Router();
    scheduleRouter.post("/schedule/create", ScheduleController.createSchedule);

    app.use(movieRouter);
    app.use(showtimeRouter);
    app.use(scheduleRouter);

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
