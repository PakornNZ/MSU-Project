import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const res = await axios.get('http://localhost:5000/api/v1/data/fetch/form')

        return NextResponse.json(res.data)
    } catch (error: unknown) {
        let message = 'Internal Server Error'
        let statusCode = 0
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || message
            statusCode = error.status || 500
        }
        return NextResponse.json({
            status: 0,
            message,
            data: {}
        }, { status: statusCode })
    }
}