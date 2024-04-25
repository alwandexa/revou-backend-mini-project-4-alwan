import express, { Router } from "express";

import { MovieController } from "./controllers/movie-controller";
import { ScheduleController } from "./controllers/schedule-controller";
import { UserController } from "./controllers/user-controller";

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

    const scheduleRouter = Router();
    scheduleRouter.post("/schedule/create", ScheduleController.createSchedule);

    const userRouter = Router();
    userRouter.post("/register", UserController.register);
    userRouter.post("/login", UserController.login);

    app.use(movieRouter);
    app.use(scheduleRouter);
    app.use(userRouter)

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
