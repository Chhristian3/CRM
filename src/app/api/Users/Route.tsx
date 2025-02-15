import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  try {
    console.log("Fetching users with query:", query)
    const users = query
      ? await clerkClient.users.getUserList({ query })
      : await clerkClient.users.getUserList()

    console.log("Users fetched successfully:", users.length)

    // Only send necessary user data
    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress,
      role: (user.publicMetadata.role as string) || "None",
    }))

    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
