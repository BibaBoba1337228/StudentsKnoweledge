import React, {useState, useEffect} from "react";
import {fetchWithAuth} from "../../api/fetchWithAuth";
import * as XLSX from "xlsx";
import {useParams} from "react-router-dom";

const GroupMarksTable = () => {
    const [groupId, setGroupId] = useState("");
    const [groups, setGroups] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const {courseId} = useParams();

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetchWithAuth(
                `https://localhost:7065/api/Course/${courseId}/Groups`
            );
            const data = await response.json();
            setGroups(data);
        };
        fetchGroups();
    }, [courseId]);

    const fetchMarks = async () => {
        if (!groupId) return;

        const response = await fetchWithAuth(
            `https://localhost:7065/api/Course/${courseId}/${groupId}/GroupMarks`
        );
        const data = await response.json();

        setHeaders(["ФИО", ...data.headers, "Итог"]);
        setTableData(data.students);
    };

    const exportToExcel = () => {
        const worksheetData = tableData.map((row) => ({
            ФИО: row.studentName,
            ...row.scores.reduce((acc, score, index) => {
                acc[`Работа ${index + 1}`] = score;
                return acc;
            }, {}),
            Итог: row.total,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Успеваемость");
        XLSX.writeFile(workbook, "GroupMarks.xlsx");
    };

    return (
        <div className="groupMarksWrapper">
            <div className="groupMarksContainer">

                <div className="groupMarksHeaderContainer"
                     style={{display: "flex", flexDirection: "column", width: "19%"}}>
                    <select
                        id="groupSelect"
                        value={groupId}
                        style={{marginBottom: "20px"}}
                        onChange={(e) => setGroupId(e.target.value)}
                    >
                        <option value="">Выберите...</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button id="GroupMarksChangeButton" style={{marginBottom: "40px", textAlign: "center"}}
                            onClick={fetchMarks}>Показать
                        успеваемость
                    </button>
                </div>

                {tableData.length > 0 && (
                    <div className="tableContainer">
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
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {row.studentName}
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
                        <button id="GroupMarksChangeButton" style={{marginTop: "50px"}}
                                onClick={exportToExcel}>Выгрузить в Excel
                        </button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default GroupMarksTable;
