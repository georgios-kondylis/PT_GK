// components/CalendarSection.tsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarSectionProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  handleConfirm: () => void;
  closeCalendar: () => void;
}

const timeSlots = ['11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00'];

const CalendarSection = ({
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  handleConfirm,closeCalendar } : CalendarSectionProps) => {

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg relative w-[90%] max-w-[400px]">
        <button className="absolute top-2 right-3 text-2xl font-bold" onClick={closeCalendar}>
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Select a Date</h2>
        <Calendar className="shadow-md rounded-md"
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate || new Date()}
        />

        {selectedDate && (
          <div className="mt-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Available Times</h3>
            <div className="grid grid-cols-2 gap-2 w-full">
              {timeSlots.map((slot) => (
                <button key={slot}
                  className={`border shadow-md px-4 py-2 rounded-lg ${
                    selectedTime === slot
                      ? 'bg-mainOrange text-white'
                      : 'bg-white text-black hover:bg-[#f3f3f3]'
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            className="bg-mainOrange text-white px-4 py-2 rounded-lg hover:bg-[#f87b3d] transition1"
            onClick={handleConfirm}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
