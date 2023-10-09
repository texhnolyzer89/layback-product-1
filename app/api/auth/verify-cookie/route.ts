import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
export async function POST(req: Request) {
    try {
        const cookieStore = cookies()
        const product1Cookie = cookieStore.get('product1-next-auth.session-token')
        const decoded = await decode({ token: product1Cookie?.value, secret: process.env.SECRET ?? "" })
        if (decoded)
            return new Response('Something went wrong', { status: 200 })
        return new Response('Something went wrong', { status: 500 })
    } catch (e) {
        return new Response('Something went wrong', { status: 500 })
    }
}