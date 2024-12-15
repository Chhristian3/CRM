import { clerkClient } from "@clerk/nextjs/server"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { DashboardOverview } from "@/components/admin/DashboardOverview"

async function getUsers() {
  try {
    return await clerkClient.users.getUserList()
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

async function getAppointments() {
  try {
    const response = await fetch("/api/appointments", { cache: "no-store" })
    if (!response.ok) {
      throw new Error("Failed to fetch appointments")
    }
    const appointments = await response.json()

    return {
      totalAppointments: appointments.length,
      upcomingAppointments: appointments.slice(0, 3).map((appointment) => ({
        id: appointment.id,
        patientName: appointment.patientName || "N/A",
        date: new Date(appointment.date).toISOString().split("T")[0],
        time: new Date(appointment.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: appointment.serviceType?.name || "N/A",
      })),
    }
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return {
      totalAppointments: 0,
      upcomingAppointments: [],
    }
  }
}

export default async function AdminDashboard() {
  const users = await getUsers()
  const { totalAppointments, upcomingAppointments } = await getAppointments()

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex h-[calc(100vh-4rem)] flex-col p-4 pt-6 md:p-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="min-h-0 flex-1">
          <DashboardOverview
            totalAppointments={totalAppointments}
            totalUsers={users.length}
            upcomingAppointments={upcomingAppointments}
          />
        </div>
      </main>
    </>
  )
}
