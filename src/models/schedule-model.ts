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
  schedule_id : number;
}

export interface UpdateScheduleResponse {
  affectedRowsCount : number;
}
