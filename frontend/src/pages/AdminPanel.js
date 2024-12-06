import '../styles/AdminPanel.css'
import '../styles/fonts.css'
import {useNavigate} from 'react-router-dom';
import SearchIcon from '../assets/icons/search.svg'
import React, {useEffect, useState} from "react";
import PencilIcon from '../assets/icons/pencil.svg'
import Cross from '../assets/icons/cross.svg'
import {fetchWithErrorHandling, ErrorHandler, ErrorModal} from "../components/ErrorHandler";


function AdminPanel() {
    const navigate = useNavigate();

    const [currentTable, setCurrentTable] = useState("Курсы");
    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isStudentsOpen, setIsStudentsOpen] = useState(false);

    const [cources, setCources] = useState([]);
    const [groups, setGroups] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    const [isEditMode, setIsEditMode] = useState(false);  // Для проверки, в режиме ли редактирования

    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const [courseName, setCourseName] = useState("");
    const [semester, setSemester] = useState(1);


    const [groupName, setGroupName] = useState("");

    const [error, setError] = useState(null); // Состояние для ошибки
    const errorHandler = new ErrorHandler(setError);

    useEffect(() => {
        errorHandler.setErrorCallback(setError); // Передаем setError в errorHandler

    }, []);


    const closeErrorModal = () => {
        setError(null); // Закрытие модального окна
    };


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
        groupId: 1
    });


    const handleTeacherInputChange = (field, value) => {
        setTeacherData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleStudentInputChange = (field, value) => {
        setStudentData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEditCourse = (course) => {
        setCourseName(course.name);
        setSemester(course.semester);
        setSelectedCourseId(course.id);  // Сохраняем ID выбранного курса
        setIsEditMode(true);  // Переводим в режим редактирования
        setIsCourseOpen(true);  // Открываем модальное окно
    };

    const handleAddCourse = () => {
        setCourseName("");
        setSemester(1);
        setIsEditMode(false);  // Переводим в режим добавления
        setIsCourseOpen(true);  // Открываем модальное окно
    };

    const handleEditGroup = (group) => {
        setSelectedGroupId(group.id); // Устанавливаем id группы
        setGroupName(group.name); // Заполняем название группы
        setIsEditMode(true); // Включаем режим редактирования
        setIsGroupsOpen(true); // Открываем модальное окно
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
                GetStudents();
                GetGroups();
                setIsStudentsOpen(true);
                break;
        }

    };

    const handleCloseTeacherModal = () => {
        setIsTeachersOpen(false); // Закрываем модальное окно
        setIsEditMode(false); // Сбрасываем режим редактирования
        setTeacherData({}); // Очищаем данные преподавателя
        setSelectedTeacherId(null); // Очищаем выбранный id преподавателя
    };

    const handleCloseStudentModal = () => {
        setIsStudentsOpen(false); // Закрываем модальное окно
        setIsEditMode(false); // Сбрасываем режим редактирования
        setStudentData({}); // Очищаем данные преподавателя
        setSelectedStudentId(null); // Очищаем выбранный id преподавателя
    };

    const handleCloseCourseModal = () => {
        setIsCourseOpen(false); // Закрываем модальное окно
        setIsEditMode(false); // Сбрасываем режим редактирования
        setCourseName(""); // Очищаем данные курса
        setSemester(1); // Сбрасываем значение семестра
        setSelectedCourseId(null); // Очищаем выбранный id курса
    };

    const handleCloseGroupModal = () => {
        setIsGroupsOpen(false); // Закрываем модальное окно
        setIsEditMode(false); // Сбрасываем режим редактирования
        setGroupName(""); // Очищаем данные группы
        setSelectedGroupId(null); // Очищаем выбранный id группы
    };


    const getSemesterText = (semester) => {
        const year = Math.ceil(semester / 2); // Год будет определяться через округление вверх, т.к. на каждом курсе 2 семестра
        const sem = semester % 2 === 0 ? "лето" : "осень"; // Если четное число, то лето, если нечетное - осень
        return `${year} курс ${semester} семестр`;
    };

    useEffect(() => {
        if (isStudentsOpen) {
            GetGroups(); // Функция для загрузки списка групп
        }
    }, [isStudentsOpen]);


    const GetCourses = async () => {
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Course/",
            {method: "GET", credentials: "include"},
            (courses) => setCources(courses),
            errorHandler
        );
    };

    const GetGroups = async () => {
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Group/",
            {method: "GET", credentials: "include"},
            (groups) => setGroups(groups),
            errorHandler
        );
    };

    const GetTeachers = async () => {
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Teacher/",
            {method: "GET", credentials: "include"},
            (teachers) => setTeachers(teachers),
            errorHandler
        );
    };

    const GetStudents = async () => {
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Student/",
            {method: "GET", credentials: "include"},
            (students) => setStudents(students),
            errorHandler
        );
    };

    const DeleteEntity = async (entityType, entityId, setter) => {
        await fetchWithErrorHandling(
            `https://localhost:7065/api/${entityType}/${entityId}`,
            {
                method: "DELETE",
                credentials: "include",
            },
            () => setter((prev) => prev.filter((entity) => entity.id !== entityId)),
            errorHandler
        );
    };

    const AddCourse = async () => {
        const newCourse = {
            name: courseName,
            semester: semester,
        };

        await fetchWithErrorHandling(
            "https://localhost:7065/api/Course",  // Эндпоинт для добавления нового курса
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            },
            (addedCourse) => {
                setCources((prevCources) => [...prevCources, addedCourse]);
                // Закрыть модальное окно
            },
            errorHandler
        );
    };


    const UpdateCourse = async () => {
        const updatedCourse = {
            name: courseName,
            semester: semester,
        };

        console.log("Выбранный ID", selectedCourseId)

        await fetchWithErrorHandling(
            `https://localhost:7065/api/Course/${selectedCourseId}`,  // Эндпоинт для обновления существующего курса
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCourse),
            },
            (course) => {
                setCources((prevCources) =>
                    prevCources.map((c) => (c.id === course.id ? course : c))
                );
                // Закрыть модальное окно
                setIsEditMode(false); // Отключаем режим редактирования
                setCourseName(""); // Сбрасываем поле ввода
                setSelectedCourseId(null); // Сбрасываем id выбранной группы
            },
            errorHandler
        );
    };


    const AddGroup = async () => {
        const body = {
            name: groupName,
        };

        await fetchWithErrorHandling(
            "https://localhost:7065/api/Group/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
            (newGroup) => {
                setGroups((prevGroups) => [...prevGroups, newGroup]);
                // Закрыть модальное окно
            },
            errorHandler
        );
    };

    const UpdateGroup = async () => {
        const updatedGroup = {id: selectedGroupId, name: groupName};
        await fetchWithErrorHandling(
            `https://localhost:7065/api/Group/${selectedGroupId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedGroup),
            },
            (updatedGroupData) => {
                // Обновляем данные в списке групп после успешного обновления
                setGroups((prevGroups) =>
                    prevGroups.map((group) =>
                        group.id === selectedGroupId ? {...group, name: updatedGroup.name} : group
                    )
                );
                setIsEditMode(false); // Отключаем режим редактирования
                setGroupName(""); // Сбрасываем поле ввода
                setSelectedGroupId(null); // Сбрасываем id выбранной группы
            },
            errorHandler
        );
    };


    const AddTeacher = async () => {
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Teacher/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherData),
            },
            (newTeacher) => {
                setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
                // Закрыть модальное окно
            },
            errorHandler
        );
    };

    const UpdateTeacher = async () => {
        const updatedTeacher = {id: selectedTeacherId, ...teacherData};
        await fetchWithErrorHandling(
            `https://localhost:7065/api/Teacher/${selectedTeacherId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTeacher),
            },
            (updatedTeacherData) => {
                setTeachers((prevTeachers) =>
                    prevTeachers.map((teacher) =>
                        teacher.id === selectedTeacherId ? updatedTeacherData : teacher
                    )
                );
                setIsTeachersOpen(false);
                setIsEditMode(false);
                setTeacherData({});
                setSelectedTeacherId(null);
            },
            errorHandler
        );
    };

    const AddStudent = async () => {

        console.log(studentData, "Студент на добавление")
        await fetchWithErrorHandling(
            "https://localhost:7065/api/Student/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            },
            (newStudent) => {
                setStudents((prevStudents) => [...prevStudents, newStudent]);
                // Закрыть модальное окно
            },
            errorHandler
        );
    };

    const UpdateStudent = async () => {
        const updatedStudent = {id: selectedStudentId, ...studentData};

        console.log("Обновленный студент", updatedStudent);
        await fetchWithErrorHandling(
            `https://localhost:7065/api/Student/${selectedStudentId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudent),
            },
            (updatedStudentData) => {
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === selectedStudentId ? updatedStudentData : student
                    )
                );
                setIsStudentsOpen(false);
                setIsEditMode(false);
                setStudentData({});
                setSelectedStudentId(null);
            },
            errorHandler
        );
    };


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
                                            <img src={PencilIcon}
                                                 style={{width: '20px', marginRight: '25px', cursor: "pointer"}}
                                                 onClick={() => handleEditCourse(course)}/>
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
                                            <img src={PencilIcon}
                                                 style={{width: '20px', marginRight: '25px', cursor: "pointer"}}
                                                 onClick={() => handleEditGroup(group)}/>
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
                                            <img
                                                src={PencilIcon}
                                                style={{width: '20px', marginRight: '25px', cursor: "pointer"}}
                                                onClick={() => {
                                                    setIsEditMode(true);
                                                    setTeacherData({
                                                        userName: teacher.userName,
                                                        mail: teacher.mail,
                                                        name: teacher.name,
                                                        lastName: teacher.lastName,
                                                        middleName: teacher.middleName,
                                                        phone: teacher.phone,
                                                        password: teacher.password,
                                                    });
                                                    setSelectedTeacherId(teacher.id);
                                                    setIsTeachersOpen(true);
                                                }}
                                            />
                                            <img
                                                src={Cross}
                                                style={{width: '20px', marginRight: '5px', cursor: "pointer"}}
                                                onClick={() => DeleteEntity("Teacher", teacher.id, setTeachers)}
                                            />
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
                                            <img src={PencilIcon}
                                                 style={{width: '20px', marginRight: '25px', cursor: "pointer"}}
                                                 onClick={() => {
                                                     setIsEditMode(true);
                                                     setStudentData({
                                                         userName: student.userName,
                                                         mail: student.mail,
                                                         name: student.name,
                                                         lastName: student.lastName,
                                                         middleName: student.middleName,
                                                         phone: student.phone,
                                                         password: student.password,
                                                         groupId: student.groupId,

                                                     });

                                                     setSelectedStudentId(student.id);
                                                     setIsStudentsOpen(true);
                                                 }}/>
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
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => handleCloseCourseModal()}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>Название
                                    курса</label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input
                                        id="CourceDetailSectionAddModalInputCourseInput"
                                        placeholder="Введите название курса..."
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                    />
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
                                    <button
                                        id="CourseAddSubmitButton"
                                        onClick={() => {
                                            isEditMode ? UpdateCourse() : AddCourse();  // В зависимости от режима добавляем или обновляем курс
                                            setIsCourseOpen(false);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        {isEditMode ? "Изменить" : "Добавить"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {isGroupsOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => handleCloseGroupModal()}
                             style={{zIndex: 999}}>
                            <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Название группы
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input
                                        id="CourceDetailSectionAddModalInputCourseInput"
                                        placeholder="Введите название группы..."
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                    />
                                </div>

                                <div id="CourseAddSubmit">
                                    <button
                                        id="CourseAddSubmitButton"
                                        onClick={() => {
                                            isEditMode ? UpdateGroup() : AddGroup();  // В зависимости от режима вызываем нужную функцию
                                            setIsGroupsOpen(false);  // Закрываем окно после выполнения
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        {isEditMode ? "Изменить" : "Добавить"} {/* Меняем текст кнопки в зависимости от режима */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {isTeachersOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => handleCloseTeacherModal()}
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
                                    <button
                                        id="CourseAddSubmitButton"
                                        onClick={() => {
                                            isEditMode ? UpdateTeacher() : AddTeacher(); // В зависимости от режима добавляем или обновляем преподавателя
                                            setIsTeachersOpen(false);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        {isEditMode ? "Изменить" : "Добавить"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isStudentsOpen && (
                        <div id="CourceDetailSectionAddModalOverlay" onClick={() => handleCloseStudentModal()}
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
                                                value={studentData[field]}  // Используем studentData[field] для каждого поля
                                                onChange={(e) => handleStudentInputChange(field, e.target.value)}  // Обновляем конкретное поле
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
                                        id="CourceDetailSectionAddModalInputCourseInputDropDown"
                                        name="group"
                                        value={studentData.groupId || 1}  // Используем || "" для дефолтного значения
                                        onChange={(e) =>
                                            setStudentData((prevData) => ({
                                                ...prevData,
                                                groupId: Number(e.target.value), // Обновляем groupId корректно
                                            }))
                                        }

                                    >
                                        {groups.map((group) => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div id="CourseAddSubmit">
                                    <button
                                        id="CourseAddSubmitButton"
                                        onClick={() => {
                                            isEditMode ? UpdateStudent() : AddStudent();
                                            setIsStudentsOpen(false);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        {isEditMode ? "Изменить" : "Добавить"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

            </div>

            {error && <ErrorModal errorMessage={error} onClose={closeErrorModal}/>}
        </div>
    );
}

export default AdminPanel;
