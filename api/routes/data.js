const express = require('express')
const router = express.Router()

router.use(express.json())

const {
    sequelize,
    Categories,
    Subcategories,
    Questions,
    Genders,
    Ages,
    Positions,
    Experiences,
    Responsibilities,
    Services,
    Beds,
    Personnel,
    PersonnelIt,
    PersonnelCyberSec,
    Infrastructures,
    Respondents,
    Results
} = require('../core/database')


router.get('/fetch/form', async (req, res) => {
    try {

        const genders = await Genders.findAll({ order: [['genderId', 'ASC']] })
        const ages = await Ages.findAll({ order: [['ageId', 'ASC']] })
        const positions = await Positions.findAll({ order: [['posId', 'ASC']] })
        const experiences = await Experiences.findAll({ order: [['expId', 'ASC']] })
        const responsibilities = await Responsibilities.findAll({ order: [['respId', 'ASC']] })
        const services = await Services.findAll({ order: [['serviceId', 'ASC']] })
        const beds = await Beds.findAll({ order: [['bedId', 'ASC']] })
        const personnel = await Personnel.findAll({ order: [['personId', 'ASC']] })
        const personnelIt = await PersonnelIt.findAll({ order: [['personItId', 'ASC']] })
        const personnelCyberSec = await PersonnelCyberSec.findAll({ order: [['personCyberSecId', 'ASC']] })
        const infrastructures = await Infrastructures.findAll({ order: [['infraId', 'ASC']] })
        const categories = await Categories.findAll({ order: [['itemSeq', 'ASC']] })
        const quesList = []
        for (const category of categories) {
            const dataCategory = {
                id: category.catId,
                category: category.category,
                subCategories: []
            }
            const subcategories = await Subcategories.findAll({ 
                where: { catId: category.catId }, 
                order: [['itemSeq', 'ASC']] 
            })
            
            for (const subcategory of subcategories) {
                const questions = await Questions.findAll({ 
                    where: { subCatId: subcategory.subCatId }, 
                    order: [['itemSeq', 'ASC']]
                })
                
                if (!dataCategory.subCategories) {
                    dataCategory.subCategories = []
                } else {
                    const dataSubCategory = {
                        id: subcategory.subCatId,
                        subCategory: subcategory.subCategory,
                        questions: questions.map((ques) => ({
                            id: ques.quesId,
                            question: ques.question
                        }))
                    }
                    dataCategory.subCategories.push(dataSubCategory)
                }
            }
            quesList.push(dataCategory)
        }

        const form  = {
            genders: genders.map((item) => ({
                id: item.genderId,
                gender: item.gender
            })),
            ages: ages.map((item) => ({
                id: item.ageId,
                age: item.age
            })),
            positions: positions.map((item) => ({
                id: item.posId,
                position: item.position
            })),
            experiences: experiences.map((item) => ({
                id: item.expId,
                experience: item.experience
            })),
            responsibilities: responsibilities.map((item) => ({
                id: item.respId,
                responsibility: item.responsibility
            })),
            services: services.map((item) => ({
                id: item.serviceId,
                service: item.service
            })),
            beds: beds.map((item) => ({
                id: item.bedId,
                bed: item.bed
            })),
            personnel: personnel.map((item) => ({
                id: item.personId,
                personnel: item.personnel
            })),
            personnelIt: personnelIt.map((item) => ({
                id: item.personItId,
                personnelIt: item.personnelIt
            })),
            personnelCyberSec: personnelCyberSec.map((item) => ({
                id: item.personCyberSecId,
                personnelCyberSec: item.personnelCyberSec
            })),
            infrastructures: infrastructures.map((item) => ({
                id: item.infraId,
                infrastructure: item.infrastructure
            })),
            questionList: quesList
        }

        return res.status(200).json({
            status: 1,
            message: 'Fetched successfully',
            data: form
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Error fetching',
            data: {}
        })
    }
})

router.post('/create/respondents', async (req, res) => {
    try {
        let {
            genderId,
            ageId,
            posId,
            posOther,
            expId,
            respId,
            respOther,
            serviceId,
            serviceOther,
            bedId,
            personId,
            personItId,
            personCyberSecId,
            infraId,
            answer,
            note
        } = req.body
        
        posOther = posOther !== '' ? posOther : null
        respOther = respOther !== '' ? respOther : null
        serviceOther = serviceOther !== '' ? serviceOther : null
        note = note !== '' ? note : null
        const newRespondent = await Respondents.create({
            genderId,
            ageId,
            posId,
            posOther,
            expId,
            respId,
            respOther,
            serviceId,
            serviceOther,
            bedId,
            personId,
            personItId,
            personCyberSecId,
            infraId
        })

        let categoriesList = {}
        let totalRawScore = 0
        let totalQuestions = 0
        let sumNormalizedScore = 0
        
        const targetCategories = Object.keys(answer).sort((a, b) => Number(a) - Number(b)).slice(0, 5)

        for (const catId of targetCategories) {
            let subTotalScore = 0
            let subCount = 0
            let catList = {
                'catTotalScore': 0,
                'subCatScore': {}
            }
            for (const subCatId in answer[catId]) {
                let quesTotalScore = 0
                let quesCount = 0
                for (const quesId in answer[catId][subCatId]) {
                    const score = parseInt(answer[catId][subCatId][quesId]) || 0
                    quesTotalScore += score
                    totalRawScore += score
                    
                    quesCount += 1
                    subCount += 1
                    totalQuestions += 1
                }
                subTotalScore += quesTotalScore
                const nomalizedSubScore = quesCount > 0 ? (quesTotalScore / (quesCount * 5)) * 100 : 0
                catList.subCatScore[subCatId] = Number(nomalizedSubScore.toFixed(2))
            }
            const nomalizedCatScore = subCount > 0 ? Number(((subTotalScore / (subCount * 5)) * (100)).toFixed(2)) : 0
            catList.catTotalScore = nomalizedCatScore
            categoriesList[catId] = catList
            sumNormalizedScore += nomalizedCatScore
        }
        
        const totalScore = Number(sumNormalizedScore.toFixed(2))
        const avgScore = totalQuestions > 0 ? Number((totalRawScore / totalQuestions).toFixed(2)) : 0
        
        const newResults = await Results.create({
            respondentId: newRespondent.respondentId,
            answer: answer,
            note: note,
            subScore: categoriesList,
            totalScore: totalScore,
            avgScore: avgScore
        })

        return res.status(201).json({
            status: 1,
            message: 'Respondent created successfully',
            data: {
                resultId: newResults.resultId
            }
        })

    } catch (error) {
        console.error("Error in create/respondents:", error);
        res.status(500).json({
            status: 0,
            message: 'Error creating respondents: ' + error.message,
            data: {}
        })
    }
})

