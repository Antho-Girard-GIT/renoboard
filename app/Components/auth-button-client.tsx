"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthButtonClient() {
  return (
    <Button variant="outline">
      <Link href="/auth/signin">Sign In</Link>
    </Button>
  )
}
