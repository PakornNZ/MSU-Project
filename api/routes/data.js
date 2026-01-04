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
        const {
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
            staffTotal,
            itStaff,
            cyberSecStaff,
            infraId,
            answer,
            note
        } = req.body

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
            staffTotal,
            itStaff,
            cyberSecStaff,
            infraId
        })

        const subScore = {}
        const totalScore = 0
        const avgScore = 0.00

        // ! Calculate subScore, totalScore, avgScore based on 'answer' object

        const newResults = await Results.create({
            respondentId: newRespondent.respondentId,
            answer: answer,
            note: note,
            subScore: subScore,
            totalScore: totalScore,
            avgScore: avgScore
        })

        return res.status(201).json({
            status: 1,
            message: 'Respondent created successfully',
            data: {
                respondent: newRespondent,
                result: newResults
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: 'Error creating respondents',
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


module.exports = router