"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchUsers() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get("search") as string
    router.push(`/admin/users?search=${encodeURIComponent(search)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        name="search"
        placeholder="Search users..."
        defaultValue={searchParams.get("search") ?? ""}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
