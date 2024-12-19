import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useParams } from "react-router-dom";

const ScheduleTable = () => {
    const [groupId, setGroupId] = useState("");
    const [groups, setGroups] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("all"); // can be "all", "numerator", or "denominator"
    const { courseId } = useParams();

    useEffect(() => {
        // Load groups for the course
        const fetchGroups = async () => {
            const response = await fetchWithAuth(`https://localhost:7065/api/Group`);
            const data = await response.json();
            setGroups(data);
        };
        fetchGroups();
    }, [courseId]);

    const fetchSchedule = async () => {
        if (!groupId) return;

        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule/group/${groupId}`);
        const data = await response.json();

        // If there's a schedule, set the data for display
        if (data && data.entries) {
            setScheduleData(data.entries);
            setFilteredData(data.entries); // Initially, show all entries
        }
    };

    // Filter the schedule data based on numerator/denominator filter
    const filterSchedule = (filterType) => {
        setFilter(filterType);

        if (filterType === "numerator") {
            setFilteredData(scheduleData.filter(entry => entry.isNumerator));
        } else if (filterType === "denominator") {
            setFilteredData(scheduleData.filter(entry => entry.isDenominator));
        } else {
            setFilteredData(scheduleData); // Show all if 'all' is selected
        }
    };

    return (
        <div className="scheduleWrapper">
            <div className="scheduleContainer">
                {/* Group selection */}
                <div className="scheduleHeaderContainer" style={{ display: "flex", flexDirection: "column", width: "19%" }}>
                    <select
                        id="groupSelect"
                        value={groupId}
                        style={{ marginBottom: "20px" }}
                        onChange={(e) => setGroupId(e.target.value)}
                    >
                        <option value="">Выберите...</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button id="ScheduleChangeButton" style={{ marginBottom: "40px" }} onClick={fetchSchedule}>
                        Показать расписание
                    </button>
                </div>

                {/* Buttons for filtering by numerator or denominator */}
                <div style={{ marginBottom: "20px" }}>
                    <button onClick={() => filterSchedule("all")} style={{ marginRight: "10px" }}>
                        Все
                    </button>
                    <button onClick={() => filterSchedule("numerator")} style={{ marginRight: "10px" }}>
                        Числитель
                    </button>
                    <button onClick={() => filterSchedule("denominator")}>
                        Знаменатель
                    </button>
                </div>

                {/* Display the filtered schedule */}
                {filteredData.length > 0 && (
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
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}
                                >
                                    Предмет
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}
                                >
                                    Аудитория
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}
                                >
                                    Время начала
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}
                                >
                                    Время окончания
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}
                                >
                                    День недели
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {entry.subject}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {entry.classroom}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {entry.startTime}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {entry.endTime}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            fontFamily: "IgraSans",
                                        }}
                                    >
                                        {entry.day}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleTable;
