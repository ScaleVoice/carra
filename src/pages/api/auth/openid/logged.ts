import { NextApiRequest, NextApiResponse } from 'next'
import { generateApiPage } from 'utils/auth/generateApiPage'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('content-type', 'text/html; charset=utf-8')
  return res.send(generateApiPage('Logged in'))
}
