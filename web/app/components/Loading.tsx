'use client'
import "@/app/styles/Style-Loading.css"
import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"

export default function Loading() {
    const [message, setMessage] = useState<string>("กำลังโหลดข้อมูล.")

    useEffect(() => {
        const messages = [
            "กำลังโหลดข้อมูล.  ",
            "กำลังโหลดข้อมูล.. ",
            "กำลังโหลดข้อมูล...",
        ]
        let index = 0
        const interval = setInterval(() => {
            setMessage(messages[index])
            index = (index + 1) % messages.length
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="loading-container">
            <div className="spinner">
                <PuffLoader 
                    color="var(--color-main)"
                    size={100}
                    speedMultiplier={2}
                />
            </div>
            <p>{message}</p>
        </div>
    )
}