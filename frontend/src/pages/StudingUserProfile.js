import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Route, Routes, useLoaderData, useNavigate} from 'react-router-dom';
import '../styles/MyProfile.css';
import profile from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'
import {ClipLoader} from "react-spinners";


function StudingUserProfile() {

    const userData = useLoaderData();
    const [isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    console.log(userData);
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div id="MyProfileWrapper">

            {isLoading ? (
                    <div className="loader">
                        <ClipLoader size={50} color={"#007BFF"} loading={isLoading}/>
                    </div>
                ) :
            (<div id="MyProfileContainer">

                <div id="MyProfileHeaderContainer">

                    <div id="MyProfileHeader">{userData.id === localStorage.getItem("user_id")? "Мой профиль": "Профиль пользователя"}</div>
                    <div id="MyProfileDelimiter"></div>
                </div>

                <div id="MyProfileCourceContainer">

                    <div className="MyProfileInfoBlockWithProfileImage">

                        <img src={`https://${process.env.REACT_APP_API_BASE_URL}/${userData.profilePictureUrl}`} alt="profile" style={{width: '120px'}}/>

                        <div className="MyProfileTextBlockWithProfileImage">
                            <div className="MyProfileInfoBlockHeaderWithProfileImage">{userData.lastName} {userData.name[0]}.  {userData.middleName[0]}.</div>
                            <div className="MyProfileInfoBlockInfoWithProfileImage"
                                 onClick={() => navigate('/system/findcontacts')}
                                 style={{cursor: "pointer"}}>
                                Найти контакты
                                <img src={add} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                            </div>
                        </div>

                    </div>

                    {
                        (userData.role === 1) &&
                        <div className="MyProfileInfoBlock">
                            <div className="MyProfileTextBlock">
                                <div className="MyProfileInfoBlockHeader">Группа:</div>
                                <div className="MyProfileInfoBlockInfo">{userData.groupName}</div>
                            </div>

                        </div>
                    }


                    <div className="MyProfileInfoBlock">
                        <div className="MyProfileInfoBlockHeader">Учебные курсы</div>
                        <ul style={{listStyle: "none", padding: 0}}>
                            {userData.courses?.slice(0, isExpanded ? userData.courses.length : 4).map((course, index) => (
                                <li key={course.id} className="MyProfileCourseInInfoBlock">
                                    {course.name}
                                </li>
                            ))}
                        </ul>
                        {
                            (userData.courses.length > 4) &&
                            <button
                                onClick={toggleExpand}
                                id="ExpandCourcesButton"
                            >
                                {isExpanded ? "Свернуть" : "Еще..."}
                            </button>
                        }
                    </div>

                    {
                        userData.id === localStorage.getItem("user_id") &&
                        <div className="MyProfileInfoBlock" onClick={() => navigate('/system/mymarks')}
                             style={{cursor: "pointer"}}>

                            <div className="MyProfileTextBlock">
                                <div className="MyProfileInfoBlockHeader" style={{textDecoration: "underline"}}>Оценки
                                </div>
                            </div>
                        </div>
                    }


                </div>

            </div>)
            }

        </div>
    );
}

export default StudingUserProfile;
