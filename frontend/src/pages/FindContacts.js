import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/FindContacts.css';
import SearchIcon from '../assets/icons/search.svg';
import {ErrorHandler, ErrorModal, fetchWithErrorHandling} from "../components/ErrorHandler";
import {ClipLoader} from "react-spinners";

function FindContacts() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [skip, setSkip] = useState(0);
    const take = 10; // сколько пользователей загружать за раз
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const containerRef = useRef(null);

    const [error, setError] = useState(null);
    const errorHandler = new ErrorHandler(setError);
    useEffect(() => {
        errorHandler.setErrorCallback(setError);

    }, []);

    const closeErrorModal = () => {
        setError(null);
    };

    const loadUsers = async (reset = false) => {
        if (loading) return;
        setLoading(true);

        const currentSkip = reset ? 0 : skip;

        const response = await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/StudingUser/contacts?skip=${currentSkip}&take=${take}&search=${encodeURIComponent(searchTerm)}`,
            {
                method: "GET",
                credentials: "include",
            },
            null,
            errorHandler
        );

        if (reset) {
            setUsers(response);
            setSkip(take);
        } else {
            setUsers(prev => [...prev, ...response]);
            setSkip(prev => prev + take);
        }

        if (response.length < take) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUsers(true);
    }, []);

    const handleScroll = () => {
        if (!hasMore || loading) return;

        const element = containerRef.current;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            // Доскролили до низа
            loadUsers();
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        loadUsers(true);
    };

    return (
        <div id="FindContactsWrapper">
            <div id="FindContactsContainer">

                <div id="MyCourcesHeaderContainer">
                    <div id="MyCourcesHeaderAndSearchBarContainer">
                        <div id="MyCourcesHeader">Найти контакты</div>
                        <div id="MyCourcesSearchBar">
                            <input
                                id="MyCourcesSearchBarInput"
                                placeholder="Поиск контакта"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <img src={SearchIcon} alt="Иконка поиска" style={{width: '25px'}}/>
                        </div>
                    </div>
                    <div id="MyCourcesDelimiter"></div>
                </div>

                <div
                    id="FindContactsCourceContainer"
                    ref={containerRef}
                    onScroll={handleScroll}
                >
                    {users.map(user => (
                        user.id !== localStorage.getItem("user_id") &&
                        <div className="FindContactsInfoBlockWithChatsImage"
                             key={user.id}
                             onClick={() => navigate(`/system/profile/${user.id}`)}
                             style={{cursor: "pointer"}}>

                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <img
                                    src={
                                        user.profilePictureUrl.includes('files')
                                            ? `https://${process.env.REACT_APP_API_BASE_URL}/${user.profilePictureUrl}`
                                            : `https://${process.env.REACT_APP_API_BASE_URL}/files/${user.profilePictureUrl}`
                                    }
                                    alt="Chats"
                                    style={{width: '80px'}}
                                />
                                <div className="FindContactsTextBlockWithChatsImage">
                                    <div className="FindContactsInfoBlockHeaderWithChatsImage">
                                        {user.lastName} {user.name} {user.middleName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && <div className="loader">
                        <ClipLoader size={50} color={"#007BFF"} loading={loading}/>
                    </div>}
                </div>
            </div>
            {error && <ErrorModal errorMessage={error} onClose={closeErrorModal}/>}
        </div>
    );
}

export default FindContacts;
