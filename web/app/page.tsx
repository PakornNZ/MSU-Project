'use client'
import { useEffect, useState } from "react"

interface SubCategories {
  id: number,
  subCategory: string,
  questions: [
    {
      id: number,
      question: string
    }
  ]
}

interface QuestionList {
  id: number,
  category: string,
  subCategories: SubCategories[],
}

interface FormData {
  genders: [
    {
      id: number,
      gender: string
    }
],
  ages: [
    {
      id: number,
      age: string
    }
  ],
  positions: [
    {
      id: number,
      position: string
    }
  ],
  experiences: [
    {
      id: number,
      experience: string
    }
  ],
  responsibilities: [
    {
      id: number,
      responsibility: string
    }
  ],
  services: [
    {
      id: number,
      service: string
    }
  ],
  beds: [
    {
      id: number,
      bed: string
    }
  ],
  infrastructures: [
    {
      id: number,
      infrastructure: string
    }
  ]
  questionList: QuestionList[]
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    getForm()
  }, [])

  const getForm = async () => {
    const res = await fetch('/api/form')
    const resData = await res.json()
    if (resData.status === 1) {
      setFormData(resData.data)
    }
  }

  return (
    <>
      {formData ? (
        <>
          <div className="form-metadata-container">
            <div className="gender-container">
              <p>Gender:</p>
              <select name="gender" id="gender-select">
                {formData?.genders.map((item) => (
                  <option value={item.id} key={item.id}>{item.gender}</option>
                ))}
              </select>
            </div>
            <div className="age-container">
              <p>Age:</p>
              <select name="age" id="age-select">
                {formData?.ages.map((item) => (
                  <option value={item.id} key={item.id}>{item.age}</option>
                ))}
              </select>
            </div>
            <div className="position-container">
              <p>Position:</p>
              <select name="position" id="position-select">
                {formData?.positions.map((item) => (
                  <option value={item.id} key={item.id}>{item.position}</option>
                ))}
              </select>
              <p>Position Other</p>
              <input type="text" />
            </div>
            <div className="experience-container">
              <p>Experience:</p>
              <select name="experience" id="experience-select">
                {formData?.experiences.map((item) => (
                  <option value={item.id} key={item.id}>{item.experience}</option>
                ))}
              </select>
            </div>
            <div className="responsibility-container">
              <p>Responsibility:</p>
              <select name="responsibility" id="responsibility-select">
                {formData?.responsibilities.map((item) => (
                  <option value={item.id} key={item.id}>{item.responsibility}</option>
                ))}
              </select>
              <p>Responsibility Other</p>
              <input type="text" />
            </div>
            <div className="service-container">
              <p>Service:</p>
              <select name="service" id="service-select">
                {formData?.services.map((item) => (
                  <option value={item.id} key={item.id}>{item.service}</option>
                ))}
              </select>
              <p>Service Other</p>
              <input type="text" />
            </div>
            <div className="bed-container">
              <p>Bed:</p>
              <select name="bed" id="bed-select">
                {formData?.beds.map((item) => (
                  <option value={item.id} key={item.id}>{item.bed}</option>
                ))}
              </select>
            </div>
            <div className="infrastructure-container">
              <p>Infrastructure:</p>
              <select name="infrastructure" id="infrastructure-select">
                {formData?.infrastructures.map((item) => (
                  <option value={item.id} key={item.id}>{item.infrastructure}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="question-list-container">
            {formData?.questionList.map((category, idxC) => (
              <div key={category.id} className="category-block">
                <h3>{idxC + 1} {category.category}</h3>
                {category.subCategories.map((subCat, idxSc) => (
                  <div key={subCat.id} className="sub-category-block">
                    <h4>{(idxC + 1) + '.' + (idxSc + 1)} {subCat.subCategory}</h4>
                    {subCat.questions.map((question, idx) => (
                      <div key={question.id} className="question-item">
                        <p>{(idxC + 1) + '.' + (idxSc + 1) + '.' + (idx + 1)} {question.question}</p>
                        {[1, 2, 3, 4, 5].map((score) => (
                          <label key={score}>
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={score}
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}