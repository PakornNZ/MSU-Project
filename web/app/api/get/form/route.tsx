import axios from "axios";
import { NextResponse } from "next/server";

const API_PATH = process.env.API_PATH;
export async function GET() {

    try {
        const res = await axios.get(API_PATH + '/fetch/form')

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