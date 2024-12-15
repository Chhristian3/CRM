import { Suspense } from "react"
import { clerkClient } from "@clerk/nextjs/server"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { DashboardOverview } from "@/components/admin/DashboardOverview"
import { UpcomingAppointments } from "@/components/admin/UpcomingAppointments"

async function getUsers() {
  try {
    return await clerkClient.users.getUserList()
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export default async function AdminDashboard() {
  const users = await getUsers()

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
        <div className="min-h-0 flex-1 space-y-6">
          <Suspense fallback={<div>Loading dashboard overview...</div>}>
            <DashboardOverview />
          </Suspense>
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Upcoming Client Appointments
            </h2>
            <Suspense fallback={<div>Loading upcoming appointments...</div>}>
              <UpcomingAppointments />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}
