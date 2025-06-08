// components/CalendarSection.tsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarSectionProps } from '../../utils/types';
import { useGlobalProps } from '../GlobalPropsProvider';
import { timeSlotsByDate, defaultTimeSlots } from '../../utils/utils';

const CalendarSection = ({
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  handleConfirm, closeCalendar, }: CalendarSectionProps ) => {

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formattedDate = selectedDate ? formatLocalDate(selectedDate) : '';
  const timeSlots = formattedDate && timeSlotsByDate[formattedDate]
    ? timeSlotsByDate[formattedDate]
    : defaultTimeSlots;

  const {user} = useGlobalProps();
  const access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const [succesfullySent, setSuccesfullySent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmAndSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: access_key,
          name: `${user?.firstName} ${user?.lastName}`,
          subject: "New Booking",
          message: `New booking for PT Consultation by ${user?.firstName} ${user?.lastName}\nDate: ${formattedDate}\nTime: ${selectedTime}`,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        setSuccesfullySent(true);
        handleConfirm(); // Trigger any custom logic
        setTimeout(() => setSuccesfullySent(false), 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg relative w-[90%] max-w-[400px]">
        <button className="absolute top-2 right-3 text-2xl font-bold" onClick={closeCalendar}>
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Select a Date</h2>

        <Calendar
          className="shadow-md rounded-md"
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate || new Date()}
          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          tileClassName={({ date, view }) => {
            const today = new Date();
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            const isSelected =
              selectedDate &&
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();

            if (view === 'month') {
              if (isSelected) return 'highlight-selected';
              if (isToday) return 'highlight-today';
            }

            return '';
          }}
        />

        {selectedDate && (
          <div className="mt-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Available Times</h3>
            <div className="grid grid-cols-2 gap-2 w-full">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`border shadow-md px-4 py-2 rounded-lg ${
                    selectedTime === slot ? 'bg-mainOrange text-white' : 'bg-white text-black hover:bg-[#f3f3f3]' }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button className="fireBG text-white px-4 py-2 rounded-lg hover:bg-[#f87b3d] transition1"
            onClick={handleConfirmAndSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Confirm Booking'}
          </button>

          {succesfullySent && (
            <p className="mt-2 text-green-600 font-medium">Booking confirmed 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
