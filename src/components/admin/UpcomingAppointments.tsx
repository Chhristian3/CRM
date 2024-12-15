"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Appointment {
  id: string
  customerName: string
  appointmentDate: string
  serviceType: {
    name: string
  }
}

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments?type=upcoming")
        if (!response.ok) {
          throw new Error("Failed to fetch appointments")
        }
        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        setError("Error fetching appointments")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (isLoading) return <div>Loading appointments...</div>
  if (error) return <div>Error: {error}</div>
  if (appointments.length === 0) return <div>No upcoming appointments</div>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.customerName}</TableCell>
            <TableCell>
              {format(new Date(appointment.appointmentDate), "PP")}
            </TableCell>
            <TableCell>
              {format(new Date(appointment.appointmentDate), "p")}
            </TableCell>
            <TableCell>{appointment.serviceType.name}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
