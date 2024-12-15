"use client"

import { useEffect, useState } from "react"
import { useAppointments } from "@/contexts/AppointmentContext"
import { Calendar } from "@/components/ui/calendar"
import { isBefore, startOfDay } from "date-fns"

interface AppointmentCalendarProps {
  onSelectDate: (date: Date | undefined) => void
  selectedDate: Date | undefined
}

export function AppointmentCalendar({
  onSelectDate,
  selectedDate,
}: AppointmentCalendarProps) {
  const { allAppointments: appointments } = useAppointments()
  const [appointmentDates, setAppointmentDates] = useState<Date[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([])

  useEffect(() => {
    const dates = appointments.map((app) => new Date(app.appointmentDate))
    setAppointmentDates(dates)
  }, [appointments])

  useEffect(() => {
    if (selectedDate) {
      const filtered = appointments.filter((app) => {
        const appDate = new Date(app.appointmentDate)
        return appDate.toDateString() === selectedDate.toDateString()
      })
      setFilteredAppointments(filtered)
    } else {
      setFilteredAppointments([])
    }
  }, [selectedDate, appointments])

  const handleDateSelect = (date: Date | undefined) => {
    if (date && !isBefore(startOfDay(date), startOfDay(new Date()))) {
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        // If the same date is clicked again, unselect it
        onSelectDate(undefined)
      } else {
        onSelectDate(date)
      }
    } else {
      // If the date is undefined or in the past, unselect
      onSelectDate(undefined)
    }
  }

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()))
  }

  return (
    <div>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
          modifiers={{ booked: appointmentDates }}
          modifiersStyles={{
            booked: { backgroundColor: "#00ffff33" },
          }}
          disabled={isDateDisabled}
        />
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h1>
            <p>
              <strong>Appointments for:</strong>
            </p>
            {selectedDate.toDateString()}
          </h1>
          {filteredAppointments.length > 0 ? (
            <ul className="mt-2">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="border-b py-2">
                  Time:{" "}
                  {new Date(appointment.appointmentDate).toLocaleTimeString()} -{" "}
                  {new Date(
                    appointment.appointmentEndDate
                  ).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-center">No appointments for this day.</p>
          )}
        </div>
      )}
    </div>
  )
}

