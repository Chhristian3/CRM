import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { FeedbackTable } from "@/components/admin/FeedbackTable"

// This is mock data. Replace with actual data fetching logic.
const mockFeedback = [
  {
    id: "1",
    customerName: "John Doe",
    serviceType: "Consultation",
    rating: "Very Satisfied",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    serviceType: "Check-up",
    rating: "Satisfied",
  },
  {
    id: "3",
    customerName: "Alice Johnson",
    serviceType: "Treatment",
    rating: "Neutral",
  },
  {
    id: "4",
    customerName: "Bob Brown",
    serviceType: "Consultation",
    rating: "Dissatisfied",
  },
  {
    id: "5",
    customerName: "Charlie Davis",
    serviceType: "Check-up",
    rating: "Very Dissatisfied",
  },
] as const

export default function FeedbackPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Feedback</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Customer Feedback</h1>
        <FeedbackTable feedback={mockFeedback} />
      </main>
    </>
  )
}
