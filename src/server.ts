import express from "express";

import { MovieController } from "./controllers/movie-controller";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

    const movieRouter = express.Router();
    movieRouter.post("/movie/add", MovieController.createMovie);
    movieRouter.delete("/movie/delete", MovieController.deleteMovie);
    movieRouter.patch("/movie/update", MovieController.updateMovie);

    app.use(movieRouter);

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
