import { Router } from "express";
import { MovieController } from "../controllers/movie-controller";
import { authMiddleware as auth } from "../middlewares/authorization";

const movieRouter = Router();

movieRouter.post("/movie/add", auth("admin"), MovieController.createMovie);
movieRouter.delete("/movie/delete", auth("admin"), MovieController.deleteMovie);
movieRouter.patch("/movie/update", auth("admin"), MovieController.updateMovie);
movieRouter.get("/movie", MovieController.getMovieById);
movieRouter.get("/movie/list", MovieController.getAllMovies);

export default movieRouter;