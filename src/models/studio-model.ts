export interface StudioModel {
  studio_id: number;
  name: string;
  capacity: number;
}

export interface CreateStudioRequest extends Omit<StudioModel, "studio_id"> {}

export interface CreateStudioResponse extends Pick<StudioModel, "studio_id"> {}

export interface UpdateStudioRequest extends StudioModel {}

export interface UpdateStudioResponse {
  affectedRowsCount: number;
}

export interface DeleteStudioRequest extends Pick<StudioModel, "studio_id"> {}

export interface DeleteStudioResponse {
  affectedRowsCount: number;
}

export interface GetAllStudiosResponse extends StudioModel {}
