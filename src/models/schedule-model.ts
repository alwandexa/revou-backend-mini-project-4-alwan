export interface ScheduleModel {
  movie_id: number;
  studio_id: number;
  showtime: string;
  showdate: Date;
}

export interface CreateScheduleRequest extends ScheduleModel {}

export interface CreateScheduleResponse {
  schedule_id: number;
}

export interface UpdateScheduleRequest extends ScheduleModel {
  schedule_id: number;
}

export interface UpdateScheduleResponse {
  affectedRowsCount: number;
}

export interface DeleteScheduleRequest extends ScheduleModel {
  schedule_id: number;
}

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
