"use server"

import { clerkClient } from "@clerk/nextjs/server"

export async function setRole(formData: FormData) {
  const userId = formData.get("id") as string
  const role = formData.get("role") as string

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    })
  } catch (error) {
    console.error("Error setting role:", error)
    throw new Error("Failed to set role")
  }
}

export async function removeRole(formData: FormData) {
  const userId = formData.get("id") as string

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: null },
    })
  } catch (error) {
    console.error("Error removing role:", error)
    throw new Error("Failed to remove role")
  }
}
