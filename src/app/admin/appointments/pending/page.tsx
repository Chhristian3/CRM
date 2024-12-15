import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { PendingAppointments } from "@/components/admin/PendingAppointments"

// This is mock data. Replace with actual data fetching logic.
const mockPendingAppointments = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2023-06-20",
    time: "10:00 AM",
    type: "New Patient",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2023-06-21",
    time: "11:30 AM",
    type: "Follow-up",
  },
  {
    id: "3",
    patientName: "Alice Johnson",
    date: "2023-06-22",
    time: "2:00 PM",
    type: "Consultation",
  },
]

export default function PendingAppointmentsPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Pending Appointments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Pending Appointments
        </h1>
        <PendingAppointments appointments={mockPendingAppointments} />
      </main>
    </>
  )
}
