"use client"

import { Button } from "@/components/ui/button"
import { removeRole, setRole } from "@/app/admin/_action"

interface UserActionsProps {
  userId: string
  currentRole: string
}

export function UserActions({ userId, currentRole }: UserActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <form action={setRole}>
        <input type="hidden" value={userId} name="id" />
        <input type="hidden" value="admin" name="role" />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full"
          disabled={currentRole === "admin"}
        >
          Make Admin
        </Button>
      </form>
      <form action={setRole}>
        <input type="hidden" value={userId} name="id" />
        <input type="hidden" value="moderator" name="role" />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full"
          disabled={currentRole === "moderator"}
        >
          Make Moderator
        </Button>
      </form>
      <form action={removeRole}>
        <input type="hidden" value={userId} name="id" />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full"
          disabled={currentRole === "None"}
        >
          Remove Role
        </Button>
      </form>
    </div>
  )
}
