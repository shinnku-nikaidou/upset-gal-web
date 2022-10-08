import { useRouter } from 'next/router'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const router = useRouter()
    const user = "1234"//router.query.user as string
    res.status(200).json({ name: user })
}
