import '../styles/AdminPanel.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import SearchIcon from '../assets/icons/search.svg'
import React, {useState} from "react";
import PencilIcon from '../assets/icons/pencil.svg'
import Cross from '../assets/icons/cross.svg'


function AdminPanel() {

    const navigate = useNavigate();

    const [currentTable, setCurrentTable] = useState("Курсы");
    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isStudentsOpen, setIsStudentsOpen] = useState(false);

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
                                style={{cursor: "pointer"}} onClick={() => setCurrentTable("Курсы")}>Курсы
                        </button>
                        <button id="AdminGroupsButton"
                                style={{cursor: "pointer"}} onClick={() => setCurrentTable("Группы")}>Группы
                        </button>
                        <button id="AdminTeachersButton"

                                style={{cursor: "pointer"}}
                                onClick={() => setCurrentTable("Преподаватели")}>Преподаватели
                        </button>
                        <button id="AdminStudentsButton"
                                style={{cursor: "pointer"}} onClick={() => setCurrentTable("Студенты")}>Студенты
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

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">Технологии программирования</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">Технологии программирования</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">Технологии программирования</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

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
                                <th id="AdminTableTh">Семестр</th>
                                <th id="AdminTableTh"></th>
                            </tr>
                            </thead>

                            <tbody style={{backgroundColor: '#FFEFEF'}}>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">1 курс 2 семестр</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

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

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

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

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="AdminTableTd">1</td>
                                <td id="AdminTableTd">User1</td>
                                <td id="AdminTableTd">Бабкевич</td>
                                <td id="AdminTableTd">Андрей</td>
                                <td id="AdminTableTd">Николаевич</td>
                                <td id="AdminTableTd">ПРИ-122</td>
                                <td id="AdminTableTd">
                                    <div>
                                        <img src={PencilIcon} style={{width: '20px', marginRight: '25px'}}/>
                                        <img src={Cross} style={{width: '20px', marginRight: '5px'}}/>
                                    </div>
                                </td>
                            </tr>

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
                                           placeholder="Введите название курса..."/>
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

                                    >

                                        <option value="1 курс 1 семестр">1 курс 1 семестр</option>
                                        <option value="1 курс 2 семестр">1 курс 2 семестр</option>
                                        <option value="2 курс 3 семестр">2 курс 3 семестр</option>
                                        <option value="2 курс 4 семестр">2 курс 4 семестр</option>
                                        <option value="3 курс 5 семестр">3 курс 5 семестр</option>
                                        <option value="3 курс 6 семестр">3 курс 6 семестр</option>
                                        <option value="4 курс 7 семестр">4 курс 7 семестр</option>
                                        <option value="4 курс 8 семестр">4 курс 8 семестр</option>

                                    </select>
                                </div>
                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
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
                                           placeholder="Введите название группы..."/>
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

                                    >

                                        <option value="1 курс 1 семестр">1 курс 1 семестр</option>
                                        <option value="1 курс 2 семестр">1 курс 2 семестр</option>
                                        <option value="2 курс 3 семестр">2 курс 3 семестр</option>
                                        <option value="2 курс 4 семестр">2 курс 4 семестр</option>
                                        <option value="3 курс 5 семестр">3 курс 5 семестр</option>
                                        <option value="3 курс 6 семестр">3 курс 6 семестр</option>
                                        <option value="4 курс 7 семестр">4 курс 7 семестр</option>
                                        <option value="4 курс 8 семестр">4 курс 8 семестр</option>

                                    </select>
                                </div>
                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
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
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Логин
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите логин..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Почта
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите почту..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Имя
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите имя..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Фамилия
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите фамилию..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Отчество
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите отчество..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Телефон
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите телефон..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Пароль
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите пароль..."/>
                                </div>


                                <div id="CourseAddSubmit">
                                    <button id="CourseAddSubmitButton" onClick={() => {
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
                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Логин
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите логин..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Почта
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите почту..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Имя
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите имя..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Фамилия
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите фамилию..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Отчество
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите отчество..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Телефон
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите телефон..."/>
                                </div>

                                <label style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                    Пароль
                                </label>
                                <div id="CourceDetailSectionAddModalInputCourse">
                                    <input id="CourceDetailSectionAddModalInputCourseInput"
                                           placeholder="Введите пароль..."/>
                                </div>
                                <div style={{padding: "0px"}}>
                                    <label htmlFor="dropdown"
                                           style={{display: "block", marginBottom: "10px", fontFamily: "IgraSans"}}>
                                        Группа
                                    </label>
                                    <select
                                        id="dropdown"
                                        name="dropdown"
                                        placeholder="1 курс 1 семестр"
                                        id="CourceDetailSectionAddModalInputCourseInputDropDown"

                                    >

                                        <option value="ПРИ-118">ПРИ-118</option>
                                        <option value="ПРИ-119">ПРИ-119</option>
                                        <option value="ПРИ-120">ПРИ-120</option>
                                        <option value="ПРИ-121">ПРИ-121</option>
                                        <option value="ПРИ-122">ПРИ-122</option>
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
