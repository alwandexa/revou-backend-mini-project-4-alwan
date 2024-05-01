export interface ScheduleModel {
  schedule_id: number;
  movie_id: number;
  studio_id: number;
  showtime: string;
  showdate: string;
}

export interface CreateScheduleRequest
  extends Omit<ScheduleModel, "schedule_id"> {}

export interface CreateScheduleResponse
  extends Pick<ScheduleModel, "schedule_id"> {}

export interface UpdateScheduleRequest extends ScheduleModel {}

export interface UpdateScheduleResponse {
  affectedRowsCount: number;
}

export interface DeleteScheduleRequest
  extends Pick<ScheduleModel, "schedule_id"> {}

export interface DeleteScheduleResponse {
  affectedRowsCount: number;
}

export interface GetScheduleResponse {
  schedule_id: number;
  title: string;
  runtime: number;
  studio_name: string;
  showtime: string;
  showdate: string;
}

export interface GetShowtimes {
  studio_id: number;
  showdate: string;
}
