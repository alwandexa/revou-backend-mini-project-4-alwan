import express from "express";

import { MovieController } from "./controllers/movie-controller";
import { ShowtimeController } from "./controllers/showtime-controller";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

    const movieRouter = express.Router();
    movieRouter.post("/movie/add", MovieController.createMovie);
    movieRouter.delete("/movie/delete", MovieController.deleteMovie);
    movieRouter.patch("/movie/update", MovieController.updateMovie);
    movieRouter.get("/movie", MovieController.getMovieById);
    movieRouter.get("/movie/list", MovieController.getAllMovies);

    const showtimeRouter = express.Router();
    showtimeRouter.post("/showtime/add", ShowtimeController.createShowtime);

    app.use(movieRouter);
    app.use(showtimeRouter);

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
