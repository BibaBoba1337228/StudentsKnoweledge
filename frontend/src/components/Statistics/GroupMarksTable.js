import React from "react";

const GroupMarksTable = () => {
    const data = [
        {name: "Ерофеев А.А", scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], total: 3},
        {name: "Бабкевич А.Н.", scores: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1], total: 10},
        {name: "Ерофеев А.А", scores: [7, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 1], total: 17},
        {name: "Бабкевич А.Н.", scores: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 1, 1, 1], total: 24},
        {name: "Ерофеев А.А", scores: [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 1, 1, 1], total: 31},
        {name: "Бабкевич А.Н.", scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], total: 3},
        {name: "Ерофеев А.А", scores: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1], total: 10},
        {name: "Бабкевич А.Н.", scores: [7, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 1, 1, 1], total: 17},
        {name: "Ерофеев А.А", scores: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 1, 1, 1], total: 24},
        {name: "Бабкевич А.Н.", scores: [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 1, 1, 1], total: 31},
    ];

    const headers = [
        "ФИО",
        "ЛР1",
        "ЛР2",
        "ЛР3",
        "ЛР4",
        "ЛР5",
        "ЛР6",
        "ЛР7",
        "ЛР8",
        "ЛР9",
        "P1",
        "P2",
        "P3",
        "K1",
        "K2",
        "K3",
        "Итог",
    ];

    return (
        <table
            style={{
                borderCollapse: "collapse",
                width: "100%",
                textAlign: "center",
                border: "1px solid #ddd",
            }}
        >
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontSize: "16px",
                            fontFamily: "IgraSans",
                        }}
                    >
                        {header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    <td
                        style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontFamily: "IgraSans",
                        }}
                    >
                        {row.name}
                    </td>
                    {row.scores.map((score, scoreIndex) => (
                        <td
                            key={scoreIndex}
                            style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                fontFamily: "IgraSans",
                            }}
                        >
                            {score}
                        </td>
                    ))}
                    <td
                        style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            fontWeight: "bold",
                            color: "red",
                            fontFamily: "IgraSans",
                        }}
                    >
                        {row.total}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GroupMarksTable;
