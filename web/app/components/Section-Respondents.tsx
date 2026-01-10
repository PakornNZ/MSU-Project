"use client"

import { useEffect, useState } from 'react';
import { FormDataProps, AnswerProps } from "@/app/types/Interfaces"
import "@/app/styles/Style-Section.css"
import "@/app/styles/Style-Header.css"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Loading from './Loading';

export default function SectionRespondent({ formData }: { formData: FormDataProps }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<AnswerProps>({
        genderId: 0,
        ageId: 0,
        posId: 0,
        posOther: null,
        expId: 0,
        respId: 0,
        respOther: null,
        serviceId: 0,
        serviceOther: null,
        bedId: 0,
        personId: 0,
        personItId: 0,
        personCyberSecId: 0,
        infraId: 0,
        answer: {},
        note: ""
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const questionCategories = formData?.questionList || [];
    const totalSteps = 1 + questionCategories.length + 1;

    useEffect(() => {
        const formStorage = localStorage.getItem('formData');
        if (formStorage) {
            setAnswers(JSON.parse(formStorage));
        }
        setIsLoaded(true);
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('formData', JSON.stringify(answers));
        }
    }, [answers, isLoaded]);

    const checkCurrentStepCompletion = () => {
        if (currentStep === 0) {
            return true;
        } else if (currentStep < totalSteps - 1) {
            const categoryIndex = currentStep - 1;
            const category = questionCategories[categoryIndex];
            if (!category) return false;

            return category.subCategories.every(subCat => 
                subCat.questions.every(question => 
                    answers.answer[category.id]?.[subCat.id]?.[question.id]
                )
            );
        } else {
            return true;
        }
    };

    const handleNext = () => {
        if (currentStep === 0) {
            if (answers.genderId === 0 ||
                answers.ageId === 0 ||
                answers.posId === 0 ||
                answers.expId === 0 ||
                answers.respId === 0 ||
                answers.serviceId === 0 ||
                answers.bedId === 0 ||
                answers.infraId === 0 ||
                answers.personId === 0 ||
                answers.personItId === 0 ||
                answers.personCyberSecId === 0 ||
                answers.posId === 6 && (!answers.posOther || answers.posOther.trim() === "") ||
                answers.respId === 4 && (!answers.respOther || answers.respOther.trim() === "") ||
                answers.serviceId === 8 && (!answers.serviceOther || answers.serviceOther.trim() === "")
            ) {
                setMsgError("* กรุณากรอกข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ");
                window.scrollTo(0, 0);
                return;
            }
        }

        if (currentStep < totalSteps - 1) {
            setMsgError("");
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        setMsgError("");
        window.scrollTo(0, 0);
    }, [currentStep]);

    const checkSubmitCompletion = () => {
        return true;
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleMetadataChange = (key: keyof AnswerProps, value: string | number | null) => {
        setAnswers(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleQuestionChange = (catId: number, subCatId: number, qId: number, score: number) => {
        setAnswers(prev => {
            const currentAnswers = { ...prev.answer };
            
            if (!currentAnswers[catId]) currentAnswers[catId] = {};
            if (!currentAnswers[catId][subCatId]) currentAnswers[catId][subCatId] = {};
            
            currentAnswers[catId][subCatId][qId] = score;

            return {
                ...prev,
                answer: currentAnswers
            };
        });
    };

    useEffect(() => {
        const formStorage = localStorage.getItem('formData');
        if (formStorage) {
            setAnswers(JSON.parse(formStorage));
        }
    }, [])

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('/api/post/respondents', answers);
            if (res.data.status === 1) {
                localStorage.removeItem('formData');
                window.location.href = '/results?id=' + res.data.data.resultId;
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    }

    return (
        <>  
            { !isLoading ? (
                <>
                    <header>
                        <div className="header-container">
                            <h1>
                                {currentStep === 0 
                                    ? "1. ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม" 
                                    : currentStep === totalSteps - 1
                                        ? `${currentStep + 1}. ข้อเสนอแนะเพิ่มเติมอื่น ๆ`
                                        : `${currentStep + 1}. ${questionCategories[currentStep - 1]?.category}`}
                            </h1>
                        </div>
                    </header>
                    <section>
                        {currentStep === 0 && (
                            <div className="form-metadata-container">
                                {msgError !== "" && <p className='error-container'>{msgError}</p>}
                                <div className="gender-container">
                                    <p className="important">เพศ</p>
                                    <select 
                                        name="gender" 
                                        id="gender-select"
                                        value={answers.genderId}
                                        onChange={(e) => handleMetadataChange('genderId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.genders.map((item) => (
                                            <option value={item.id} key={item.id}>{item.gender}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="age-container">
                                    <p className="important">อายุ</p>
                                    <select 
                                        name="age" 
                                        id="age-select"
                                        value={answers.ageId}
                                        onChange={(e) => handleMetadataChange('ageId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.ages.map((item) => (
                                            <option value={item.id} key={item.id}>{item.age}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="position-container">
                                    <p className="important">ตำแหน่งงาน</p>
                                    <select 
                                        name="position" 
                                        id="position-select"
                                        value={answers.posId}
                                        onChange={(e) => handleMetadataChange('posId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.positions.map((item) => (
                                            <option value={item.id} key={item.id}>{item.position}</option>
                                        ))}
                                    </select>
                                    {/* <p>Position Other</p> */}
                                    { answers.posId === 6 &&
                                        <input 
                                            className='other-container'
                                            type="text" 
                                            placeholder='อื่น ๆ ...'
                                            value={answers.posOther || ''}
                                            onChange={(e) => handleMetadataChange('posOther', e.target.value)}
                                        />
                                    }
                                </div>
                                <div className="experience-container">
                                    <p className="important">ประสบการณ์ในสายงาน IT / Cybersecurity</p>
                                    <select 
                                        name="experience" 
                                        id="experience-select"
                                        value={answers.expId}
                                        onChange={(e) => handleMetadataChange('expId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.experiences.map((item) => (
                                            <option value={item.id} key={item.id}>{item.experience}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="responsibility-container">
                                    <p className="important">ความรับผิดชอบหลัก</p>
                                    <select 
                                        name="responsibility" 
                                        id="responsibility-select"
                                        value={answers.respId}
                                        onChange={(e) => handleMetadataChange('respId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.responsibilities.map((item) => (
                                            <option value={item.id} key={item.id}>{item.responsibility}</option>
                                        ))}
                                    </select>
                                    { answers.respId === 4 &&
                                        <input 
                                            className='other-container'
                                            type="text"
                                            placeholder='อื่น ๆ ...'
                                            value={answers.respOther || ''}
                                            onChange={(e) => handleMetadataChange('respOther', e.target.value)}
                                        />
                                    }
                                </div>
                                <div className="service-container">
                                    <p className="important">ลักษณะการให้บริการของโรงพยาบาล (Service Plan)</p>
                                    <select 
                                        name="service" 
                                        id="service-select"
                                        value={answers.serviceId}
                                        onChange={(e) => handleMetadataChange('serviceId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.services.map((item) => (
                                            <option value={item.id} key={item.id}>{item.service}</option>
                                        ))}
                                    </select>
                                    { answers.serviceId === 8 &&
                                        <input 
                                            className='other-container'
                                            type="text"
                                            placeholder='อื่น ๆ ...'
                                            value={answers.serviceOther || ''}
                                            onChange={(e) => handleMetadataChange('serviceOther', e.target.value)}
                                        />
                                    }
                                </div>
                                <div className="bed-container">
                                    <p className="important">จำนวนเตียง</p>
                                    <select 
                                        name="bed" 
                                        id="bed-select"
                                        value={answers.bedId}
                                        onChange={(e) => handleMetadataChange('bedId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.beds.map((item) => (
                                            <option value={item.id} key={item.id}>{item.bed}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="staffTotal-container">
                                    <p className="important">จำนวนพนักงานทั้งหมด</p>
                                    <select 
                                        name="personnel" 
                                        id="personnel-select"
                                        value={answers.personId}
                                        onChange={(e) => handleMetadataChange('personId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.personnel.map((item) => (
                                            <option value={item.id} key={item.id}>{item.personnel}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="itStaff-container">
                                    <p className="important">จำนวนบุคลากรฝ่าย IT</p>
                                    <select 
                                        name="personnelIt" 
                                        id="personnelIt-select"
                                        value={answers.personItId}
                                        onChange={(e) => handleMetadataChange('personItId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.personnelIt.map((item) => (
                                            <option value={item.id} key={item.id}>{item.personnelIt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="cyberSecStaff-container">
                                    <p className="important">จำนวนเจ้าหน้าที่ที่รับผิดชอบด้าน Cybersecurity โดยเฉพาะ</p>
                                    <select 
                                        name="personnelCyberSec" 
                                        id="personnelCyberSec-select"
                                        value={answers.personCyberSecId}
                                        onChange={(e) => handleMetadataChange('personCyberSecId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.personnelCyberSec.map((item) => (
                                            <option value={item.id} key={item.id}>{item.personnelCyberSec}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="infrastructure-container">
                                    <p className="important">โครงสร้างพื้นฐานระบบเครือข่าย</p>
                                    <select 
                                        name="infrastructure" 
                                        id="infrastructure-select"
                                        value={answers.infraId}
                                        onChange={(e) => handleMetadataChange('infraId', Number(e.target.value))}
                                    >
                                        <option value={0}>Select...</option>
                                        {formData?.infrastructures.map((item) => (
                                            <option value={item.id} key={item.id}>{item.infrastructure}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    
                        {currentStep > 0 && currentStep < totalSteps - 1 && (
                            <div className="question-list-container">
                                {(() => {
                                    const categoryIndex = currentStep - 1;
                                    const category = questionCategories[categoryIndex];
                                    if (!category) return null;
                    
                                    return (
                                        <>
                                            {category.subCategories.map((subCat, idxSc) => (
                                                <div key={subCat.id} className="sub-category-block">
                                                    <h3>{(categoryIndex + 2) + '.' + (idxSc + 1)} {subCat.subCategory}</h3>
                                                    {subCat.questions.map((question, idx) => (
                                                        <div key={question.id} className="question-item">
                                                            <p>
                                                                <span className="question-number">{(categoryIndex + 2) + '.' + (idxSc + 1) + '.' + (idx + 1)}</span>
                                                                <span>{question.question}</span>
                                                            </p>
                                                            <div className="question-score">
                                                                {[1, 2, 3, 4, 5].map((score) => (
                                                                    <label key={score}>
                                                                        <input
                                                                            type="radio"
                                                                            name={`question-${question.id}`}
                                                                            value={score}
                                                                            checked={answers.answer[category.id]?.[subCat.id]?.[question.id] === score}
                                                                            onChange={() => handleQuestionChange(category.id, subCat.id, question.id, score)}
                                                                        />
                                                                        {score}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    
                        { currentStep + 1 == totalSteps && (
                            <>
                                <div className="note-container">
                                    <h2>ข้อเสนอแนะเพิ่มเติมอื่น (ถ้ามี)</h2>
                                    <textarea
                                        rows={2}
                                        placeholder="ระบุข้อเสนอแนะเพิ่มเติมที่นี่..."
                                        value={answers.note || ''}
                                        onChange={(e) => handleMetadataChange('note', e.target.value)}
                                    />
                                </div>
                                <div className="submit-container">
                                    <button
                                        type="button"
                                        onClick={onSubmit}
                                        disabled={!checkSubmitCompletion()}
                                        aria-label="Submit form"
                                    >
                                        ส่งแบบฟอร์ม
                                    </button>
                                </div>
                            </>
                        )}
                        <footer />
                    </section>
                    
                    <div className="actionpage-container">
                        <div className="actionpage-section">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                aria-label="Previous step"
                            >
                                <ChevronLeft />
                            </button>
                            <div>
                                {currentStep + 1} / {totalSteps}
                            </div>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === totalSteps - 1 || !checkCurrentStepCompletion()}
                                aria-label="Next step"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    )
}