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
    const [editingEntry, setEditingEntry] = useState(null); // Track the entry being edited
    const [updatedEntry, setUpdatedEntry] = useState(null); // Track updated entry data

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

        if (data && data.entries) {
            setScheduleData(data.entries);
            setFilteredData(data.entries); // Initially, show all entries
        }
    };

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

    const handleEditClick = (entry) => {
        setEditingEntry(entry);  // Set the entry to be edited
        setUpdatedEntry(entry);  // Pre-fill the form with current data
    };

    const handleDeleteClick = async (id) => {
        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule/group/${groupId}`, {
            method: 'DELETE',
            body: JSON.stringify({ entryId: id }),
        });

        if (response.ok) {
            setScheduleData(scheduleData.filter(entry => entry.id !== id));
            setFilteredData(filteredData.filter(entry => entry.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSchedule = async () => {
        const updatedEntryToSend = {
            Id: updatedEntry.id, // Используем id из updatedEntry
            Subject: updatedEntry.subject,
            Classroom: updatedEntry.classroom,
            StartTime: updatedEntry.startTime, // Убедитесь, что время в нужном формате
            EndTime: updatedEntry.endTime,     // Убедитесь, что время в нужном формате
            Day: updatedEntry.day,
            IsNumerator: updatedEntry.isNumerator,
            IsDenominator: updatedEntry.isDenominator
        };

        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule/${editingEntry.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                GroupId: groupId, // Передаем groupId, чтобы обновить конкретную группу
                Entries: [updatedEntryToSend] // Массив с одним элементом
            }),
        });

        if (response.ok) {
            // Делаем новый массив с обновленной записью
            const updatedSchedule = [...scheduleData]; // создаем новый массив
            console.log()

            const updatedIndex = updatedSchedule.findIndex(entry => entry.id === updatedEntry.id);
            if (updatedIndex !== -1) {
                updatedSchedule[updatedIndex] = { ...updatedSchedule[updatedIndex], ...updatedEntryToSend }; // обновляем нужную запись
            }

            console.log(updatedIndex)

            // Обновляем состояние
            setScheduleData(updatedSchedule); // обновляем данные расписания
            setFilteredData(updatedSchedule);  // синхронизируем фильтрованные данные
            setEditingEntry(null);  // сбрасываем состояние редактирования
        }
    };




    return (
        <div className="scheduleWrapper">
            <div className="scheduleContainer">
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
                    <button id="CourceDetailMarksButton" style={{ marginBottom: "40px" }} onClick={fetchSchedule}>
                        Показать расписание
                    </button>
                </div>

                {/* Filter buttons */}
                <div style={{ marginBottom: "20px" }}>
                    <button id="CourceDetailWorkButton" onClick={() => filterSchedule("all")} style={{ marginRight: "10px" }}>
                        Все
                    </button>
                    <button id="CourceDetailGroupsButton" onClick={() => filterSchedule("numerator")} style={{ marginRight: "10px" }}>
                        Числитель
                    </button>
                    <button id="CourceDetailTeachersButton" onClick={() => filterSchedule("denominator")}>
                        Знаменатель
                    </button>
                </div>

                {/* Schedule table */}
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
                                <th>Предмет</th>
                                <th>Аудитория</th>
                                <th>Время начала</th>
                                <th>Время окончания</th>
                                <th>День недели</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.subject}</td>
                                    <td>{entry.classroom}</td>
                                    <td>{entry.startTime}</td>
                                    <td>{entry.endTime}</td>
                                    <td>{entry.day}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(entry)}>Изменить</button>
                                        <button onClick={() => handleDeleteClick(entry.id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Edit entry modal */}
                {editingEntry && (
                    <div className="editModal">
                        <h2>Изменить расписание</h2>
                        <input
                            type="text"
                            name="subject"
                            value={updatedEntry.subject}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="classroom"
                            value={updatedEntry.classroom}
                            onChange={handleInputChange}
                        />
                        <input
                            type="time"
                            name="startTime"
                            value={updatedEntry.startTime}
                            onChange={handleInputChange}
                        />
                        <input
                            type="time"
                            name="endTime"
                            value={updatedEntry.endTime}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="day"
                            value={updatedEntry.day}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleUpdateSchedule}>Сохранить изменения</button>
                        <button onClick={() => setEditingEntry(null)}>Отменить</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleTable;
