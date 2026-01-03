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

router.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the Data API'
    })
})

module.exports = router