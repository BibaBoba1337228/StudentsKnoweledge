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
import cross from '../../assets/icons/cross.svg';
import {useNavigate} from "react-router-dom";

const iconMapping = {
    "Лекции": lection,
    "Материалы": material,
    "Задания": test,
    "Печатные материалы": printer,
    "Прочее": other,
};

const CourseElement = ({data}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {data.map((section, index) => (
                <AccordionItem
                    key={section.id}
                    title={section.name}
                    isOpen={openIndex === index}
                    onToggle={() => toggleAccordion(index)}
                >
                    {section.materials.map((material) => (
                        <AccordionSubItem
                            key={material.id}
                            icon={iconMapping[section.name] || other}
                            title={material.title}
                            link={material.link || ""}
                        />
                    ))}
                </AccordionItem>
            ))}
        </div>
    );
};

const AccordionItem = ({title, children, isOpen, onToggle}) => {
    const contentRef = useRef(null);

    return (
        <div className="accordion-item">
            <div style={{display: "flex", alignItems: "center"}}>
                <button className="accordion-header" onClick={onToggle}>
                    <img src={isOpen ? OpenedIcon : ClosedIcon} alt="Opened Icon" style={{width: '25px'}}/>
                    <div className="accordion-header-text">{title}</div>
                </button>
                <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                    <button style={{marginRight: '20px', all: "unset"}}>
                        <img src={pencil} alt="Edit Icon" style={{marginRight: '20px', width: '20px'}}/>
                    </button>
                    <button style={{marginRight: '20px', all: "unset"}}>
                        <img src={eye} alt="View Icon" style={{marginRight: '20px', width: '20px'}}/>
                    </button>
                    <button style={{all: "unset"}}>
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
                        <button id="CourceDetailItemCancelButton">Отменить</button>
                        <button id="CourceDetailItemSaveButton">Сохранить</button>
                        <button id="CourceDetailItemAddButton">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccordionSubItem = ({icon, title, link}) => {
    const navigate = useNavigate();

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
                <button style={{marginRight: '20px', all: "unset"}}>
                    <img src={eye} alt="View Icon" style={{marginRight: '20px', width: '20px'}}/>
                </button>
                <button style={{all: "unset"}}>
                    <img src={cross} alt="Delete Icon" style={{marginRight: '20px', width: '20px'}}/>
                </button>
            </div>
        </div>
    );
};

export default CourseElement;
