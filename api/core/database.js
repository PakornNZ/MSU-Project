require('dotenv').config()
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'postgres'
// const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
const DATABASE_HOST = 'localhost'
const DATABASE_PORT = process.env.DATABASE_PORT || 5432
const DATABASE_USER = process.env.DATABASE_USER || 'postgres'
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password'
const DATABASE_NAME = process.env.DATABASE_NAME || 'postgres'

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT
})

// Table Categories
const Categories = sequelize.define('categories', {
    catId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: DataTypes.TEXT,
    itemSeq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("nextval('categories_itemseq_seq')")
    }
}, { timestamps: false })

// Table Subcategories
const Subcategories = sequelize.define('subCategories', {
    subCatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    catId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'catId'
        }
    },
    subCategory: DataTypes.TEXT,
    itemSeq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("nextval('subCategories_itemseq_seq')")
    }
}, { timestamps: false })

// Table Questions
const Questions = sequelize.define('questions', {
    quesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subCatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategories,
            key: 'subCatId'
        }
    },
    question: DataTypes.TEXT,
    itemSeq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal("nextval('questions_itemseq_seq')")
    }
}, { timestamps: false })

// Table Genders
const Genders = sequelize.define('genders', {
    genderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gender: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Genders.count()
            if (count === 0) {
                await Genders.bulkCreate([
                    { gender: 'ชาย' },
                    { gender: 'หญิง' },
                    { gender: 'LGBTQ' }
                ])
            }
        }
    }
})

// Table Ages
const Ages = sequelize.define('ages', {
    ageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    age: DataTypes.TEXT,
    minValue: DataTypes.INTEGER,
    maxValue: DataTypes.INTEGER
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Ages.count()
            if (count === 0) {
                await Ages.bulkCreate([
                    { age: 'ต่ำกว่า 21 ปี', minValue: null, maxValue: 20 },
                    { age: '21-30 ปี', minValue: 21, maxValue: 30 },
                    { age: '31-40 ปี', minValue: 31, maxValue: 40 },
                    { age: '41-50 ปี', minValue: 41, maxValue: 50 },
                    { age: '51-60 ปี', minValue: 51, maxValue: 60 },
                    { age: 'มากกว่า 60 ปี', minValue: 61, maxValue: null }
                ])
            }
        }
    }
})

// Table Positions
const Positions = sequelize.define('positions', {
    posId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    position: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Positions.count()
            if (count === 0) {
                await Positions.bulkCreate([
                    { position: 'CISO / ผู้บริหารระดับสูงด้านเทคโนโลยีสารสนเทศและความมั่นคงปลอดภัยของข้อมูล' },
                    { position: 'ผู้จัดการฝ่ายเทคโนโลยีสารสนเทศ' },
                    { position: 'นักวิชาการคอมพิวเตอร์ / เจ้าหน้าปฏิบัติการด้านเครือข่ายและระบบสารสนเทศหรือเทียบเท่า' },
                    { position: 'เจ้าหน้าด้านระบบรักษาความปลอดภัยสารสนเทศ' },
                    { position: 'เจ้าหน้าที่ด้านนโยบายหรือบริหารความเสี่ยง' },
                    { position: 'อื่น ๆ' },
                ])
            }
        }
    }
})

// Table Experiences
const Experiences = sequelize.define('experiences', {
    expId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    experience: DataTypes.TEXT,
    minValue: DataTypes.INTEGER,
    maxValue: DataTypes.INTEGER
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Experiences.count()
            if (count === 0) {
                await Experiences.bulkCreate([
                    { experience: 'น้อยกว่า 3 ปี', minValue: null, maxValue: 2 },
                    { experience: '3-5 ปี', minValue: 3, maxValue: 5 },
                    { experience: '6-10 ปี', minValue: 6, maxValue: 10 },
                    { experience: 'มากกว่า 10 ปี', minValue: 11, maxValue: null }
                ])
            }
        }
    }})

// Table Responsibilities
const Responsibilities = sequelize.define('responsibilities', {
    respId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    responsibility: DataTypes.TEXT
}, {
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Responsibilities.count()
            if (count === 0) {
                await Responsibilities.bulkCreate([
                    { responsibility: 'ด้านนโยบาย/การบริหารจัดการ' },
                    { responsibility: 'ด้านเทคนิค / ระบบ' },
                    { responsibility: 'ด้านการกำกับดูแล' },
                    { responsibility: 'อื่น ๆ' }
                ])
            }
        }
    }
})

// Table Services
const Services = sequelize.define('services', {
    serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    service: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Services.count()
            if (count === 0) {
                await Services.bulkCreate([
                    { service: 'โรงพยาบาลศูนย์ (A)' },
                    { service: 'โรงพยาบาลทั่วไปขนาดใหญ่ (S)' },
                    { service: 'โรงพยาบาลทั่วไปขนาดเล็ก (M1)' },
                    { service: 'โรงพยาบาลชุมชนแม่ข่าย (M2)' },
                    { service: 'โรงพยาบาลชุมชนขนาดใหญ่ (F1)' },
                    { service: 'โรงพยาบาลชุมชนขนาดกลาง (F2)' },
                    { service: 'โรงพยาบาลชุมชนขนาดเล็ก (F3)' },
                    { service: 'อื่น ๆ' }
                ])
            }
        }
    }
})

// Table Beds
const Beds = sequelize.define('beds', {
    bedId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bed: DataTypes.TEXT,
    minValue: DataTypes.INTEGER,
    maxValue: DataTypes.INTEGER
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Beds.count()
            if (count === 0) {
                await Beds.bulkCreate([
                    { bed: '1 - 30 เตียง', minValue: 1, maxValue: 30 },
                    { bed: '31 - 120 เตียง', minValue: 31, maxValue: 120 },
                    { bed: 'มากกว่า 120 เตียง', minValue: 121, maxValue: null }
                ])
            }
        }
    }
})

