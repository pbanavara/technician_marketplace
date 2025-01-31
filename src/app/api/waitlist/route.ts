import { createClient } from 'redis'

console.log('Route file loaded') // Will print when file is loaded


const client = createClient({
    username: 'default',
    password: 'WAZUxokox5LTmkgmxv6Wvq1trmnobnby',
    socket: {
        host: 'redis-19261.c89.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19261
    }
});

client.on('error', (err) => console.log('Redis Client Error', err))


export async function POST(request: Request) {
    console.log('POST request received') // Will print when endpoint is hit

    const { email } = await request.json()
    console.log('Email received:', email) // Will print parsed email

    const timestamp = new Date().toISOString()

    try {
        if (!client.isOpen) {
            console.log('Connecting to Redis...')
            await client.connect()
        }

        await client.set(`waitlist:${email}`, JSON.stringify({ timestamp }))
        console.log('Data saved to Redis')

        return Response.json({
            success: true,
            message: 'Email added to waitlist'
        })
    } catch (error) {
        console.log('Error occurred:', error)
        return Response.json({
            success: false,
            error: String(error)
        }, { status: 500 })
    }
}
