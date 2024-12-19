import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/OtherProfile.css';
import profile from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'
import pencil from '../assets/icons/pencil.svg'


function OtherProfile() {
    const [isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();

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
        <div id="OtherProfileWrapper">


            <div id="OtherProfileContainer">

                <div id="OtherProfileHeaderContainer">

                    <div id="OtherProfileHeader">Профиль</div>
                    <div id="OtherProfileDelimiter"></div>
                </div>

                <div id="OtherProfileCourceContainer">

                    <div className="OtherProfileInfoBlockWithProfileImage">

                        <img src={profile} alt="profile" style={{width: '120px'}}/>

                        <div className="OtherProfileTextBlockWithProfileImage">
                            <div className="OtherProfileInfoBlockHeaderWithProfileImage">Ерофеев А.А.</div>
                            <div className="OtherProfileInfoBlockInfoWithProfileImage"
                                 onClick={() => navigate('/system/chats/chat')}
                                 style={{cursor: "pointer"}}>
                                Написать
                                <img src={pencil} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                            </div>
                            <div className="OtherProfileInfoBlockInfoWithProfileImage">
                                Добавить в контакты
                                <img src={add} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                            </div>
                        </div>

                    </div>


                    <div className="OtherProfileInfoBlock">

                        <div className="OtherProfileTextBlock">
                            <div className="OtherProfileInfoBlockHeader">Группа:</div>
                            <div className="OtherProfileInfoBlockInfo">ПРИ-122</div>
                        </div>

                    </div>

                    <div className="OtherProfileInfoBlock">
                        <div className="OtherProfileInfoBlockHeader">Учебные курсы</div>
                        <ul style={{listStyle: "none", padding: 0}}>
                            {courses.slice(0, isExpanded ? courses.length : 4).map((course, index) => (
                                <li key={index} className="OtherProfileCourseInInfoBlock">
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


                </div>

            </div>

        </div>
    );
}

export default OtherProfile;
