import React, {useRef, useState} from "react";
import '../../styles/CourseElement.css';
import ClosedIcon from '../../assets/icons/right_icon.svg';
import OpenedIcon from '../../assets/icons/opened_icon.svg';
import lab from '../../assets/icons/lab.svg';
import lection from '../../assets/icons/lection.svg';
import material from '../../assets/icons/material.svg';
import test from '../../assets/icons/test.svg';
import sendLab from '../../assets/icons/send_lab.svg';
import printer from '../../assets/icons/printer.svg';
import other from '../../assets/icons/other.svg';
import pencil from '../../assets/icons/pencil.svg';
import eye from '../../assets/icons/eye.svg';
import crossedEye from '../../assets/icons/crossed_eye.svg';
import cross from '../../assets/icons/cross.svg';
import {useNavigate, useParams} from "react-router-dom";

const iconMapping = {
    "File": lab,
    "Task": sendLab,
    "TextContent": other,
};

const CourseElement = ({data, setData}) => {
    const [openIndex, setOpenIndex] = useState(null);
    const {courseId} = useParams();

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleDelete = async (sectionId) => {
        try {
            const response = await fetch(`https://localhost:7065/api/Course/${courseId}/Sections/${sectionId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Удаляем секцию из локальных данных
                setData(prevData => prevData.filter(section => section.id !== sectionId));
            } else {
                console.error('Ошибка удаления секции');
            }
        } catch (error) {
            console.error('Ошибка подключения к серверу:', error);
        }
    };


    return (
        <div className="accordion">
            {data.map((section, index) => (
                <AccordionItem
                    key={section.id}
                    title={section.name}
                    isOpen={openIndex === index}
                    onToggle={() => toggleAccordion(index)}
                    onDelete={() => handleDelete(section.id)}
                    isVisible={section.isVisible}
                    courseId={courseId}
                    sectionId={section.id}
                    setData={setData}
                >
                    {section.materials.map((material) => (
                        <AccordionSubItem
                            key={material.id}
                            icon={iconMapping[material.type] || other}
                            title={material.title}
                            link={material.link || ""}
                            isVisible={material.isVisible}
                            courseId={courseId}
                            sectionId={section.id}
                            materialId={material.id}
                            setData={setData}
                        />
                    ))}
                </AccordionItem>
            ))}
        </div>
    );
};

const AccordionItem = ({
                           title,
                           children,
                           isOpen,
                           onToggle,
                           onDelete,
                           isVisible,
                           courseId,
                           sectionId,
                           setData
                       }) => {
    const contentRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const toggleVisibility = async () => {
        try {
            const response = await fetch(`https://localhost:7065/api/Course/${courseId}/Sections/${sectionId}/Visibility`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(!isVisible),
            });

            if (response.ok) {
                setData(prevData => {
                    const updatedData = [...prevData];
                    updatedData.forEach(section => {
                        if (section.id === sectionId) {
                            section.isVisible = !isVisible;
                        }
                    });
                    return updatedData;
                });
            } else {
                console.error('Ошибка обновления видимости');
            }
        } catch (error) {
            console.error('Ошибка подключения к серверу:', error);
        }
    };

    const saveNewTitle = async () => {
        try {
            const response = await fetch(`https://localhost:7065/api/Course/${courseId}/Sections/${sectionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: newTitle}),
            });

            if (response.ok) {
                setData(prevData => {
                    const updatedData = [...prevData];
                    updatedData.forEach(section => {
                        if (section.id === sectionId) {
                            section.name = newTitle;
                        }
                    });
                    return updatedData;
                });
                setIsEditing(false);
            } else {
                console.error('Ошибка сохранения нового названия');
            }
        } catch (error) {
            console.error('Ошибка подключения к серверу:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveNewTitle();
        }
    };

    return (
        <div className="accordion-item">
            <div style={{display: "flex", alignItems: "center"}}>
                <button className="accordion-header" onClick={onToggle}>
                    <img src={isOpen ? OpenedIcon : ClosedIcon} alt="Toggle Icon" style={{width: '25px'}}/>
                    <div className="accordion-header-text">
                        {isEditing ? (
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '16px',
                                }}
                            />
                        ) : (
                            title
                        )}
                    </div>
                </button>
                <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                    <button
                        style={{marginRight: '20px', all: "unset", cursor: "pointer"}}
                        onClick={() => setIsEditing(true)}
                    >
                        <img src={pencil} alt="Edit Icon" style={{marginRight: '20px', width: '20px'}}/>
                    </button>
                    <button style={{marginRight: '20px', all: "unset", cursor: "pointer"}} onClick={toggleVisibility}>
                        <img src={isVisible ? eye : crossedEye} alt="View Icon"
                             style={{marginRight: '20px', width: '20px'}}/>
                    </button>
                    <button style={{all: "unset", cursor: "pointer"}} onClick={onDelete}>
                        <img src={cross} alt="Delete Icon" style={{marginRight: '20px', width: '20px'}}/>
                    </button>
                </div>
            </div>
            <div
                className="accordion-content"
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
                    transition: "max-height 0.3s ease",
                }}
            >
                <div ref={contentRef} className="accordion-inner-content">
                    {children}
                    <div id="CourceDetailButtonsContainer">
                        <button id="CourceDetailItemAddButton">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AccordionSubItem = ({icon, title, link, isVisible, courseId, sectionId, materialId, setData}) => {
    const navigate = useNavigate();

    const toggleVisibility = async () => {
        try {
            const response = await fetch(`https://localhost:7065/api/Section/${sectionId}/Material/${materialId}/Visibility`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    !isVisible
                ),
            });

            if (response.ok) {
                // Обновляем локальные данные
                setData(prevData => {
                    const updatedData = [...prevData];
                    updatedData.forEach(section => {
                        section.materials.forEach(material => {
                            if (material.id === materialId) {
                                material.isVisible = !isVisible; // Обновляем состояние видимости
                            }
                        });
                    });
                    return updatedData;
                });
            } else {
                console.error('Ошибка обновления видимости');
            }
        } catch (error) {
            console.error('Ошибка подключения к серверу:', error);
        }
    };

    return (
        <div className="accordion-sub-item" style={{cursor: "pointer"}}>
            <div style={{display: "flex", alignItems: "center"}} onClick={() => link && navigate(link)}>
                <img src={icon} style={{width: '20px'}} alt="Sub Item Icon"/>
                <div className="accordion-sub-item-text">{title}</div>
            </div>
            <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                <button style={{marginRight: '20px', all: "unset"}}>
                    <img src={pencil} alt="Edit Icon" style={{marginRight: '20px', width: '20px'}}/>
                </button>
                <button style={{marginRight: '20px', all: "unset"}} onClick={toggleVisibility}>
                    <img src={isVisible ? eye : crossedEye} alt="View Icon"
                         style={{marginRight: '20px', width: '20px'}}/>
                </button>
                <button style={{all: "unset"}}>
                    <img src={cross} alt="Delete Icon" style={{marginRight: '20px', width: '20px'}}/>
                </button>
            </div>
        </div>
    );
};

export default CourseElement;
