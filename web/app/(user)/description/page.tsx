'use client'
import { useRouter } from "next/navigation"
import "@/app/styles/Style-Description.css"
import { ChevronRight, FileTextIcon, InfoIcon, ShieldCheckIcon, AlertCircleIcon } from "lucide-react"

export default function Description() {
    const router = useRouter()

    const onNext = () => {
        router.push('/respondents')
    }

    return (
        <div className="description-container">
            <div className="background-shape shape-1"></div>
            <div className="background-shape shape-2"></div>
            
            <div className="description-card">
                <header className="description-header">
                    <FileTextIcon className="header-icon" />
                    <h1>รายละเอียดก่อนเริ่มทำแบบสอบถาม</h1>
                </header>

                <div className="description-content">
                    <section className="info-section">
                        <h2><InfoIcon size={20}/> คำชี้แจง</h2>
                        <div className="text-block">
                            <p>
                                แบบสอบถามฉบับนี้เป็นส่วนหนึ่งของการวิจัยเรื่อง <strong>“การพัฒนาแพลตฟอร์มประเมินความสามารถในการรับมือและตอบสนองต่อภัยคุกคามความมั่นคงไซเบอร์ของโรงพยาบาลประจำจังหวัด ภายใต้สำนักงานปลัดกระทรวงสาธารณสุข เพื่อรองรับนโยบายโรงพยาบาลอัจฉริยะ”</strong> 
                                จัดทำโดย นายวชิรวิทย์ ทุนทรัพย์ นักศึกษาปริญญาโท สาขาวิชาการจัดการสมาร์ทซิตี้และนวัตกรรม คณะการบัญชีและการจัดการ มหาวิทยาลัยมหาสารคาม
                            </p>
                            <p>
                                โดยการศึกษาในครั้งนี้มีวัตถุประสงค์เพื่อ ศึกษาถึงปัจจัยที่มีผลต่อความสามารถในการรับมือและตอบสนองต่อภัยคุกคามความมั่นคงทางไซเบอร์ของโรงพยาบาลประจำจังหวัด 
                                ภายใต้สำนักงานปลัดกระทรวงสาธารณสุข รวมถึงเพื่อใช้เป็นข้อมูลประกอบในการพัฒนาแพลตฟอร์มประเมินความสามารถด้านความมั่นคงปลอดภัยไซเบอร์ของโรงพยาบาลให้สอดคล้องกับนโยบาย 
                                “โรงพยาบาลอัจฉริยะ (Smart Hospital)” ของกระทรวงสาธารณสุข 
                            </p>
                            <p className="highlight-text">
                                ข้อมูลที่ท่านให้จะถูกเก็บรักษาเป็นความลับอย่างเคร่งครัดและใช้เพื่อวัตถุประสงค์ทางการวิจัยเท่านั้น 
                                จะไม่มีการเปิดเผยชื่อ หน่วยงาน หรือข้อมูลส่วนบุคคลใด ๆ ที่สามารถระบุตัวตนของท่านได้ 
                                ผลการวิจัยจะนำเสนอในลักษณะภาพรวมเพื่อประโยชน์ทางวิชาการและการพัฒนาระบบความมั่นคงปลอดภัยทางไซเบอร์ในภาคสาธารณสุขเท่านั้น
                            </p>
                            <p>
                                การตอบแบบสอบถามของท่านมีคุณค่าอย่างยิ่งและจะเป็นประโยชน์ต่อการยกระดับความมั่นคงปลอดภัยทางไซเบอร์ของโรงพยาบาลไทยให้พร้อมสู่การเป็น “โรงพยาบาลอัจฉริยะ” อย่างยั่งยืน
                            </p>
                            <p className="contact-info">
                                ขอขอบพระคุณท่านเป็นอย่างสูงที่สละเวลาอันมีค่า ในการตอบแบบสอบถาม หากมีข้อสงสัยประการใด โปรดติดต่อ นายวชิรวิทย์ ทุนทรัพย์ ได้โดยตรงที่ อีเมล wachiravit.th@gmail.com หรือโทรศัพท์ 098 – 836-3222
                            </p>
                        </div>
                    </section>
                    
                    <div className="divider"></div>

                    <section className="parts-section">
                        <h2><ShieldCheckIcon size={20}/> คำอธิบายแบบสอบถาม</h2>
                        <p>แบบสอบถามฉบับนี้แบ่งออกเป็น 8 ส่วน ดังนี้</p>
                        <div className="parts-grid">
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 1</span>
                                <div className="part-detail">
                                    <strong>ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม</strong>
                                    <p>เพื่อใช้ในการจำแนกลักษณะของกลุ่มผู้ตอบ เช่น ตำแหน่ง หน่วยงาน และประสบการณ์การทำงาน ซึ่งจะช่วยให้การวิเคราะห์ข้อมูลมีความถูกต้องและครบถ้วนมากยิ่งขึ้น</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 2</span>
                                <div className="part-detail">
                                    <strong>ข้อมูลการกำกับดูแลและบริหารความต่อเนื่อง (Governance & Continuity)</strong>
                                    <p>เพื่อศึกษาระดับการมีนโยบาย แผนงาน และกระบวนการบริหารจัดการความต่อเนื่องทางธุรกิจและความมั่นคงไซเบอร์ภายในโรงพยาบาล</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 3</span>
                                <div className="part-detail">
                                    <strong>ข้อมูลการเลือกใช้มาตรการและมาตรฐานความมั่นคง (Security Standards & Controls)</strong>
                                    <p>เพื่อสำรวจการนำมาตรฐาน แนวทาง หรือมาตรการควบคุมด้านความมั่นคงปลอดภัยไซเบอร์มาใช้ในการป้องกันและจัดการความเสี่ยง</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 4</span>
                                <div className="part-detail">
                                    <strong>การสร้างความตระหนักรู้และวัฒนธรรมองค์กร (Cybersecurity Awareness & Culture)</strong>
                                    <p>เพื่อประเมินระดับความตระหนักรู้ของบุคลากร การสื่อสารภายใน และการส่งเสริมวัฒนธรรมองค์กรด้านความมั่นคงไซเบอร์</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 5</span>
                                <div className="part-detail">
                                    <strong>การนำเทคโนโลยีและเครื่องมือสนับสนุนด้านความมั่นคงไซเบอร์ (Technology Enablement)</strong>
                                    <p>เพื่อศึกษาการใช้เทคโนโลยี ระบบ หรือเครื่องมือในการตรวจจับ ป้องกัน และตอบสนองต่อภัยคุกคามทางไซเบอร์ในโรงพยาบาล</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 6</span>
                                <div className="part-detail">
                                    <strong>ความพร้อมของโรงพยาบาลในการเป็นโรงพยาบาลอัจฉริยะ (Smart Hospital Readiness)</strong>
                                    <p>เพื่อประเมินระดับความพร้อมของโครงสร้างพื้นฐาน เทคโนโลยี บุคลากร และการบริหารจัดการ ที่สนับสนุนการเป็นโรงพยาบาลอัจฉริยะ</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 7</span>
                                <div className="part-detail">
                                    <strong>การรับรู้และการยอมรับต่อกรอบแนวคิดที่ใช้พัฒนาแพลตฟอร์ม (Perception toward Cyber Resilience Framework)</strong>
                                    <p>เพื่อสำรวจความคิดเห็นของผู้ตอบแบบสอบถามต่อกรอบแนวคิดหรือโมเดลที่ใช้ในการพัฒนาแพลตฟอร์มประเมินความสามารถในการรับมือและตอบสนองต่อภัยคุกคามไซเบอร์</p>
                                </div>
                            </div>
                            <div className="part-item">
                                <span className="part-badge">ส่วนที่ 8</span>
                                <div className="part-detail">
                                    <strong>ข้อเสนอแนะเพิ่มเติมอื่น ๆ</strong>
                                    <p>เพื่อเปิดโอกาสให้ผู้ตอบแบบสอบถามแสดงความคิดเห็นหรือข้อเสนอแนะเพิ่มเติมที่อาจเป็นประโยชน์ต่อการพัฒนาแพลตฟอร์มและการดำเนินงานด้านความมั่นคงปลอดภัยไซเบอร์ของโรงพยาบาลในอนาคต</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section className="rating-section">
                        <h2><AlertCircleIcon size={20}/> เกณฑ์การให้คะแนน</h2>
                        <p>แบบสอบถามใช้มาตราส่วนประมาณค่า (Rating Scale) ระดับ 5 คะแนน โดยมีความหมายดังนี้</p>
                        
                        <div className="rating-table-wrapper">
                            <table className="rating-table">
                                <thead>
                                    <tr>
                                        <th style={{width: '60px'}}>ระดับ</th>
                                        <th>คำอธิบาย (หลักคิดในการพิจารณา)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="score-cell low">1</td>
                                        <td><strong>น้อยที่สุด</strong> - ยังไม่มีการกำหนดบทบาทและความรับผิดชัดเจน บุคลากรแต่ละระดับไม่ทราบหน้าที่ของตนในการรับมือภัยไซเบอร์ หรือดำเนินการแบบเฉพาะกิจเมื่อเกิดเหตุเท่านั้น</td>
                                    </tr>
                                    <tr>
                                        <td className="score-cell low-mid">2</td>
                                        <td><strong>น้อย</strong> - มีการระบุหน้าที่ของบางหน่วยงานหรือบางตำแหน่ง แต่ยังไม่ครอบคลุมทุกระดับ และยังไม่มีการสื่อสารหรือทบทวนอย่างเป็นระบบ</td>
                                    </tr>
                                    <tr>
                                        <td className="score-cell mid">3</td>
                                        <td><strong>ปานกลาง</strong> - มีการกำหนดบทบาทและความรับผิดชอบในระดับเอกสาร เช่น นโยบาย/แนวปฏิบัติ แต่การสื่อสารหรือการนำไปใช้จริงยังไม่ต่อเนื่องหรือทั่วถึง</td>
                                    </tr>
                                    <tr>
                                        <td className="score-cell mid-high">4</td>
                                        <td><strong>มาก</strong> - มีการกำหนดและสื่อสารบทบาท/หน้าที่ของบุคลากรทุกระดับอย่างชัดเจน และมีการติดตามประเมินผลหรือซ้อมแผนเป็นระยะ</td>
                                    </tr>
                                    <tr>
                                        <td className="score-cell high">5</td>
                                        <td><strong>มากที่สุด</strong> - มีโครงสร้างบทบาทและความรับผิดชอบที่เป็นระบบชัดเจน ครอบคลุมทุกระดับ (ผู้บริหาร–IT–ผู้ปฏิบัติ) มีการอบรม สื่อสาร และทบทวนบทบาทเป็นประจำอย่างต่อเนื่อง รวมถึงบูรณาการเข้ากับแผนบริหารความมั่นคงปลอดภัยไซเบอร์ขององค์กร</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <footer className="description-footer">
                    <button className="next-button" onClick={onNext}>
                        เริ่มทำแบบสอบถาม
                        <ChevronRight />
                    </button>
                </footer>
            </div>
        </div>
    )
}