router.post('/create/categories', async (req, res) => {
    try {
        const { category } = req.body
        
        const findCategory = await Categories.findOne({ where: { category: category } })
        if (findCategory) {
            return res.status(422).json({
                status: 0,
                message: 'Category already exists',
                data: {}
            })
        }

        const newCategory = await Categories.create({ category: category })
        return res.status(201).json({
            status: 1,
            message: 'Category created successfully',
            data: newCategory
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Error creating categories',
            data: {}
        })
    }
})

router.post('/create/subcategories', async (req, res) => {
    try {
        const { catId, subCategory } = req.body

        const findCatId = await Categories.findOne({ where: { catId: catId } })
        if (!findCatId) {
            return res.status(422).json({
                status: 0,
                message: 'Category ID does not exist',
                data: {}
            })
        }

        const findSubCategory = await Subcategories.findOne({ where: { subCategory: subCategory, catId: catId } })
        if (findSubCategory) {
            return res.status(422).json({
                status: 0,
                message: 'Subcategory already exists for this Category',
                data: {}
            })
        }

        const newSubCategory = await Subcategories.create({ catId: catId, subCategory: subCategory })
        return res.status(201).json({
            status: 1,
            message: 'Subcategory created successfully',
            data: newSubCategory
        })

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Error creating subcategories',
            data: {}
        })
    }
})

router.post('/create/questions', async (req, res) => {
    try {
        const { subCatId, question } = req.body

        const findSubCatId = await Subcategories.findOne({ where: { subCatId: subCatId } })
        if (!findSubCatId) {
            return res.status(422).json({
                status: 0,
                message: 'Subcategory ID does not exist',
                data: {}
            })
        }

        const findQuestion = await Questions.findOne({ where: { question: question, subCatId: subCatId } })
        if (findQuestion) {
            return res.status(422).json({
                status: 0,
                message: 'Question already exists for this subcategory',
                data: {}
            })
        }

        const newQuestion = await Questions.create({ subCatId: subCatId, question: question })
        return res.status(201).json({
            status: 1,
            message: 'Question created successfully',
            data: newQuestion
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Error creating question',
            data: {}
        })
    }
})

router.get('/fetch/results/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Results.findOne({ 
            where: { resultId: id },
            include: [{
                model: Respondents,
                include: [Genders, Ages, Positions, Experiences, Responsibilities, Services, Beds, Infrastructures]
            }]
        })

        if (!result) {
            return res.status(404).json({
                status: 0,
                message: 'Result not found',
                data: {}
            })
        }

        const categoriesList = await Categories.findAll(
            { order: [['itemSeq', 'ASC']] ,
                include: [{
                    model: Subcategories,
                    include: [Questions],
                    order: [['itemSeq', 'ASC']]
                }]
            }
        )
        result.totalScore = Number(result.totalScore)
        result.avgScore = Number(result.avgScore)

        let subScore = []
        for (const catId in result.subScore) {
            let cat = {
                catId: 0,
                category: '',
                catTotalScore: 0,
                subCat: []
            }

            const catDetail = categoriesList.find(c => c.catId == Number(catId))
            const scoreData = result.subScore[catId]
            cat.category = catDetail.category
            cat.catId = Number(catId)
            cat.catTotalScore = scoreData.catTotalScore
            
            const dbSubCategories = catDetail.subCategories || catDetail.dataValues.subCategories || []

            for (const subCatId in scoreData.subCatScore) {

                const subCatDetail = dbSubCategories.find(sc => sc.subCatId == Number(subCatId))
                
                if (subCatDetail) {
                    let subCat = {
                        subCatId: subCatDetail.subCatId,
                        subCategory: subCatDetail.subCategory,
                        score: scoreData.subCatScore[subCatId]
                    }
                    cat.subCat.push(subCat)
                }
            }
            subScore.push(cat)
        }

        const questionResponses = {
            resultId: result.resultId,
            totalScore: result.totalScore,
            avgScore: result.avgScore,
            subScore: subScore,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }

        return res.status(200).json({
            status: 1,
            message: 'Fetched successfully',
            data: questionResponses
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 0,
            message: 'Error fetching result',
            data: {}
        })
    }
})


module.exports = router