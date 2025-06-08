import { SetStateAction } from "react";

export type formInfoTypes = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export type userTypes = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  _id: string;
}


export type CalendarSectionProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  handleConfirm: () => void;
  closeCalendar: () => void;
}