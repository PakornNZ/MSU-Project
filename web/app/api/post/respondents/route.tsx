import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_PATH = process.env.API_PATH;
export async function POST(req: NextRequest) {
    const payload = await req.json();
    try {
        const res = await axios.post(API_PATH + "/create/respondents", payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
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