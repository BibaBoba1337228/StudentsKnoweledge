import '../styles/CourseDetail.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import CourseElement from "../components/CoursePage/CourseElement";
import React, {useState} from "react";
import ProfileIcon from "../assets/icons/profile_icon.svg";
import SearchIcon from "../assets/icons/search.svg";
import Chats from "../assets/images/profile.svg";
import Cross from '../assets/icons/cross.svg'
import CheckBoxUncheckedIcon from '../assets/icons/unchecked_checkbox.svg'
import CheckBoxСheckedIcon from '../assets/icons/checked_checkbox.svg'


function MyCourses() {

    const navigate = useNavigate();

    const [isTeachersOpen, setIsTeachersOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [showCheckboxes, setShowCheckboxes] = useState(false);

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


    return (
        <div id="CourceDetailWrapper">


            <div id="CourceDetailContainer">

                <div id="CourceDetailHeaderContainer">

                    <div id="CourceDetailHeader">Технологии программирования</div>
                    <div id="CourceDetailDelimiter"></div>
                </div>

                <div id="CourceDetailCourceContainer">

                    <div id="CourceDetailButtonsContainer">

                        <button id="CourceDetailTeachersButton" onClick={() => setIsTeachersOpen(true)}
                                style={{cursor: "pointer"}}>Преподаватели
                        </button>
                        <button id="CourceDetailGroupsButton" onClick={() => setIsGroupsOpen(true)}
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
                    <CourseElement></CourseElement>

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
                                setIsSectionOpen(false);
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
                    WipeAll()
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

                        <div id="CourceDetailButtonsContainer">

                            <button id="CourceDetailAddButton"
                                    style={{cursor: "pointer", backgroundColor: "#fff"}}
                                    onClick={handleAddButtonClickTeachers}>Добавить
                            </button>
                        </div>


                        <div id="CourseContactsCourceContainer">


                            <div className="CourseContactsInfoBlockWithChatsImage"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>
                                    <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                    <div className="CourseContactsTextBlockWithChatsImage">
                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                             onClick={() => navigate('/system/profile/profileid')}
                                             style={{cursor: "pointer"}}>Ерофеев А.А.
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="CourseContactsInfoBlockWithChatsImage"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>
                                    <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                    <div className="CourseContactsTextBlockWithChatsImage">
                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                             onClick={() => navigate('/system/profile/profileid')}
                                             style={{cursor: "pointer"}}>Ерофеев А.А.
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="CourseContactsInfoBlockWithChatsImage"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>
                                    <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                    <div className="CourseContactsTextBlockWithChatsImage">
                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                             onClick={() => navigate('/system/profile/profileid')}
                                             style={{cursor: "pointer"}}>Ерофеев А.А.
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="CourseContactsInfoBlockWithChatsImage"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>
                                    <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                    <div className="CourseContactsTextBlockWithChatsImage">
                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                             onClick={() => navigate('/system/profile/profileid')}
                                             style={{cursor: "pointer"}}>Ерофеев А.А.
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="CourseContactsInfoBlockWithChatsImage"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: "100%"
                                }}>
                                    <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                    <div className="CourseContactsTextBlockWithChatsImage">
                                        <div className="CourseContactsInfoBlockHeaderWithChatsImage"
                                             onClick={() => navigate('/system/profile/profileid')}
                                             style={{cursor: "pointer"}}>Ерофеев А.А.
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )}

            {isGroupsOpen && (
                <div id="CourceDetailSectionAddModalOverlay" onClick={() => setIsGroupsOpen(false)}>
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

                        <div id="CourceDetailButtonsContainer">

                            <button id="CourceDetailAddButton"
                                    style={{cursor: "pointer", backgroundColor: "#fff"}}
                                    onClick={handleAddButtonClickGroups}>Добавить
                            </button>
                        </div>


                        <div id="CourseContactsCourceContainer">


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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                             style={{cursor: "pointer"}}>ПРИ-122
                                        </div>
                                        {showCheckboxes ? (
                                            <label className="custom-checkbox">
                                                <input type="checkbox" name="q2" value="1"/>
                                                <span className="custom-checkbox-icon"></span>
                                            </label>
                                        ) : (
                                            <img src={Cross} alt="Крестик" style={{cursor: "pointer"}}/>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MyCourses;
