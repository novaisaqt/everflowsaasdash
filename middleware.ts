import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Auth temporarily disabled for development
  return NextResponse.next()
}
