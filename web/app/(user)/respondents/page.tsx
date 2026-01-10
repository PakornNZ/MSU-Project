'use client'
import { useEffect, useState } from "react"
import { FormDataProps } from "@/app/types/Interfaces"
import Section from "@/app/components/Section-Respondents"
import Loading from "@/app/components/Loading"
import axios from "axios"

export default function Respondents() {
    const [formData, setFormData] = useState<FormDataProps | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getForm()
    }, [])

    useEffect(() => {
        console.log("Form Data:", formData)
    }, [formData])
    const getForm = async () => {
        try {
            const res = await axios.get('/api/get/form')
            if (res.data.status === 1) {
                console.log("Fetched Form Data:", res.data.data)
                setFormData(res.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error fetching form data:", error)
        }
    }

    return (
        <>
            {!isLoading && formData ? (
                <Section
                    formData={formData}
                />
            ) : (
                <Loading />
            )}
        </>
    )
}