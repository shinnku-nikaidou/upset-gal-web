import { NextResponse, NextRequest } from 'next/server'

import { wikiredissearch } from '@/algorithm/wiki'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') as string

  const ans = await wikiredissearch(name)

  return NextResponse.json(ans)
}
