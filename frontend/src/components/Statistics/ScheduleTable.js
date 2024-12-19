import React, {useState, useEffect} from "react";
import {fetchWithAuth} from "../../api/fetchWithAuth";
import {useParams} from "react-router-dom";
import cross from '../../assets/icons/cross.svg';
import pencil from '../../assets/icons/pencil.svg';

const ScheduleTable = () => {
    const [groupId, setGroupId] = useState("");
    const [groups, setGroups] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("all"); // "all", "numerator", "denominator"
    const {courseId} = useParams();
    const [editingEntry, setEditingEntry] = useState(null);
    const [updatedEntry, setUpdatedEntry] = useState(null);
    const [newEntry, setNewEntry] = useState({
        subject: "",
        classroom: "",
        startTime: "",
        endTime: "",
        day: "",
        isNumerator: false,
        isDenominator: false,
    });

    useEffect(() => {
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
            setFilteredData(data.entries); // Initially show all entries
        }
    };

    const filterSchedule = (filterType) => {
        setFilter(filterType);

        if (filterType === "numerator") {
            setFilteredData(scheduleData.filter((entry) => entry.isNumerator));
        } else if (filterType === "denominator") {
            setFilteredData(scheduleData.filter((entry) => entry.isDenominator));
        } else {
            setFilteredData(scheduleData); // Show all if 'all' is selected
        }
    };

    const handleEditClick = (entry) => {
        setEditingEntry(entry);
        setUpdatedEntry(entry);
    };

    const handleDeleteClick = async (id) => {
        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setScheduleData(scheduleData.filter((entry) => entry.id !== id));
            setFilteredData(filteredData.filter((entry) => entry.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedEntry((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateSchedule = async () => {
        const updatedEntryToSend = {
            Id: updatedEntry.id,
            Subject: updatedEntry.subject,
            Classroom: updatedEntry.classroom,
            StartTime: updatedEntry.startTime,
            EndTime: updatedEntry.endTime,
            Day: updatedEntry.day,
            IsNumerator: updatedEntry.isNumerator,
            IsDenominator: updatedEntry.isDenominator,
        };

        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule/${editingEntry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                GroupId: groupId,
                Entries: [updatedEntryToSend],
            }),
        });

        if (response.ok) {
            const updatedSchedule = scheduleData.map((schedule) => {
                if (schedule.id === updatedEntryToSend.Id) {
                    return {
                        ...schedule,
                        subject: updatedEntry.subject,
                        classroom: updatedEntry.classroom,
                        startTime: updatedEntry.startTime,
                        endTime: updatedEntry.endTime,
                        day: updatedEntry.day,
                        isNumerator: updatedEntry.isNumerator,
                        isDenominator: updatedEntry.isDenominator,
                    };
                }
                return schedule;
            });

            setScheduleData(updatedSchedule);
            setFilteredData(updatedSchedule);
            setEditingEntry(null);
        }
    };

    const handleAddEntry = async () => {
        if (!groupId) {
            alert("Выберите группу перед добавлением записи!");
            return;
        }

        if (!newEntry.subject || !newEntry.classroom || !newEntry.startTime || !newEntry.endTime || !newEntry.day) {
            alert("Заполните все поля!");
            return;
        }

        const newEntryToSend = {
            GroupId: groupId,
            Entries: [
                {
                    Subject: newEntry.subject,
                    Classroom: newEntry.classroom,
                    StartTime: newEntry.startTime,
                    EndTime: newEntry.endTime,
                    Day: newEntry.day,
                    IsNumerator: newEntry.isNumerator,
                    IsDenominator: newEntry.isDenominator,
                },
            ],
        };

        const response = await fetchWithAuth(`https://localhost:7065/api/Schedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntryToSend),
        });

        if (response.ok) {
            const addedEntry = await response.json();
            setScheduleData(addedEntry.entries);
            setFilteredData(addedEntry.entries);
            setNewEntry({
                subject: "",
                classroom: "",
                startTime: "",
                endTime: "",
                day: "",
                isNumerator: false,
                isDenominator: false,
            });
        } else {
            alert("Ошибка при добавлении записи!");
        }
    };

    return (
        <div className="scheduleWrapper">
            <div className="scheduleContainer">
                <div className="scheduleHeaderContainer"
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
                    <button id="CourceDetailMarksButton" style={{marginBottom: "40px", textAlign: "center"}}
                            onClick={fetchSchedule}>
                        Показать расписание
                    </button>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <button id="CourceDetailWorkButton" onClick={() => filterSchedule("all")}
                            style={{marginRight: "10px"}}>
                        Все
                    </button>
                    <button id="CourceDetailGroupsButton" onClick={() => filterSchedule("numerator")}
                            style={{marginRight: "10px"}}>
                        Числитель
                    </button>
                    <button id="CourceDetailTeachersButton" onClick={() => filterSchedule("denominator")}>
                        Знаменатель
                    </button>
                </div>

                {filteredData.length > 0 && (
                    <div className="tableContainer">
                        <table style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                            border: "1px solid #ddd"
                        }}>
                            <thead>
                            <tr>
                                <th style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontFamily: "IgraSans",
                                }}>Предмет
                                </th>
                                <th style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontFamily: "IgraSans",
                                }}>Аудитория
                                </th>
                                <th style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontFamily: "IgraSans",
                                }}>Время начала
                                </th>
                                <th style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontFamily: "IgraSans",
                                }}>Время окончания
                                </th>
                                <th style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    fontSize: "16px",
                                    fontFamily: "IgraSans",
                                }}>День недели
                                </th>

                                {localStorage.getItem('role') == 3 && (
                                    <th style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontSize: "16px",
                                        fontFamily: "IgraSans",
                                    }}>Действия
                                    </th>
                                )}


                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontFamily: "IgraSans",
                                    }}>{entry.subject}</td>
                                    <td style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontFamily: "IgraSans",
                                    }}>{entry.classroom}</td>
                                    <td style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontFamily: "IgraSans",
                                    }}>{entry.startTime}</td>
                                    <td style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontFamily: "IgraSans",
                                    }}>{entry.endTime}</td>
                                    <td style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                        fontFamily: "IgraSans",
                                    }}>{entry.day}</td>

                                    {localStorage.getItem('role') == 3 && (
                                        <td>
                                            <button onClick={() => handleEditClick(entry)} style={{all: "unset"}}><img
                                                src={pencil} alt="Edit Icon" style={{
                                                marginRight: '20px', width: '20px',
                                                cursor: "pointer"
                                            }}/>
                                            </button>
                                            <button onClick={() => handleDeleteClick(entry.id)} style={{all: "unset"}}>
                                                <img
                                                    src={cross}
                                                    alt="Edit Icon"
                                                    style={{
                                                        marginRight: '20px',
                                                        width: '20px',
                                                        cursor: "pointer"
                                                    }}/></button>
                                        </td>
                                    )}


                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {editingEntry && (
                    <div className="editModal" style={{display: "flex", flexDirection: "column", width: "30%"}}>
                        <h2>Изменить расписание</h2>
                        <input type="text" name="subject" value={updatedEntry.subject} onChange={handleInputChange}/>
                        <input type="text" name="classroom" value={updatedEntry.classroom}
                               onChange={handleInputChange}/>
                        <input type="time" name="startTime" value={updatedEntry.startTime}
                               onChange={handleInputChange}/>
                        <input type="time" name="endTime" value={updatedEntry.endTime} onChange={handleInputChange}/>
                        <input type="text" name="day" value={updatedEntry.day} onChange={handleInputChange}/>
                        <button onClick={handleUpdateSchedule} id="LrRateChangeButton"
                                style={{
                                    textAlign: "center",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer"
                                }}>Сохранить
                            изменения
                        </button>
                        <button onClick={() => setEditingEntry(null)} id="LrRateDeleteButton"
                                style={{
                                    textAlign: "center", margin: "0", marginTop: "10px",
                                    cursor: "pointer"
                                }}>Отменить
                        </button>
                    </div>
                )}

                {localStorage.getItem('role') == 3 && (
                    <div className="addEntryContainer" style={{display: "flex", flexDirection: "column", width: "30%"}}>
                        <h3>Добавить запись</h3>
                        <input
                            type="text"
                            placeholder="Предмет"
                            name="subject"
                            value={newEntry.subject}
                            onChange={(e) => setNewEntry((prev) => ({...prev, subject: e.target.value}))}
                        />
                        <input
                            type="text"
                            placeholder="Аудитория"
                            name="classroom"
                            value={newEntry.classroom}
                            onChange={(e) => setNewEntry((prev) => ({...prev, classroom: e.target.value}))}
                        />
                        <input
                            type="time"
                            placeholder="Время начала"
                            name="startTime"
                            value={newEntry.startTime}
                            onChange={(e) => setNewEntry((prev) => ({...prev, startTime: e.target.value}))}
                        />
                        <input
                            type="time"
                            placeholder="Время окончания"
                            name="endTime"
                            value={newEntry.endTime}
                            onChange={(e) => setNewEntry((prev) => ({...prev, endTime: e.target.value}))}
                        />
                        <select
                            type="text"
                            placeholder="День"
                            name="day"
                            value={newEntry.day}
                            onChange={(e) => setNewEntry((prev) => ({...prev, day: e.target.value}))}
                        >
                            <option value="Понедельник">Понедельник</option>
                            <option value="Вторник">Вторник</option>
                            <option value="Среда">Среда</option>
                            <option value="Четверг">Четверг</option>
                            <option value="Пятница">Пятница</option>
                            <option value="Суббота">Суббота</option>

                        </select>
                        <label>
                            Числитель
                            <input
                                type="checkbox"
                                name="isNumerator"
                                checked={newEntry.isNumerator}
                                onChange={(e) => setNewEntry((prev) => ({...prev, isNumerator: e.target.checked}))}
                            />
                        </label>
                        <label>
                            Знаменатель
                            <input
                                type="checkbox"
                                name="isDenominator"
                                checked={newEntry.isDenominator}
                                onChange={(e) => setNewEntry((prev) => ({...prev, isDenominator: e.target.checked}))}
                            />
                        </label>
                        <button onClick={handleAddEntry} id="LrRateChangeButton"
                                style={{
                                    textAlign: "center",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer"
                                }}>Добавить запись
                        </button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ScheduleTable;
