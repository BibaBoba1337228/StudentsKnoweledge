import '../styles/CourseDetail.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate, useLoaderData, useParams} from 'react-router-dom';
import CourseElement from "../components/CoursePage/CourseElement";
import React, {useEffect, useState} from "react";
import ProfileIcon from "../assets/icons/profile_icon.svg";
import SearchIcon from "../assets/icons/search.svg";
import Chats from "../assets/images/profile.svg";
import Cross from '../assets/icons/cross.svg'
import CheckBoxUncheckedIcon from '../assets/icons/unchecked_checkbox.svg'
import CheckBoxСheckedIcon from '../assets/icons/checked_checkbox.svg'
import {ClipLoader} from "react-spinners";
import {fetchWithAuth} from "../api/fetchWithAuth";


function MyCourses() {


    const data = useLoaderData();
    console.log(data)
    const {courseId} = useParams(); // Получаем courseId из URL

    const navigate = useNavigate();

    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [sections, setSections] = useState(data || []);
    const [sectionName, setSectionName] = useState('');


    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
    const [courseTeachers, setCourseTeachers] = useState([]);

    const [groups, setGroups] = useState([]);
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [selectedGroupsIds, setSelectedGroupsIds] = useState([]);
    const [courseGroups, setCourseGroups] = useState([]);

    const formatTeacherName = (middleName, name, lastName) => {
        const middleInitial = middleName ? middleName : '';
        const nameInitial = name ? `${name.charAt(0)}.` : '';
        const lastNameInitial = lastName ? `${lastName.charAt(0)}.` : '';

        return `${middleInitial} ${nameInitial} ${lastNameInitial}`.trim();
    };


    const handleAddButtonClickTeachers = () => {
        if (showCheckboxes) {
            // Если чекбоксы уже показаны, закрыть модалку
            setIsTeachersOpen(false);
            setShowCheckboxes(false);
        } else {
            // Показать чекбоксы
            setShowCheckboxes(true);
        }
    };

    const handleAddButtonClickGroups = () => {
        if (showCheckboxes) {
            // Если чекбоксы уже показаны, закрыть модалку
            setIsGroupsOpen(false);
            setShowCheckboxes(false);
        } else {
            // Показать чекбоксы
            setShowCheckboxes(true);
        }
    };

    const WipeAll = () => {
        setIsTeachersOpen(false);
        setShowCheckboxes(false);
        setIsGroupsOpen(false);
        setIsSectionOpen(false);
    }

    const fetchCourseTeachers = async () => {
        setLoadingTeachers(true);
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/Teachers`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить преподавателей курса");
            }
            const teachersData = await response.json();
            setCourseTeachers(teachersData); // Загружаем преподавателей, которые уже есть в курсе
        } catch (error) {
            console.error(error);
            alert("Ошибка при загрузке преподавателей курса");
        } finally {
            setLoadingTeachers(false);
        }
    };

    const fetchCourseGroups = async () => {
        setLoadingTeachers(true);
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/Groups`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить группы курса");
            }
            const groupsData = await response.json();
            setCourseGroups(groupsData);
        } catch (error) {
            console.error(error);
            alert("Ошибка при загрузке групп курса");
        } finally {
            setLoadingGroups(false);
        }
    };

    // Запрос на всех преподавателей для добавления (второй GET запрос)
    const fetchAllGroups = async () => {
        setLoadingTeachers(true);
        try {
            const response = await fetchWithAuth('https://localhost:7065/api/Group');
            if (!response.ok) {
                throw new Error("Не удалось загрузить все группы");
            }

            const allGroups = await response.json();

            const filteredGroups = allGroups.filter((group) =>
                !courseGroups.some((courseGroup) => courseGroup.id === group.id)
            );

            setGroups(filteredGroups);
        } catch (error) {
            console.error(error);
            alert("Ошибка при загрузке преподавателей");
        } finally {
            setLoadingGroups(false);
        }
    };

    // Запрос на всех преподавателей для добавления (второй GET запрос)
    const fetchAllTeachers = async () => {
        setLoadingTeachers(true);
        try {
            const response = await fetchWithAuth('https://localhost:7065/api/Teacher');
            if (!response.ok) {
                throw new Error("Не удалось загрузить всех преподавателей");
            }

            const allTeachers = await response.json();

            const filteredTeachers = allTeachers.filter((teacher) =>
                !courseTeachers.some((courseTeacher) => courseTeacher.id === teacher.id)
            );

            setTeachers(filteredTeachers);
        } catch (error) {
            console.error(error);
            alert("Ошибка при загрузке преподавателей");
        } finally {
            setLoadingTeachers(false);
        }
    };

    // Обработчик выбора преподавателей
    const handleTeacherSelection = (teacherId) => {
        setSelectedTeacherIds((prevIds) => {
            if (prevIds.includes(teacherId)) {
                return prevIds.filter((id) => id !== teacherId);
            } else {
                return [...prevIds, teacherId];
            }
        });
    };

    const handleGroupsSelection = (groupId) => {
        setSelectedGroupsIds((prevIds) => {
            if (prevIds.includes(groupId)) {
                return prevIds.filter((id) => id !== groupId);
            } else {
                return [...prevIds, groupId];
            }
        });
    };

    // Добавление выбранных преподавателей к курсу
    const handleAddTeachers = async () => {
        if (selectedTeacherIds.length === 0) {
            alert("Выберите хотя бы одного преподавателя");
            return;
        }

        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/AddTeachers`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedTeacherIds),
            });


            if (!response.ok) {
                throw new Error("Ошибка при добавлении преподавателей");
            }

            const addedTeachers = await response.json();

            // Обновляем состояние курса с новыми преподавателями
            setCourseTeachers((prevTeachers) => [...prevTeachers, ...addedTeachers]);


            // Закрытие модалки после успешного добавления
            setIsTeachersOpen(false);
            setSelectedTeacherIds([]); // Очистить выбранные ID
        } catch (error) {
            console.error("Ошибка при добавлении преподавателей:", error);
            alert("Не удалось добавить преподавателей. Попробуйте снова.");
        }
    };

    const handleAddGroups = async () => {
        if (selectedGroupsIds.length === 0) {
            alert("Выберите хотя бы одну группу");
            return;
        }

        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/AddGroups`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedGroupsIds),
            });


            if (!response.ok) {
                throw new Error("Ошибка при добавлении групп");
            }

            const addedGroups = await response.json();

            // Обновляем состояние курса с новыми преподавателями
            setCourseGroups((prevGroups) => [...prevGroups, ...addedGroups]);


            // Закрытие модалки после успешного добавления
            setIsGroupsOpen(false);
            setSelectedGroupsIds([]); // Очистить выбранные ID
        } catch (error) {
            console.error("Ошибка при добавлении групп:", error);
            alert("Не удалось добавить группы. Попробуйте снова.");
        }
    };

    // Загружаем преподавателей курса при первом рендере
    useEffect(() => {
        fetchCourseTeachers();
    }, [courseId]);

    useEffect(() => {
        fetchCourseGroups();
    }, [courseId]);

    const handleAddSection = async () => {
        if (!sectionName.trim()) {
            alert("Введите название раздела");
            return;
        }

        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/Sections`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: sectionName}),
            });

            if (!response.ok) {
                throw new Error("Ошибка при добавлении раздела");
            }

            const newSection = await response.json();
            setSections((prevSections) => [...prevSections, newSection]);
            setSectionName('');
            setIsSectionOpen(false);
        } catch (error) {
            console.log(error);
            console.error("Ошибка при отправке запроса:", error);
            alert("Не удалось добавить раздел. Попробуйте снова.");
        }
    };

    const handleRemoveTeacher = async (teacherId) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/RemoveTeacher/${teacherId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении преподавателя");
            }

            // Удаление преподавателя из текущего списка
            setCourseTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher.id !== teacherId));

        } catch (error) {
            console.error("Ошибка при удалении преподавателя:", error);
            alert("Не удалось удалить преподавателя. Попробуйте снова.");
        }
    };

    const handleRemoveGroup = async (groupId) => {
        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/RemoveGroup/${groupId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении группы");
            }

            // Удаление преподавателя из текущего списка
            setCourseGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId));

        } catch (error) {
            console.error("Ошибка при удалении группы:", error);
            alert("Не удалось удалить группу. Попробуйте снова.");
        }
    };


    return (
        <div id="CourceDetailWrapper">


            <div id="CourceDetailContainer">

                <div id="CourceDetailHeaderContainer">

                    <div id="CourceDetailHeader">Технологии программирования</div>
                    <div id="CourceDetailDelimiter"></div>
                </div>

                <div id="CourceDetailCourceContainer">

                    <div id="CourceDetailButtonsContainer">

                        <button id="CourceDetailTeachersButton" onClick={() => {
                            setIsTeachersOpen(true);
                            fetchCourseTeachers();
                        }}
                                style={{cursor: "pointer"}}>Преподаватели
                        </button>
                        <button id="CourceDetailGroupsButton" onClick={() => {
                            setIsGroupsOpen(true);
                            fetchCourseGroups()
                        }}
                                style={{cursor: "pointer"}}>Группы
                        </button>
                        <button id="CourceDetailWorkButton"
                                onClick={() => navigate('/system/course/answers')}
                                style={{cursor: "pointer"}}>Работы
                        </button>
                        <button id="CourceDetailEventsButton" onClick={() => navigate('/system/course/events')}
                                style={{cursor: "pointer"}}>События
                        </button>
                        <button id="CourceDetailMarksButton" onClick={() => navigate('/system/course/marks')}
                                style={{cursor: "pointer"}}>Успеваемость
                        </button>

                    </div>
                    <CourseElement data={sections} setData={setSections}></CourseElement>

                    <div id="CourceDetailButtonsContainer">

                        <button id="CourceDetailAddButton" onClick={() => setIsSectionOpen(true)}
                                style={{cursor: "pointer"}}>Добавить
                        </button>
                    </div>

                </div>


            </div>

            {isSectionOpen && (
                <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsSectionOpen(false)}>
                    <div id="CourceDetailSectionAddModalContent" onClick={(e) => e.stopPropagation()}>
                        <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                            Название раздела
                        </label>
                        <div id="CourceDetailSectionAddModalInputCourse">
                            <input id="CourceDetailSectionAddModalInputCourseInput"
                                   placeholder="Введите название раздела..."
                                   value={sectionName}
                                   onChange={(e) => setSectionName(e.target.value)}/>
                        </div>

                        <div id="CourseAddSubmit">
                            <button id="CourseAddSubmitButton" onClick={() => {
                                handleAddSection();

                                WipeAll()
                            }}
                                    style={{cursor: "pointer"}}>Добавить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isTeachersOpen && (
                <div id="CourceDetailSectionAddModalOverlay" onClick={() => {
                    setIsTeachersOpen(false);
                    setShowCheckboxes(false); // Очистить чекбоксы при закрытии модалки
                }}>
                    <div id="CourceDetailTeachersAddModalContent" onClick={(e) => e.stopPropagation()}>
                        <div id="MyCourcesHeaderContainer">
                            <div id="CourseTeachersDetailHeaderAndSearchBarContainer">
                                <div id="CourseTeachersHeader">Преподаватели</div>
                                <div id="CourseTeachersSearchBar">
                                    <input id="CourseTeachersSearchBarInput" placeholder="Поиск преподавателя"/>
                                    <img src={SearchIcon} alt="Иконка поиска" style={{width: '15px'}}/>
                                </div>
                            </div>
                            <div id="MyCourcesDelimiter"></div>
                        </div>

                        {!showCheckboxes && (
                            <div id="CourceDetailButtonsContainer">
                                <button
                                    id="CourceDetailAddButton"
                                    style={{cursor: "pointer", backgroundColor: "#fff"}}
                                    onClick={() => {
                                        fetchAllTeachers(); // Загружаем всех преподавателей при нажатии "Добавить"
                                        setShowCheckboxes(true);
                                    }}
                                >
                                    Добавить
                                </button>
                            </div>
                        )}


                        <div id="CourseContactsCourceContainer">
                            {loadingTeachers ? (
                                <div style={{textAlign: "center", marginTop: "20px"}}>
                                    <ClipLoader size={50} color={"#333"}/>
                                </div>
                            ) : (
                                <>

                                    {!showCheckboxes && (
                                        courseTeachers.map((teacher) => (
                                            <div key={teacher.id} className="CourseContactsInfoBlockWithChatsImage">
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    width: "100%",
                                                    height: '100%',
                                                }}>
                                                    <div style={{
                                                        width: '80px',
                                                        height: "120px",
                                                        backgroundImage: `url(https://localhost:7065/${teacher.profilePictureUrl})`,
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}/>
                                                    <div className="CourseContactsTextBlockWithChatsImage">
                                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                                             onClick={() => navigate(`/system/profile/${teacher.id}`)}
                                                             style={{cursor: "pointer"}}>
                                                            {formatTeacherName(teacher.middleName, teacher.name, teacher.lastName)}
                                                        </div>
                                                        <img
                                                            src={Cross}
                                                            alt="Крестик"
                                                            style={{cursor: "pointer"}}
                                                            onClick={() => handleRemoveTeacher(teacher.id)} // Удаление при клике на крестик
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}


                                    {showCheckboxes && teachers.map((teacher) => (
                                        <div key={teacher.id} className="CourseContactsInfoBlockWithChatsImage">
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: "100%"
                                            }}>
                                                <div style={{
                                                    width: '80px',
                                                    height: "120px",
                                                    backgroundImage: `url(https://localhost:7065/${teacher.profilePictureUrl})`,
                                                    backgroundSize: 'contain',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                }}/>
                                                <div className="CourseContactsTextBlockWithChatsImage">
                                                    <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                                         onClick={() => navigate('/system/profile/profileid')}
                                                         style={{cursor: "pointer"}}>
                                                        {teacher.name}
                                                    </div>
                                                    <label className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTeacherIds.includes(teacher.id)}
                                                            onChange={() => handleTeacherSelection(teacher.id)}
                                                        />
                                                        <span className="custom-checkbox-icon"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {showCheckboxes && (
                            <div id="CourceDetailButtonsContainer">
                                <button
                                    id="CourceDetailAddButton"
                                    onClick={() => {
                                        handleAddTeachers();

                                        WipeAll()
                                    }}
                                    style={{cursor: "pointer", backgroundColor: "#fff"}}
                                >
                                    Добавить
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {isGroupsOpen && (
                <div id="CourceDetailSectionAddModalOverlay" onClick={() => {
                    setIsGroupsOpen(false);
                    setShowCheckboxes(false); // Очистить чекбоксы при закрытии модалки
                }}>
                    <div id="CourceDetailTeachersAddModalContent" onClick={(e) => e.stopPropagation()}>
                        <div id="MyCourcesHeaderContainer">

                            <div id="CourseTeachersDetailHeaderAndSearchBarContainer">
                                <div id="CourseTeachersHeader">Группы</div>
                                <div id="CourseTeachersSearchBar">
                                    <input id="CourseTeachersSearchBarInput" placeholder="Поиск группы"/>
                                    <img src={SearchIcon} alt="Иконка поиска" style={{width: '15px'}}/>

                                </div>
                            </div>

                            <div id="MyCourcesDelimiter"></div>
                        </div>

                        {!showCheckboxes && (

                            <div id="CourceDetailButtonsContainer">

                                <button id="CourceDetailAddButton"
                                        style={{cursor: "pointer", backgroundColor: "#fff"}}
                                        onClick={() => {
                                            setShowCheckboxes(true);
                                            fetchAllGroups();
                                        }}>Добавить
                                </button>
                            </div>

                        )}


                        <div id="CourseContactsCourceContainer">
                            {loadingGroups ? (
                                <div style={{textAlign: "center", marginTop: "20px"}}>
                                    <ClipLoader size={50} color={"#333"}/>
                                </div>
                            ) : (
                                <>


                                    {!showCheckboxes && (
                                        courseGroups.map((group) => (

                                            <div className="CourseContactsInfoBlockWithChatsImage"
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    width: "100%"
                                                }}>

                                                    <div className="CourseContactsTextBlockWithChatsImage">
                                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                                             style={{cursor: "pointer"}}>{group.name}
                                                        </div>
                                                        <img
                                                            src={Cross}
                                                            alt="Крестик"
                                                            style={{cursor: "pointer"}}
                                                            onClick={() => handleRemoveGroup(group.id)} // Удаление при клике на крестик
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    )}


                                    {showCheckboxes && groups.map((group) => (
                                        <div className="CourseContactsInfoBlockWithChatsImage"
                                        >
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: "100%"
                                            }}>

                                                <div className="CourseContactsTextBlockWithChatsImage">
                                                    <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                                         style={{cursor: "pointer"}}>{group.name}
                                                    </div>
                                                    <label className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedGroupsIds.includes(group.id)}
                                                            onChange={() => handleGroupsSelection(group.id)}
                                                        />
                                                        <span className="custom-checkbox-icon"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                    {showCheckboxes && (
                                        <div id="CourceDetailButtonsContainer">
                                            <button
                                                id="CourceDetailAddButton"
                                                onClick={() => {
                                                    handleAddGroups();

                                                    WipeAll()
                                                }}
                                                style={{cursor: "pointer", backgroundColor: "#fff"}}
                                            >
                                                Добавить
                                            </button>
                                        </div>
                                    )}


                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MyCourses;
