export interface BookingModel {
  booking_id: number;
  user_id: number;
  schedule_id: number;
  amount: number;
}

export interface CreateBookingRequest
  extends Omit<BookingModel, "booking_id"> {}

export interface CreateBookingResponse
  extends Pick<BookingModel, "booking_id"> {}

export interface GetBookingHistoryRequest {
  user_id: number;
}

export interface GetBookingHistoryResponse {
  title: string;
  booking_date: string;
  amount: number;
  showtime: string;
  showdate: string;
}
