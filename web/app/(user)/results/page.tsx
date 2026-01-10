'use client'
import Loading from "@/app/components/Loading"
import SectionResults from "@/app/components/Section-Results"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ResultDataProps } from "@/app/types/Interfaces"

export default function Results() {
    const router = useRouter()
    const [resultData, setResultData] = useState<ResultDataProps | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    useEffect(() => {
        if (id) {
            getResultData(id)
        } else {
            router.push('/')
        }
    }, [id])

    const getResultData = async (id: string) => {
        try {
            const res = await axios.get(`/api/get/result/${id}`)
            if (res.data.status === 1) {
                setResultData(res.data.data)
                setIsLoading(false)
            } else {
                router.push('/')
            }
        } catch (error) {
            router.push('/')
        }
    }
    return (
        <>
            { !isLoading && resultData ? ( 
                <SectionResults resultData={resultData} /> 
            ) : (
                <Loading />
            )}
        </>
    )
}