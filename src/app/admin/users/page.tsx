import { Suspense } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SearchUsers } from "@/components/admin/SearchUsers"
import { UserList } from "@/components/admin/UserList"

export default function UsersPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-lg text-muted-foreground">
          Manage users and their roles.
        </p>
        <Separator className="my-6" />
        <SearchUsers />
        <Suspense fallback={<div>Loading users...</div>}>
          <UserList />
        </Suspense>
      </main>
    </>
  )
}
