'use client'
import { useRouter } from "next/navigation"
import "@/app/styles/Style-Homepage.css"
import { ChevronRight, ShieldCheckIcon } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const onRedirec = () => {
    router.push('/respondents')
  }

  return (
    <>
      <div className="homepage-container">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
        
        <div className="content-card">
          <div className="icon-wrapper">
            <ShieldCheckIcon width={60} height={60}/>  
          </div>
          
          <h1 className="homepage-topic">
            การพัฒนาแพลตฟอร์มประเมินความสามารถในการรับมือ<br className="hidden-mobile"/>และตอบสนองต่อภัยคุกคามความมั่นคงไซเบอร์
            <span className="sub-topic">
              ของโรงพยาบาลประจำจังหวัด ภายใต้สำนักงานปลัดกระทรวงสาธารณสุข <br className="hidden-mobile"/>เพื่อรองรับนโยบายโรงพยาบาลอัจฉริยะ
            </span>
          </h1>
          
          <button className="start-button" type="button" onClick={onRedirec}>
            เริ่มทำแบบสอบถาม
            <ChevronRight width={30} height={30}/>  
          </button>
        </div>
      </div>
    </>
  )
}