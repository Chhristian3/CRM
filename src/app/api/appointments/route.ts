import { NextRequest, NextResponse } from "next/server"
import { clerkClient, getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  try {
    if (type === "dashboard") {
      const currentDate = new Date()
      const oneWeekLater = new Date(
        currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
      )

      const [totalAppointments, upcomingAppointments, users] =
        await Promise.all([
          prisma.appointment.count(),
          prisma.appointment.findMany({
            where: {
              appointmentDate: {
                gte: currentDate,
                lt: oneWeekLater,
              },
            },
            include: {
              serviceType: true,
            },
            orderBy: {
              appointmentDate: "asc",
            },
            take: 5,
          }),
          clerkClient.users.getUserList(),
        ])

      return NextResponse.json({
        totalAppointments,
        totalUsers: users.length,
        upcomingAppointments,
      })
    } else if (type === "upcoming") {
      const currentDate = new Date()
      const upcomingAppointments = await prisma.appointment.findMany({
        where: {
          appointmentDate: {
            gte: currentDate,
          },
        },
        include: {
          serviceType: true,
        },
        orderBy: {
          appointmentDate: "asc",
        },
        take: 10, // Limit to 10 upcoming appointments
      })
      return NextResponse.json(upcomingAppointments)
    } else {
      const appointments = await prisma.appointment.findMany({
        include: {
          serviceType: true,
          rating: true,
        },
        orderBy: { appointmentDate: "desc" },
      })
      return NextResponse.json(appointments)
    }
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { error: "Error fetching appointments" },
      { status: 500 }
    )
  }
}

// Keep the existing POST, PUT, and DELETE functions as they are