// Table Personnel
const Personnel = sequelize.define('personnels', {
    personId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    personnel: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Personnel.count()
            if (count === 0) {
                await Personnel.bulkCreate([
                    { personnel: '1 - 30 คน' },
                    { personnel: '31 - 60 คน' },
                    { personnel: 'มากกว่า 60 คน' }
                ])
            }
        }
    }
})

// Table Personnel It
const PersonnelIt = sequelize.define('personnelIts', {
    personItId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    personnelIt: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await PersonnelIt.count()
            if (count === 0) {
                await PersonnelIt.bulkCreate([
                    { personnelIt: '1 - 5 คน' },
                    { personnelIt: '6 - 10 คน' },
                    { personnelIt: 'มากกว่า 10 คน' }
                ])
            }
        }
    }
})

// Table Personnel Cyber Sec
const PersonnelCyberSec = sequelize.define('personnelCyberSecs', {
    personCyberSecId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    personnelCyberSec: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await PersonnelCyberSec.count()
            if (count === 0) {
                await PersonnelCyberSec.bulkCreate([
                    { personnelCyberSec: '1 - 5 คน' },
                    { personnelCyberSec: '6 - 10 คน' },
                    { personnelCyberSec: 'มากกว่า 10 คน' }
                ])
            }
        }
    }
})

// Table Infrastructures
const Infrastructures = sequelize.define('infrastructures', {
    infraId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    infrastructure: DataTypes.TEXT
}, { 
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Infrastructures.count()
            if (count === 0) {
                await Infrastructures.bulkCreate([
                    { infrastructure: 'On-premises' },
                    { infrastructure: 'Hybrid' },
                    { infrastructure: 'Cloud-based' },
                ])
            }
        }
    }
})

// Table Respondents
const Respondents = sequelize.define('respondents', {
    respondentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genders,
            key: 'genderId'
        }
    },
    ageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ages,
            key: 'ageId'
        }
    },
    posId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Positions,
            key: 'posId'
        }
    },
    posOther: DataTypes.TEXT,
    expId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Experiences,
            key: 'expId'
        }
    },
    respId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Responsibilities,
            key: 'respId'
        }
    },
    respOther: DataTypes.TEXT,
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Services,
            key: 'serviceId'
        }
    },
    serviceOther: DataTypes.TEXT,
    bedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Beds,
            key: 'bedId'
        }
    },
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Personnel,
            key: 'personId'
        }
    },
    personItId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PersonnelIt,
            key: 'personItId'
        }
    },
    personCyberSecId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PersonnelCyberSec,
            key: 'personCyberSecId'
        }
    },
    infraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Infrastructures,
            key: 'infraId'
        }
    },
})

// Table Results
const Results = sequelize.define('results', {
    resultId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    respondentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Respondents,
            key: 'respondentId'
        }
    },
    answer: DataTypes.JSONB,
    note: DataTypes.TEXT,
    subScore: DataTypes.JSONB,
    totalScore: DataTypes.DECIMAL(6, 2),
    avgScore: DataTypes.DECIMAL(3, 2)
})


// Foreign Key Relationships
Categories.hasMany(Subcategories, { foreignKey: 'catId' })
Subcategories.belongsTo(Categories, { foreignKey: 'catId' })

Subcategories.hasMany(Questions, { foreignKey: 'subCatId' })
Questions.belongsTo(Subcategories, { foreignKey: 'subCatId' })

Genders.hasMany(Respondents, { foreignKey: 'genderId' })
Respondents.belongsTo(Genders, { foreignKey: 'genderId' })

Ages.hasMany(Respondents, { foreignKey: 'ageId' })
Respondents.belongsTo(Ages, { foreignKey: 'ageId' })

Positions.hasMany(Respondents, { foreignKey: 'posId' })
Respondents.belongsTo(Positions, { foreignKey: 'posId' })

Experiences.hasMany(Respondents, { foreignKey: 'expId' })
Respondents.belongsTo(Experiences, { foreignKey: 'expId' })

Responsibilities.hasMany(Respondents, { foreignKey: 'respId' })
Respondents.belongsTo(Responsibilities, { foreignKey: 'respId' })

Services.hasMany(Respondents, { foreignKey: 'serviceId' })
Respondents.belongsTo(Services, { foreignKey: 'serviceId' })

Beds.hasMany(Respondents, { foreignKey: 'bedId' })
Respondents.belongsTo(Beds, { foreignKey: 'bedId' })

Personnel.hasMany(Respondents, { foreignKey: 'staffTotal', sourceKey: 'personId' })
Respondents.belongsTo(Personnel, { foreignKey: 'staffTotal', targetKey: 'personId' })

PersonnelIt.hasMany(Respondents, { foreignKey: 'itStaff', sourceKey: 'personItId' })
Respondents.belongsTo(PersonnelIt, { foreignKey: 'itStaff', targetKey: 'personItId' })

PersonnelCyberSec.hasMany(Respondents, { foreignKey: 'cyberSecStaff', sourceKey: 'personCyberSecId' })
Respondents.belongsTo(PersonnelCyberSec, { foreignKey: 'cyberSecStaff', targetKey: 'personCyberSecId' })

Infrastructures.hasMany(Respondents, { foreignKey: 'infraId' })
Respondents.belongsTo(Infrastructures, { foreignKey: 'infraId' })

Respondents.hasOne(Results, { foreignKey: 'respondentId' })
Results.belongsTo(Respondents, { foreignKey: 'respondentId' })

sequelize.sync({ force: false })
module.exports = {
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
}
