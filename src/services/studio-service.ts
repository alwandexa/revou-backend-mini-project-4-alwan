import { PoolConnection } from "mysql2/promise";
import {
  CreateStudioRequest,
  CreateStudioResponse,
  DeleteStudioRequest,
  DeleteStudioResponse,
  GetAllStudiosResponse,
  UpdateStudioRequest,
  UpdateStudioResponse,
} from "../models/studio-model";
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
  deleteStudio: async (
    deleteStudioRequest: DeleteStudioRequest,
    connection: PoolConnection
  ): Promise<DeleteStudioResponse> => {
    const affectedRowsCount = await StudioRepository.deleteStudio(
      deleteStudioRequest,
      connection
    );

    return {
      affectedRowsCount: affectedRowsCount,
    };
  },
  getAllStudios: async (
    connection: PoolConnection
  ): Promise<GetAllStudiosResponse[]> => {
    const schedule = await StudioRepository.getAllStudios(connection);

    return schedule;
  },
};

export { StudioService };
