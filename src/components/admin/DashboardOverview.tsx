"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

interface DashboardData {
  totalAppointments: number
  totalUsers: number
  upcomingAppointments: Appointment[]
}

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/appointments?type=dashboard")
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }
        const dashboardData = await response.json()
        setData(dashboardData)
      } catch (err) {
        setError("Error fetching dashboard data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) return <div>Loading dashboard data...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data available</div>

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalAppointments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.upcomingAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.customerName}</TableCell>
                  <TableCell>
                    {format(new Date(appointment.appointmentDate), "PP")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.appointmentDate), "p")}
                  </TableCell>
                  <TableCell>{appointment.serviceType.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
