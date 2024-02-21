// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.send(405)
    res.end()
  }

  try {
    const { url } = req.body

    const response = await fetch(url)

    const data = await response.text()
    res.status(200).send(data)
  } catch (error) {
    console.error('Error fetching HTML page:', error)
    res.status(500).send('Internal Server Error')
  } finally {
    res.end()
  }
}
