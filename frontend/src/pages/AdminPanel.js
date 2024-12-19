import '../styles/AdminPanel.css'
import '../styles/fonts.css'
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";
import PencilIcon from '../assets/icons/pencil.svg';
import Cross from '../assets/icons/cross.svg';
import {fetchWithErrorHandling, ErrorHandler, ErrorModal} from "../components/ErrorHandler";
import Double_arrow_mirrored from "../assets/icons/double_arrow_mirrored.svg";
import Double_arrow from "../assets/icons/double_arrow.svg";
import Arrow_mirrored from "../assets/icons/arrow_mirrored.svg";
import Arrow from "../assets/icons/arrow.svg";


function AdminPanel() {


    const [currentTable, setCurrentTable] = useState("Преподаватели");
    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isStudentsOpen, setIsStudentsOpen] = useState(false);

    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const itemsPerPageRef = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const [courseName, setCourseName] = useState("");
    const [semester, setSemester] = useState(1);
    const [groupName, setGroupName] = useState("");

    const [error, setError] = useState(null);
    const errorHandler = new ErrorHandler(setError);

    useEffect(() => {
        errorHandler.setErrorCallback(setError);

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
        setSelectedCourseId(course.id);
        setIsEditMode(true);
        setIsCourseOpen(true);
    };

    const handleAddCourse = () => {
        setCourseName("");
        setSemester(1);
        setIsEditMode(false);
        setIsCourseOpen(true);
    };

    const handleEditGroup = (group) => {
        setSelectedGroupId(group.id);
        setGroupName(group.name);
        setIsEditMode(true);
        setIsGroupsOpen(true);
    };


    useEffect(() => {
        switch (currentTable) {
            case "Курсы":
                GetData("Курсы");
                break;
            case "Группы":
                GetData("Группы");
                break;
            case "Преподаватели":
                GetData("Преподаватели");
                break;
            case "Студенты":
                GetData("Студенты");
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
                GetGroups();
                setIsStudentsOpen(true);
                break;
        }

    };

    const handleCloseTeacherModal = () => {
        setIsTeachersOpen(false);
        setIsEditMode(false);
        setTeacherData({});
        setSelectedTeacherId(null);
    };

    const handleCloseStudentModal = () => {
        setIsStudentsOpen(false);
        setIsEditMode(false);
        setStudentData({});
        setSelectedStudentId(null);
    };

    const handleCloseCourseModal = () => {
        setIsCourseOpen(false);
        setIsEditMode(false);
        setCourseName("");
        setSemester(1);
        setSelectedCourseId(null);
    };

    const handleCloseGroupModal = () => {
        setIsGroupsOpen(false);
        setIsEditMode(false);
        setGroupName("");
        setSelectedGroupId(null);
    };


    const getSemesterText = (semester) => {
        const year = Math.ceil(semester / 2);
        const sem = semester % 2 === 0 ? "лето" : "осень";
        return `${year} курс ${semester} семестр`;
    };

    const GetGroups = async () => {
        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Group/`,
            {method: "GET", credentials: "include"},
            (groups) => setGroups(groups),
            errorHandler
        );
    };


    const GetData = async (currentTable) => {

        let url = "";
        switch (currentTable) {
            case "Курсы":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Course/paginated?page=1&limit=${itemsPerPage}`;
                break;
            case "Группы":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Group/paginated?page=1&limit=${itemsPerPage}`;
                break;
            case "Преподаватели":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Teacher/paginated?page=1&limit=${itemsPerPage}`;
                break;
            case "Студенты":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Student/paginated?page=1&limit=${itemsPerPage}`;
                break;
        }

        if (url !== "") {
            setCurrentPage(1);
            const responseData = await fetchWithErrorHandling(
                url,
                {method: "GET", credentials: "include"},
                null,
                errorHandler
            );
            setData(responseData.data);
            setTotalCount(responseData.totalCount);
            setTotalPages(Math.ceil(responseData.totalCount / Number(itemsPerPageRef.current.value)) || 1)

        }
    }


    const paginate = async (pageNumber, pageSize) => {
        let url = "";
        switch (currentTable) {
            case "Курсы":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Course/paginated`;
                break;
            case "Группы":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Group/paginated`;
                break;
            case "Преподаватели":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Teacher/paginated`;
                break;
            case "Студенты":
                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Student/paginated`;
                break;
        }
        url = `${url}?page=${pageNumber}&limit=${pageSize}`
        if (url !== "") {
            const responseData = await fetchWithErrorHandling(
                url,
                {method: "GET", credentials: "include"},
                null,
                errorHandler
            );
            setData(responseData.data);
            setTotalCount(responseData.totalCount);
            setTotalPages(Math.ceil(responseData.totalCount / Number(itemsPerPageRef.current.value)) || 1)
            setCurrentPage(pageNumber);
        }
    }

    const handleItemsPerPageChange = async (e) => {
        setItemsPerPage(Number(itemsPerPageRef.current.value));
        await paginate(currentPage, Number(itemsPerPageRef.current.value));
        setTotalPages(Math.ceil(totalCount / Number(itemsPerPageRef.current.value)) || 1)

    };

    const DeleteEntity = async (entityType, entityId, setter) => {
        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/${entityType}/${entityId}`,
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
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Course`,  // Эндпоинт для добавления нового курса
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            },
            (addedCourse) => {
                setData((prevCources) => [...prevCources, addedCourse]);
            },
            errorHandler
        );
    };


    const UpdateCourse = async () => {
        const updatedCourse = {
            name: courseName,
            semester: semester,
        };


        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Course/${selectedCourseId}`,  // Эндпоинт для обновления существующего курса
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCourse),
            },
            (course) => {
                setData((prevCources) =>
                    prevCources.map((c) => (c.id === course.id ? course : c))
                );
                setIsEditMode(false);
                setCourseName("");
                setSelectedCourseId(null);
            },
            errorHandler
        );
    };


    const AddGroup = async () => {
        const body = {
            name: groupName,
        };

        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Group/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
            (newGroup) => {
                setData((prevGroups) => [...prevGroups, newGroup]);
            },
            errorHandler
        );
    };

    const UpdateGroup = async () => {
        const updatedGroup = {id: selectedGroupId, name: groupName};
        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Group/${selectedGroupId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedGroup),
            },
            (updatedGroupData) => {

                setData((prevGroups) =>
                    prevGroups.map((group) =>
                        group.id === selectedGroupId ? {...group, name: updatedGroup.name} : group
                    )
                );
                setIsEditMode(false);
                setGroupName("");
                setSelectedGroupId(null);
            },
            errorHandler
        );
    };


    const AddTeacher = async () => {
        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Teacher/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherData),
            },
            (newTeacher) => {
                setData((prevTeachers) => [...prevTeachers, newTeacher]);
            },
            errorHandler
        );
    };

    const UpdateTeacher = async () => {
        const updatedTeacher = {id: selectedTeacherId, ...teacherData};
        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Teacher/${selectedTeacherId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTeacher),
            },
            (updatedTeacherData) => {
                setData((prevTeachers) =>
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

        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Student/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            },
            (newStudent) => {
                setData((prevStudents) => [...prevStudents, newStudent]);
            },
            errorHandler
        );
    };

    const UpdateStudent = async () => {
        const updatedStudent = {id: selectedStudentId, ...studentData};

        await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Student/${selectedStudentId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudent),
            },
            (updatedStudentData) => {
                setData((prevStudents) =>
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
                            GetData("Курсы");
                            setCurrentTable("Курсы");
                        }}>Курсы
                        </button>
                        <button id="AdminGroupsButton"
                                style={{cursor: "pointer"}} onClick={() => {
                            GetData("Группы");
                            setCurrentTable("Группы");
                        }}>Группы
                        </button>
                        <button id="AdminTeachersButton"

                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    GetData("Преподаватели");
                                    setCurrentTable("Преподаватели");
                                }}>Преподаватели
                        </button>
                        <button id="AdminStudentsButton"
                                style={{cursor: "pointer"}} onClick={() => {
                            GetData("Студенты");
                            setCurrentTable("Студенты");
                        }}>Студенты
                        </button>
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

                            {data?.map(course => (
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
                                                 onClick={() => DeleteEntity("Course", course.id, setData)}/>
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

                            {data?.map(group => (
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
                                                 onClick={() => DeleteEntity("Group", group.id, setData)}/>
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
                            {data?.map(teacher => (
                                <tr key={teacher.id}>
                                    <td id="AdminTableTd">{teacher.id}</td>
                                    <td id="AdminTableTd">{teacher.userName}</td>
                                    <td id="AdminTableTd">{teacher.lastName}</td>
                                    <td id="AdminTableTd">{teacher.name}</td>
                                    <td id="AdminTableTd">{teacher.middleName}</td>
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
                                                onClick={() => DeleteEntity("Teacher", teacher.id, setData)}
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

                            {data?.map(student => (
                                <tr key={student.id}>
                                    <td id="AdminTableTd">{student.id}</td>
                                    <td id="AdminTableTd">{student.userName}</td>
                                    <td id="AdminTableTd">{student.middleName}</td>
                                    <td id="AdminTableTd">{student.name}</td>
                                    <td id="AdminTableTd">{student.lastName}</td>
                                    <td id="AdminTableTd">{student.group?.name}</td>
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
                                                 onClick={() => DeleteEntity("Student", student.id, setData)}/>
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
                    <div className="AdminPanel-pagination-wrapper">
                        <div className="AdminPanel-pagination">
                            <button
                                onClick={() => paginate(1, itemsPerPage)}
                                className={currentPage === 1 ? 'AdminPanel-page active' : 'AdminPanel-page'}
                                disabled={currentPage === 1}
                            >
                                <img src={Double_arrow} width="20px" height="20px"/>
                            </button>
                            <button
                                onClick={() => paginate(currentPage - 1, itemsPerPage)}
                                className={currentPage === 1 ? 'AdminPanel-page active' : 'AdminPanel-page'}
                                disabled={currentPage === 1}
                            >
                                <img src={Arrow_mirrored} width="20px" height="20px"/>
                            </button>
                            <div>
                                Страница {currentPage} из {totalPages}
                            </div>
                            <button
                                onClick={() => paginate(currentPage + 1, itemsPerPage)}
                                className={currentPage === totalPages ? 'AdminPanel-page active' : 'AdminPanel-page'}
                                disabled={currentPage === totalPages}
                            >
                                <img src={Arrow} width="20px" height="20px"/>
                            </button>
                            <button
                                onClick={() => paginate(totalPages, itemsPerPage)}
                                className={currentPage === totalPages ? 'AdminPanel-page active' : 'AdminPanel-page'}
                                disabled={currentPage === totalPages}
                            >
                                <img src={Double_arrow_mirrored} width="20px" height="20px"/>
                            </button>
                        </div>


                        <div className="AdminPanel-items-per-page">
                            Отобразить на странице:
                            <select onChange={handleItemsPerPageChange} value={itemsPerPage} ref={itemsPerPageRef}>
                                <option value={12}>12</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

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
                                            isEditMode ? UpdateCourse() : AddCourse();
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
                                            isEditMode ? UpdateGroup() : AddGroup();
                                            setIsGroupsOpen(false);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        {isEditMode ? "Изменить" : "Добавить"}
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
                                            isEditMode ? UpdateTeacher() : AddTeacher();
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
                                                value={studentData[field]}
                                                onChange={(e) => handleStudentInputChange(field, e.target.value)}
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
                                        value={studentData.groupId || 1}
                                        onChange={(e) =>
                                            setStudentData((prevData) => ({
                                                ...prevData,
                                                groupId: Number(e.target.value),
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
