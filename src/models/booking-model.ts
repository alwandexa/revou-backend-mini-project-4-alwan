export interface BookingModel {
  booking_id: number;
  user_id: number;
  schedule_id: number;
}

export interface CreateBookingRequest
  extends Omit<BookingModel, "booking_id"> {}

export interface CreateBookingResponse
  extends Pick<BookingModel, "booking_id"> {}
