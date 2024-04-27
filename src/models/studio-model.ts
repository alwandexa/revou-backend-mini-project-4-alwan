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
