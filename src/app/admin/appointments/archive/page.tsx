import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { ArchivedAppointments } from "@/components/admin/ArchivedAppointments"

// This is mock data. Replace with actual data fetching logic.
const mockArchivedAppointments = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2023-05-15",
    time: "10:00 AM",
    type: "Check-up",
    status: "Completed",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2023-05-16",
    time: "11:30 AM",
    type: "Consultation",
    status: "Cancelled",
  },
  {
    id: "3",
    patientName: "Alice Johnson",
    date: "2023-05-17",
    time: "2:00 PM",
    type: "Follow-up",
    status: "Completed",
  },
] as const

export default function ArchivedAppointmentsPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Archived Appointments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Archived Appointments
        </h1>
        <ArchivedAppointments appointments={mockArchivedAppointments} />
      </main>
    </>
  )
}
