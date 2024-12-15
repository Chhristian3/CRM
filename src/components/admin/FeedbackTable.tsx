import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Feedback {
  id: string
  customerName: string
  serviceType: string
  rating:
    | "Very Satisfied"
    | "Satisfied"
    | "Neutral"
    | "Dissatisfied"
    | "Very Dissatisfied"
}

interface FeedbackTableProps {
  feedback: Feedback[]
}

export function FeedbackTable({ feedback }: FeedbackTableProps) {
  const getRatingColor = (rating: Feedback["rating"]) => {
    switch (rating) {
      case "Very Satisfied":
        return "bg-green-500 hover:bg-green-600"
      case "Satisfied":
        return "bg-lime-500 hover:bg-lime-600"
      case "Neutral":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Dissatisfied":
        return "bg-orange-500 hover:bg-orange-600"
      case "Very Dissatisfied":
        return "bg-red-500 hover:bg-red-600"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedback.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.customerName}</TableCell>
            <TableCell>{item.serviceType}</TableCell>
            <TableCell>
              <Badge className={getRatingColor(item.rating)}>
                {item.rating}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
