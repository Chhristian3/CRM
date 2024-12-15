"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UserActions } from "./UserActions"

interface User {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | undefined
  role: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true)
      setError(null)
      const query = searchParams.get("search")
      const url = query
        ? `/api/users?query=${encodeURIComponent(query)}`
        : "/api/users"

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError("An error occurred while fetching users")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [searchParams])

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>
              {user.firstName} {user.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">{user.email}</p>
            <p className="mb-4 text-sm font-medium">Role: {user.role}</p>
            <UserActions userId={user.id} currentRole={user.role} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
