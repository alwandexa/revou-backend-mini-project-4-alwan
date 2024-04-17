import { CreateShowtimeRequest, ShowtimeModel } from "../models/showtime-model";
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
};

export { ShowtimeService };
