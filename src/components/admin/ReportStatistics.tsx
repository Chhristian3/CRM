import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatisticProps {
  title: string
  value: string | number
}

function Statistic({ title, value }: StatisticProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

interface ReportStatisticsProps {
  totalUsers: number
  activeUsers: number
  totalAppointments: number
  completedAppointments: number
  cancelledAppointments: number
}

export function ReportStatistics({
  totalUsers,
  activeUsers,
  totalAppointments,
  completedAppointments,
  cancelledAppointments,
}: ReportStatisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Statistic title="Total Users" value={totalUsers} />
      <Statistic title="Active Users" value={activeUsers} />
      <Statistic title="Total Appointments" value={totalAppointments} />
      <Statistic title="Completed Appointments" value={completedAppointments} />
      <Statistic title="Cancelled Appointments" value={cancelledAppointments} />
    </div>
  )
}
