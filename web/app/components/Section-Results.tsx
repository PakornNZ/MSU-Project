import { ResultDataProps } from "../types/Interfaces";
import { RadarChart } from '@mui/x-charts/RadarChart';
import "@/app/styles/Style-Result.css"
import { useEffect, Fragment } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";

export default function SectionResults({ resultData }: { resultData: ResultDataProps }) {

    const getInitials = (id: number) => {
        const categories = ['G', 'S', 'C', 'T', 'H'];
        return categories[id] || '';
    }
    const getScoreColor = (score: number) => {
        if (score <= 100) return '#f85c5c';
        if (score <= 200) return '#fa8735';
        if (score <= 300) return '#f1c94f';
        if (score <= 400) return '#6bc522';
        return 'var(--color-main)';
    }

    const getLevel = (score: number) => {
        if (score <= 100) return 'Level 1 – Initial';
        if (score <= 200) return 'Level 2 – Awareness';
        if (score <= 300) return 'Level 3 – Defined';
        if (score <= 400) return 'Level 4 – Managed';
        return 'Level 5 – Optimized';
    }

    const getDetail = (score: number) => {
        if (score <= 100) return '';
        if (score <= 200) return '';
        if (score <= 300) return '';
        if (score <= 400) return '';
        return 'โรงพยาบาลมีระบบความมั่นคงไซเบอร์ที่ดำเนินงานได้อย่างมีประสิทธิภาพ และมีการปรับปรุงต่อเนื่องในทุกมิติหลัก';
    }

    const calculateAvg = (totalScore: number) => {
        return ((totalScore / 5) * 100).toFixed(2);
    }

    return (
        <>
            <div className="header-container">
                <div className="header-section">
                    <h1>
                        ผลการประเมินของคุณ
                    </h1>
                    <p>วันที่: {new Date(resultData.createdAt).toLocaleString('th-TH')}</p>
                </div>
            </div>

            <div className="detail-container">
                <div className="detail-section">
                    <div className="totalScore-container">
                        <div className="card-1">
                            <div>ระดับความพร้อมรวม <h2>{getLevel(resultData.totalScore)}</h2></div>
                            <div>ค่าเฉลี่ยรวม <span><h2>{resultData.avgScore}</h2> / 5 ({calculateAvg(resultData.avgScore)}%)</span></div>
                            <span className="detait-message">ข้อความย่อย : {getDetail(resultData.totalScore)}</span>
                        </div>
                        <div className="totalScore-card">
                            <Gauge
                                value={resultData.totalScore}
                                valueMax={500}
                                startAngle={225}
                                endAngle={495}
                                width={300}
                                height={250}
                                innerRadius={100}
                                outerRadius={130}
                                text=''
                                cornerRadius="50%"
                                sx={{
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: getScoreColor(resultData.totalScore),
                                    }
                                }}
                            />
                            <h2><span style={{ color: getScoreColor(resultData.totalScore) }}>{resultData.totalScore}</span><p>Credit Rating Score</p>Out of 500</h2>
                        </div>
                        <div className="card-3">
                            {/* <RadarChart
                                // width={300}
                                height={300}
                                series={[{ 
                                        label: 'ระดับความสามารถการรับมือภัยคุกคามไซเบอร์ซีคิวริตี้', 
                                        data: resultData.subScore.map((items) => items.catTotalScore) || [],
                                        fillArea: true
                                    }]}
                                radar={{
                                    max: 100,
                                    metrics: resultData.subScore.map((items, idx) => getInitials(idx)) || [],
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className="categories-container">
                        {resultData.subScore.map((category, idx) => (
                            <div key={category.catId} className="category-card">
                                <RadarChart
                                    height={300}
                                    series={[{ 
                                            label: category.category.match(/\(.*?\)/) ? category.category.match(/\((.*?)\)/)![1] + ` (${getInitials(idx)})` : category.category, 
                                            data: category.subCat?.map(subCat => subCat.score) || [],
                                            fillArea: true
                                        }]}
                                    radar={{
                                        max: 100,
                                        metrics: category.subCat?.map((subCat, idxSub) => `${getInitials(idx)}${idxSub + 1}`) || [],
                                    }}
                                />
                                <div className="score-container">
                                    <p>{category.category}</p>
                                    <span><h2>{category.catTotalScore}</h2> คะแนน</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>ID</th>
                                    <th>หัวข้อย่อย</th>
                                    <th style={{ textAlign: 'center' }}>คะแนน (เต็ม 100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultData.subScore.map((category, idx) => (
                                    <Fragment key={category.catId}>
                                        <tr style={{ backgroundColor: '#ffffff' }}>
                                            <td style={{ fontWeight: 800 }}>{getInitials(idx)}</td>
                                            <td style={{ fontWeight: 700, color: 'var(--color-main)' }}>{category.category}</td>
                                            <td style={{ fontWeight: 800 }}>{category.catTotalScore}</td>
                                        </tr>
                                        {category.subCat?.map((subCat, idxSub) => (
                                            <tr key={subCat.subCatId}>
                                                <td>{getInitials(idx)}{idxSub+1}</td>
                                                <td>{subCat.subCategory}</td>
                                                <td style={{ fontWeight:'400' }}>{subCat.score}</td>
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}