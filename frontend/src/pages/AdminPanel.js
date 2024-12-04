import '../styles/AdminPanel.css'
import '../styles/fonts.css'
import {useNavigate} from 'react-router-dom';
import SearchIcon from '../assets/icons/search.svg'
import React, {useEffect, useState} from "react";
import PencilIcon from '../assets/icons/pencil.svg'
import Cross from '../assets/icons/cross.svg'
import {fetchWithAuth} from "../api/fetchWithAuth";


function AdminPanel() {
    useNavigate();
    const [currentTable, setCurrentTable] = useState("Курсы");
    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isStudentsOpen, setIsStudentsOpen] = useState(false);

    const [cources, setCources] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    const [courseName, setCourseName] = useState("");
    const [semester, setSemester] = useState(1);


    const [groupName, setGroupName] = useState("");


    const [teacherData, setTeacherData] = useState({
        userName: "",
        mail: "",
        name: "",
        lastName: "",
        middleName: "",
        phone: "",
        password: "",
    });

    const [studentData, setStudentData] = useState({
        userName: "",
        mail: "",
        name: "",
        lastName: "",
        middleName: "",
        phone: "",
        password: "",
        group: 1
    });


    const handleTeacherInputChange = (field, value) => {
        setTeacherData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    useEffect(() => {
        switch (currentTable) {
            case "Курсы":
                GetCourses();
                break;
            case "Группы":
                GetGroups();
                break;
            case "Преподаватели":
                GetTeachers();
                break;
            case "Студенты":
                GetStudents();
                GetGroups();
                break;
        }

    }, []);


    const OpenAddModal = () => {
        switch (currentTable) {
            case "Курсы":
                setIsCourseOpen(true);
                break;
            case "Группы":
                setIsGroupsOpen(true);
                break;
            case "Преподаватели":
                setIsTeachersOpen(true);
                break;
            case "Студенты":
                setIsStudentsOpen(true);
                break;
        }

    };

    const getSemesterText = (semester) => {
        const year = Math.floor(semester / 2) + 1; // Assuming 2 semesters per year
        const sem = semester % 2 === 0 ? "лето" : "осень"; // Example: autumn or spring
        return `${year} курс ${semester} семестр`;
    };

    async function GetCourses() {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                const courses = await response.json(); // Ожидаем результат
                setCources(courses); // Устанавливаем состояние
                console.log(courses);
                return;
            }

            if (response.status === 401) {
                throw {status: 401, message: "Unauthorized"};
            }

            throw {status: response.status, message: response.statusText};
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert(`Ошибка: ${error.message}`);
        }
    }

    async function GetGroups() {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Group/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                const groups = await response.json(); // Ожидаем результат
                setGroups(groups); // Устанавливаем состояние
                console.log(groups);
                return;
            }

            if (response.status === 401) {
                throw {status: 401, message: "Unauthorized"};
            }

            throw {status: response.status, message: response.statusText};
        } catch (error) {
            console.error("Error fetching groups:", error);
            alert(`Ошибка: ${error.message}`);
        }
    }

    async function GetTeachers() {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Teacher/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                const teachers = await response.json(); // Ожидаем результат
                setTeachers(teachers); // Устанавливаем состояние
                console.log(teachers);
                return;
            }

            if (response.status === 401) {
                throw {status: 401, message: "Unauthorized"};
            }

            throw {status: response.status, message: response.statusText};
        } catch (error) {
            console.error("Error fetching teachers:", error);
            alert(`Ошибка: ${error.message}`);
        }
    }

    async function GetStudents() {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Student/`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                const students = await response.json(); // Ожидаем результат
                setStudents(students); // Устанавливаем состояние
                console.log(students);
                return;
            }

            if (response.status === 401) {
                throw {status: 401, message: "Unauthorized"};
            }

            throw {status: response.status, message: response.statusText};
        } catch (error) {
            console.error("Error fetching students:", error);
            alert(`Ошибка: ${error.message}`);
        }
    }


    async function DeleteEntity(entityType, entityId, setter) {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/${entityType}/${entityId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.status === 200) {
                setter((prev) => prev.filter(entity => entity.id !== entityId));
                return;
            }

            if (response.status === 401) {
                throw {status: 401, message: "Unauthorized"};
            }

            throw {status: response.status, message: response.statusText};
        } catch (error) {
            console.error(`Error deleting ${entityType}:`, error);
            alert(`Ошибка: ${error.message}`);
        }
    }

    async function AddCourse() {
        const body = {
            name: courseName,
            semester: semester,
        };

        try {
            const response = await fetchWithAuth("https://localhost:7065/api/Course/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.status === 201) {
                const newCourse = await response.json();
                setCources((prevCourses) => [...prevCourses, newCourse]); // Add new course to the existing list
                setIsCourseOpen(false); // Close the modal
            } else {
                throw {status: response.status, message: response.statusText};
            }
        } catch (error) {
            console.error("Error adding course:", error);
            alert(`Ошибка при добавлении курса: ${error.message}`);
        }
    }

    async function AddGroup() {
        const body = {
            name: groupName,
        };

        try {
            const response = await fetchWithAuth("https://localhost:7065/api/Group/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.status === 201) {
                const newGroup = await response.json();
                setGroups((prevGroups) => [...prevGroups, newGroup]); // Add new course to the existing list
                setIsCourseOpen(false); // Close the modal
            } else {
                throw {status: response.status, message: response.statusText};
            }
        } catch (error) {
            console.error("Error adding course:", error);
            alert(`Ошибка при добавлении курса: ${error.message}`);
        }
    }

    async function AddTeacher() {
        try {
            const response = await fetchWithAuth("https://localhost:7065/api/Teacher/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherData),
            });

            if (response.status === 200) {
                const newTeacher = await response.json();
                setTeachers((prevTeachers) => [...prevTeachers, newTeacher]); // Добавить нового преподавателя в список
                setIsTeachersOpen(false); // Закрыть модальное окно
            } else {

                console.error("Error adding teacher:", response);
                alert(`Ошибка при добавлении учителя: ${response.body}`);
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
            alert(`Ошибка при добавлении учителя: ${error.message}`);
        }
    }


    return (
        <div id="AdminPanelWrapper">


            <div id="AdminPanelContainer">

                <div id="AdminPanelHeaderContainer">

                    <div id="AdminPanelHeaderAndSearchBarContainer">
                        <div id="AdminPanelHeader">Админ-панель</div>

                    </div>

                    <div id="AdminPanelDelimiter"></div>
                </div>


                <div id="AdminPanelButtonsContainer">

                    <div>
                        <button id="AdminCourseButton"
                                style={{cursor: "pointer"}} onClick={() => {
                            GetCourses();
                            console.log(cources);
                            setCurrentTable("Курсы");
                        }}>Курсы
                        </button>
                        <button id="AdminGroupsButton"
                                style={{cursor: "pointer"}} onClick={() => {
                            GetGroups();
                            console.log(groups);
                            setCurrentTable("Группы");
                        }}>Группы
                        </button>
                        <button id="AdminTeachersButton"

                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    GetTeachers();
                                    console.log(teachers);
                                    setCurrentTable("Преподаватели");
                                }}>Преподаватели
                        </button>
                        <button id="AdminStudentsButton"
                                style={{cursor: "pointer"}} onClick={() => {
                            GetStudents();
                            console.log(students);
                            setCurrentTable("Студенты");
                        }}>Студенты
                        </button>
                    </div>

                    <div id="AdminPanelSearchBar">
                        <input id="AdminPanelSearchBarInput" placeholder="Поиск курса"/>
                        <img src={SearchIcon} alt="Иконка поиска" style={{width: '25px'}}/>

                    </div>

                </div>

                <div id="AdminPanelDelimiter"></div>


                <div id="AdminPanelCourcesCardsContainer">


                    {currentTable === "Курсы" && (
                        <table id="coursetable" style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                        }}>

                            <thead style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#ECE1E1",
                            }}>
                            <tr>
                                <th id="AdminTableTh">ID</th>
                                <th id="AdminTableTh">Название</th>
                                <th id="AdminTableTh">Семестр</th>
                                <th id="AdminTableTh"></th>
                            </tr>
                            </thead>

                            <tbody style={{backgroundColor: '#FFEFEF'}}>

                            {cources.map(course => (
                                <tr key={course.id}>

                                    <td id="AdminTableTd">{course.id}</td>
                                    <td id="AdminTableTd">{course.name}</td>
                                    <td id="AdminTableTd">{getSemesterText(course.semester)}</td>
                                    <td id="AdminTableTd">
                                        <div>
                                            <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                            <img src={Cross}
                                                 style={{width: '20px', marginRight: '5px', cursor: "pointer"}}
                                                 onClick={() => DeleteEntity("Course", course.id, setCources)}/>
                                        </div>
                                    </td>

                                </tr>
                            ))}


                            </tbody>
                        </table>
                    )}


                    {currentTable === "Группы" && (
                        <table id="coursetable" style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                        }}>

                            <thead style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#ECE1E1",
                            }}>
                            <tr>
                                <th id="AdminTableTh">ID</th>
                                <th id="AdminTableTh">Название</th>
                                <th id="AdminTableTh"></th>
                            </tr>
                            </thead>

                            <tbody style={{backgroundColor: '#FFEFEF'}}>

                            {groups.map(group => (
                                <tr key={group.id}>
                                    <td id="AdminTableTd">{group.id}</td>
                                    <td id="AdminTableTd">{group.name}</td>
                                    <td id="AdminTableTd">
                                        <div>
                                            <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                            <img src={Cross}
                                                 style={{width: '20px', marginRight: '5px', cursor: "pointer"}}
                                                 onClick={() => DeleteEntity("Group", group.id, setGroups)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                            </tbody>
                        </table>
                    )}

                    {currentTable === "Преподаватели" && (
                        <table id="coursetable" style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                        }}>

                            <thead style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#ECE1E1",
                            }}>
                            <tr>
                                <th id="AdminTableTh">ID</th>
                                <th id="AdminTableTh">Логин</th>
                                <th id="AdminTableTh">Фамилия</th>
                                <th id="AdminTableTh">Имя</th>
                                <th id="AdminTableTh">Отчество</th>
                                <th id="AdminTableTh"></th>
                            </tr>
                            </thead>

                            <tbody style={{backgroundColor: '#FFEFEF'}}>

                            {teachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td id="AdminTableTd">{teacher.id}</td>
                                    <td id="AdminTableTd">{teacher.userName}</td>
                                    <td id="AdminTableTd">{teacher.middleName}</td>
                                    <td id="AdminTableTd">{teacher.name}</td>
                                    <td id="AdminTableTd">{teacher.lastName}</td>
                                    <td id="AdminTableTd">
                                        <div>
                                            <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                            <img src={Cross}
                                                 style={{width: '20px', marginRight: '5px', cursor: "pointer"}}
                                                 onClick={() => DeleteEntity("Teacher", teacher.id, setTeachers)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    )}

                    {currentTable === "Студенты" && (
                        <table id="coursetable" style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            textAlign: "center",
                        }}>

                            <thead style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "#ECE1E1",
                            }}>
                            <tr>
                                <th id="AdminTableTh">ID</th>
                                <th id="AdminTableTh">Логин</th>
                                <th id="AdminTableTh">Фамилия</th>
                                <th id="AdminTableTh">Имя</th>
                                <th id="AdminTableTh">Отчество</th>
                                <th id="AdminTableTh">Группа</th>
                                <th id="AdminTableTh"></th>
                            </tr>
                            </thead>

                            <tbody style={{backgroundColor: '#FFEFEF'}}>

                            {students.map(student => (
                                <tr key={student.id}>
                                    <td id="AdminTableTd">{student.id}</td>
                                    <td id="AdminTableTd">{student.userName}</td>
                                    <td id="AdminTableTd">{student.middleName}</td>
                                    <td id="AdminTableTd">{student.name}</td>
                                    <td id="AdminTableTd">{student.lastName}</td>
                                    <td id="AdminTableTd">{student.group.name}</td>
                                    <td id="AdminTableTd">
                                        <div>
                                            <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                            <img src={Cross}
                                                 style={{width: '20px', marginRight: '5px', cursor: "pointer"}}
                                                 onClick={() => DeleteEntity("Student", student.id, setStudents)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    )}


                    <div id="AdminPanelButtonsAddContainer">

                        <button id="AdminPanelAddButton" onClick={() => OpenAddModal()}
                                style={{cursor: "pointer"}}>Добавить
                        </button>
                    </div>

                    {isCourseOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsCourseOpen(false)}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Название курса
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите название курса..."
                                           value={courseName}
                                           onChange={(e) => setCourseName(e.target.value)}/>
                                </div>
                                <div style={{padding: "0px"}}>
                                    <label htmlFor="dropdown"
                                           style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                        Семестр
                                    </label>
                                    <select
                                        id="dropdown"
                                        name="dropdown"
                                        placeholder="1 курс 1 семестр"
                                        id="CourceDetailSectionAddModalInputCourseInputDropDown"
                                        value={semester}
                                        onChange={(e) => setSemester(Number(e.target.value))}

                                    >

                                        <option value="1">1 курс 1 семестр</option>
                                        <option value="2">1 курс 2 семестр</option>
                                        <option value="3">2 курс 3 семестр</option>
                                        <option value="4">2 курс 4 семестр</option>
                                        <option value="5">3 курс 5 семестр</option>
                                        <option value="6">3 курс 6 семестр</option>
                                        <option value="7">4 курс 7 семестр</option>
                                        <option value="8">4 курс 8 семестр</option>
                                        <option value="9">5 курс 9 семестр</option>
                                        <option value="10">5 курс 10 семестр</option>
                                        <option value="11">6 курс 11 семестр</option>
                                        <option value="12">6 курс 12 семестр</option>

                                    </select>
                                </div>
                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
                                        AddCourse();
                                        setIsCourseOpen(false);
                                    }}
                                            style={{cursor: "pointer"}}>Добавить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isGroupsOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsGroupsOpen(false)}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Название группы
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите название группы..."
                                           value={groupName}
                                           onChange={(e) => setGroupName(e.target.value)}/>
                                </div>

                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
                                        AddGroup();
                                        setIsGroupsOpen(false);
                                    }}
                                            style={{cursor: "pointer"}}>Добавить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isTeachersOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsTeachersOpen(false)}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                {["userName", "mail", "name", "lastName", "middleName", "phone", "password"].map((field) => (
                                    <div key={field} style={{marginBottom: "10px"}}>
                                        <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                            {field === "userName"
                                                ? "Логин"
                                                : field === "mail"
                                                    ? "Почта"
                                                    : field === "name"
                                                        ? "Имя"
                                                        : field === "lastName"
                                                            ? "Фамилия"
                                                            : field === "middleName"
                                                                ? "Отчество"
                                                                : field === "phone"
                                                                    ? "Телефон"
                                                                    : "Пароль"}
                                        </label>
                                        <div id="CourceDetailSectionAddModalInputCourse">
                                            <input
                                                id="CourceDetailSectionAddModalInputCourseInput"
                                                placeholder={`Введите ${field === "userName"
                                                    ? "логин"
                                                    : field === "mail"
                                                        ? "почту"
                                                        : field === "name"
                                                            ? "имя"
                                                            : field === "lastName"
                                                                ? "фамилию"
                                                                : field === "middleName"
                                                                    ? "отчество"
                                                                    : field === "phone"
                                                                        ? "телефон"
                                                                        : "пароль"}...`}
                                                value={teacherData[field]}
                                                onChange={(e) => handleTeacherInputChange(field, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}


                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
                                        AddTeacher();
                                        setIsTeachersOpen(false);
                                    }}
                                            style={{cursor: "pointer"}}>Добавить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isStudentsOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsStudentsOpen(false)}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                {["userName", "mail", "name", "lastName", "middleName", "phone", "password"].map((field) => (
                                    <div key={field} style={{marginBottom: "10px"}}>
                                        <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                            {field === "userName"
                                                ? "Логин"
                                                : field === "mail"
                                                    ? "Почта"
                                                    : field === "name"
                                                        ? "Имя"
                                                        : field === "lastName"
                                                            ? "Фамилия"
                                                            : field === "middleName"
                                                                ? "Отчество"
                                                                : field === "phone"
                                                                    ? "Телефон"
                                                                    : "Пароль"}
                                        </label>
                                        <div id="CourceDetailSectionAddModalInputCourse">
                                            <input
                                                id="CourceDetailSectionAddModalInputCourseInput"
                                                placeholder={`Введите ${field === "userName"
                                                    ? "логин"
                                                    : field === "mail"
                                                        ? "почту"
                                                        : field === "name"
                                                            ? "имя"
                                                            : field === "lastName"
                                                                ? "фамилию"
                                                                : field === "middleName"
                                                                    ? "отчество"
                                                                    : field === "phone"
                                                                        ? "телефон"
                                                                        : "пароль"}...`}
                                                value={teacherData[field]}
                                                onChange={(e) => handleTeacherInputChange(field, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div style={{padding: "0px"}}>
                                    <label htmlFor="dropdown"
                                           style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                        Группа
                                    </label>
                                    <select
                                        id="group"
                                        name="group"
                                        value={studentData.group}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                group: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Выберите группу</option>
                                        {groups.map((group) => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
                                        setIsStudentsOpen(false);
                                    }}
                                            style={{cursor: "pointer"}}>Добавить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>


        </div>
    );
}

export default AdminPanel;
