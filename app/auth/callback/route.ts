import { NextResponse } from 'next/server'
import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const supabase = await createClient()

  try {
    await supabase.auth.exchangeCodeForSession(code)
  } catch {
    // If exchanging the code fails, still redirect to home.
  }

  return NextResponse.redirect(new URL('/', request.url))
}
