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

export interface FormDataProps {
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
    personnel: [
        {
            id: number,
            personnel: string
        }
    ],
    personnelIt: [
        {
            id: number,
            personnelIt: string
        }
    ],
    personnelCyberSec: [
        {
            id: number,
            personnelCyberSec: string
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

export interface AnswerProps {
    genderId: number,
    ageId: number,
    posId: number,
    posOther: string | null,
    expId: number,
    respId: number,
    respOther: string | null,
    serviceId: number,
    serviceOther: string | null,
    bedId: number,
    personId: number,
    personItId: number,
    personCyberSecId: number,
    infraId : number,
    answer: Record<string, Record<string, Record<string, number>>>,
    note: string | null
}

interface SubScore {
    catId: number,
    category: string,
    catTotalScore: number,
    subCat: {
        subCatId: number,
        subCategory: string,
        score: number
    }[]
}

export interface ResultDataProps {
    resultId: string,
    totalScore: number,
    avgScore: number,
    subScore: SubScore[],
    createdAt: string,
    updatedAt: string
}