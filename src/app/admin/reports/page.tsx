import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { ReportStatistics } from "@/components/admin/ReportStatistics"

// This is mock data. Replace with actual data fetching logic.
const mockStatistics = {
  totalUsers: 1000,
  activeUsers: 750,
  totalAppointments: 5000,
  completedAppointments: 4200,
  cancelledAppointments: 300,
}

export default function ReportsPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <ReportStatistics {...mockStatistics} />
      </main>
    </>
  )
}
