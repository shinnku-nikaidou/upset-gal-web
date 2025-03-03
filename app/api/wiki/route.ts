import { NextResponse, NextRequest } from 'next/server'

import { wikifullsearch } from '@/algorithm/wiki'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') as string

  const ans = await wikifullsearch(name)

  return NextResponse.json(ans)
}
