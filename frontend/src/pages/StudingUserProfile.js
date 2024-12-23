import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import '../styles/MyProfile.css';
import add from '../assets/icons/add.svg'
import {ClipLoader} from "react-spinners";
import {ErrorHandler, ErrorModal, fetchWithErrorHandling} from "../components/ErrorHandler";
import ProfileImage from "../components/Messenger/ProfileImage";


function StudingUserProfile() {

    const userData = useLoaderData();
    const [isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem("user_id"));
    const [error, setError] = useState(null);
    const errorHandler = new ErrorHandler(setError);
    useEffect(() => {
        errorHandler.setErrorCallback(setError);

    }, []);


    const closeErrorModal = () => {
        setError(null);
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleWriteMessageToUser = async () => {
        const data = await fetchWithErrorHandling(`https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/user/${userData.id}`,
            {
                method: "GET",
                credentials: "include",
            },
            null,
            errorHandler);
        navigate(`/system/chats/${data.id}`);
    }

    return (
        <div id="MyProfileWrapper">

            {isLoading ? (
                    <div className="loader">
                        <ClipLoader size={50} color={"#007BFF"} loading={isLoading}/>
                    </div>
                ) :
                (<div id="MyProfileContainer">

                    <div id="MyProfileHeaderContainer">

                        <div
                            id="MyProfileHeader">{userData.id === userId ? "Мой профиль" : "Профиль пользователя"}</div>
                        <div id="MyProfileDelimiter"></div>
                    </div>

                    <div id="MyProfileCourceContainer">

                        <div className="MyProfileInfoBlockWithProfileImage">

                            <ProfileImage
                                initialPictureUrl={userData.profilePictureUrl.includes('files') ? `https://${process.env.REACT_APP_API_BASE_URL}/${userData.profilePictureUrl}` : `https://${process.env.REACT_APP_API_BASE_URL}/files/${userData.profilePictureUrl}`}/>

                            <div className="MyProfileTextBlockWithProfileImage">
                                <div
                                    className="MyProfileInfoBlockHeaderWithProfileImage">{userData.lastName} {userData.name[0]}. {userData.middleName[0]}.
                                </div>

                                {userData.id === userId ? (
                                    <div className="MyProfileInfoBlockInfoWithProfileImage"
                                         onClick={() => navigate('/system/findcontacts')}
                                         style={{cursor: "pointer"}}>
                                        найти контакты
                                        <img src={add} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                                    </div>

                                ) : (
                                    <div className="MyProfileInfoBlockInfoWithProfileImage"
                                         onClick={() => handleWriteMessageToUser()}
                                         style={{cursor: "pointer"}}>
                                        Написать сообщение
                                    </div>
                                )}


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

                        {localStorage.getItem("role") === "1" && (
                            userData.id === localStorage.getItem("user_id") &&
                            <div className="MyProfileInfoBlock"
                                 onClick={() => navigate(`/system/profile/${userId}/mymarks`)}
                                 style={{cursor: "pointer"}}>

                                <div className="MyProfileTextBlock">
                                    <div className="MyProfileInfoBlockHeader"
                                         style={{textDecoration: "underline"}}>Оценки
                                    </div>
                                </div>
                            </div>
                        )
                        }


                    </div>

                </div>)
            }
            {error && <ErrorModal errorMessage={error} onClose={closeErrorModal}/>}
        </div>
    );
}

export default StudingUserProfile;
