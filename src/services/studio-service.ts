import { PoolConnection } from "mysql2/promise";
import { CreateStudioRequest, CreateStudioResponse, UpdateStudioRequest, UpdateStudioResponse } from "../models/studio-model";
import { StudioRepository } from "../repositories/studio-repository";

const StudioService = {
  createStudio: async (
    createStudioRequest: CreateStudioRequest,
    connection: PoolConnection
  ): Promise<CreateStudioResponse> => {
    const createdScheduleId = await StudioRepository.createStudio(
      createStudioRequest,
      connection
    );

    return {
      studio_id: createdScheduleId,
    };
  },
  updateStudio: async (
    createStudioRequest: UpdateStudioRequest,
    connection: PoolConnection
  ): Promise<UpdateStudioResponse> => {
    const affectedRowsCount = await StudioRepository.updateStudio(
      createStudioRequest,
      connection
    );

    return {
      affectedRowsCount: affectedRowsCount,
    };
  },
};

export { StudioService };
