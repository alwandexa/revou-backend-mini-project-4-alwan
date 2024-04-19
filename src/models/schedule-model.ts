export interface ScheduleModel {
  movie_id: number;
  studio_id: number;
  showtime: string;
  show_date: Date;
}

export interface CreateScheduleRequest extends ScheduleModel {}

export interface CreateScheduleResponse {
  schedule_id: number;
}
