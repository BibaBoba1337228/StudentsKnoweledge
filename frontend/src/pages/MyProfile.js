import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import '../styles/MyProfile.css';
import profile from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'


function MyProfile() {
    const [isExpanded, setIsExpanded] = useState(false);

    const courses = [
        "Технологии программирования",
        "Управление данными",
        "Тестирование ПО",
        "Эво рыбинское самбование",
        "Курс 5",
        "Курс 6",
        "Курс 7",
    ];

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div id="MyProfileWrapper">


            <div id="MyProfileContainer">

                <div id="MyProfileHeaderContainer">

                    <div id="MyProfileHeader">Мой профиль</div>
                    <div id="MyProfileDelimiter"></div>
                </div>

                <div id="MyProfileCourceContainer">

                    <div className="MyProfileInfoBlockWithProfileImage">

                        <img src={profile} alt="profile" style={{width: '120px'}}/>

                        <div className="MyProfileTextBlockWithProfileImage">
                            <div className="MyProfileInfoBlockHeaderWithProfileImage">Ерофеев А.А.</div>
                            <div className="MyProfileInfoBlockInfoWithProfileImage">
                                Найти контакты
                                <img src={add} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                            </div>
                        </div>

                    </div>

                    <div className="MyProfileInfoBlock">

                        <div className="MyProfileTextBlock">
                            <div className="MyProfileInfoBlockHeader">Страна:</div>
                            <div className="MyProfileInfoBlockInfo">Россия</div>
                        </div>

                    </div>

                    <div className="MyProfileInfoBlock">

                        <div className="MyProfileTextBlock">
                            <div className="MyProfileInfoBlockHeader">Город:</div>
                            <div className="MyProfileInfoBlockInfo">Рыбинск</div>
                        </div>

                    </div>

                    <div className="MyProfileInfoBlock">

                        <div className="MyProfileTextBlock">
                            <div className="MyProfileInfoBlockHeader">Группа:</div>
                            <div className="MyProfileInfoBlockInfo">ПРИ-122</div>
                        </div>

                    </div>

                    <div className="MyProfileInfoBlock">
                        <div className="MyProfileInfoBlockHeader">Учебные курсы</div>
                        <ul style={{listStyle: "none", padding: 0}}>
                            {courses.slice(0, isExpanded ? courses.length : 4).map((course, index) => (
                                <li key={index} className="MyProfileCourseInInfoBlock">
                                    {course}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={toggleExpand}
                            id="ExpandCourcesButton"
                        >
                            {isExpanded ? "Свернуть" : "Еще..."}
                        </button>
                    </div>

                    <div className="MyProfileInfoBlock">

                        <div className="MyProfileTextBlock">
                            <div className="MyProfileInfoBlockHeader" style={{textDecoration: "underline"}}>Оценки</div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default MyProfile;
