import { User } from "@clerk/nextjs/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { UserActions } from "./UserActions"

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <div>No users found.</div>
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
            <p className="mb-4 text-sm text-muted-foreground">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </p>
            <p className="mb-4 text-sm font-medium">
              Role: {(user.publicMetadata.role as string) || "None"}
            </p>
            <UserActions
              userId={user.id}
              currentRole={(user.publicMetadata.role as string) || "None"}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
