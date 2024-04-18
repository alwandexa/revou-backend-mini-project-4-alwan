import {
  CreateShowtimeRequest,
  DeleteShowtimeRequest,
  DeleteShowtimeResponse,
} from "../models/showtime-model";
import { ShowtimeRepository } from "../repositories/showtime-repository";

const ShowtimeService = {
  createShowtime: async (
    createShowtimeRequest: CreateShowtimeRequest
  ): Promise<{ id: number }> => {
    const createdShowtimesId = await ShowtimeRepository.createShowtime(
      createShowtimeRequest
    );

    return {
      id: createdShowtimesId,
    };
  },
  deleteShowtime: async (
    deleteShowtimeRequest: DeleteShowtimeRequest
  ): Promise<DeleteShowtimeResponse> => {
    const deletedShowtimeMovieId = await ShowtimeRepository.deleteShowtime(
      deleteShowtimeRequest
    );

    return {
      movie_id: deletedShowtimeMovieId.movie_id,
    };
  },
  updateShowtime: async (): Promise<number> => {
    const result = ShowtimeRepository.updateShowtime2();

    return 1;
  },
};

export { ShowtimeService };
