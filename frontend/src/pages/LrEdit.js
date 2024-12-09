import React, {useState} from 'react';
import {useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrRate.css';
import {fetchWithAuth} from "../api/fetchWithAuth";

function LrEdit() {
    const {courseId, taskId} = useParams();
    const navigate = useNavigate();
    const taskData = useLoaderData();

    const location = useLocation();


    const sectionId = location.state?.sectionId;
    console.log(sectionId, "Айди секции");

    const [data, setData] = useState(taskData);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(taskData);

    if (!data) {
        return <div>Задание не найдено</div>;
    }

    const {title, description, deadline, grade} = data;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSave = async () => {
        const updatedFields = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== data[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});

        if (Object.keys(updatedFields).length === 0) {
            // No changes, just close edit mode
            setIsEditing(false);
            return;
        }

        try {
            const response = await fetchWithAuth(`https://localhost:7065/api/Section/${sectionId}/Material/Task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log("Обновленные данные", updatedData);
                setData(updatedData);
                setIsEditing(false);
            } else {
                console.error('Error updating task:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    let timeDifference = deadlineDate - currentDate;

    if (timeDifference < 0) {
        timeDifference = 'Просрочено';
    } else {
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        timeDifference = `${daysLeft} дней, ${hoursLeft} часов, ${minutesLeft} минут`;
    }

    return (
        <div id="LrRateWrapper">
            <div id="LrRateContainer">
                <div id="LrRateHeaderContainer">
                    <div id="LrRateHeader">
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        ) : (
                            title
                        )}
                    </div>
                    <div id="LrRateDelimiter"></div>
                </div>

                <div id="LrRateCourceContainer">
                    <div className="LrRateInfoBlock">
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Срок сдачи:</div>
                            <div className="LrRateInfoBlockInfo">
                                {isEditing ? (
                                    <input
                                        type="datetime-local"
                                        value={new Date(formData.deadline)
                                            .toISOString()
                                            .slice(0, -8)}
                                        onChange={(e) => handleInputChange('deadline', new Date(e.target.value).toISOString())}
                                    />
                                ) : deadline ? (
                                    new Date(deadline).toLocaleString()
                                ) : (
                                    'Отсутствует'
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="LrRateInfoBlock">
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Описание:</div>
                            <div className="LrRateInfoBlockInfo">
                                {isEditing ? (
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                    />
                                ) : (
                                    description || 'Отсутствует'
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="LrRateInfoBlock">
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Максимальный балл:</div>
                            <div className="LrRateInfoBlockInfo">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={formData.grade}
                                        onChange={(e) => handleInputChange('grade', parseInt(e.target.value, 10))}
                                    />
                                ) : (
                                    grade || 'Отсутствует'
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="LrRateManageButtons">
                        {isEditing ? (
                            <button
                                id="LrRateChangeButton"
                                onClick={handleSave}
                                style={{cursor: 'pointer'}}
                            >
                                Сохранить
                            </button>
                        ) : (
                            <button
                                id="LrRateChangeButton"
                                onClick={() => setIsEditing(true)}
                                style={{cursor: 'pointer'}}
                            >
                                Изменить
                            </button>
                        )}

                        <button
                            id="LrRateDeleteButton"
                            onClick={() => navigate(-1)}
                            style={{cursor: 'pointer'}}
                        >
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LrEdit;
