import React, {useRef, useState} from "react";

import '../../styles/CourseElement.css'
import ClosedIcon from '../../assets/icons/right_icon.svg'
import OpenedIcon from '../../assets/icons/opened_icon.svg'
import lab from '../../assets/icons/lab.svg'
import lection from '../../assets/icons/lection.svg'
import material from '../../assets/icons/material.svg'
import test from '../../assets/icons/test.svg'
import sendLab from '../../assets/icons/send_lab.svg'
import printer from '../../assets/icons/printer.svg'
import other from '../../assets/icons/other.svg'

const accordionData = {

    "Лекции":
        [
            {icon: lection, title: "Основы программирования на C#"},
            {icon: lection, title: "Основы программирования на C#"},
            {icon: lection, title: "Основы программирования на C#"},
            {icon: lection, title: "Основы программирования на C#"}
        ],

    "Материалы":
        [
            {icon: material, title: "Курсы по C#"},
            {icon: material, title: "Курсы по C#"},
            {icon: material, title: "Курсы по C#"},
            {icon: material, title: "Курсы по C#"},
        ],

    "Задания": [
        {icon: test, title: "Тест по теме декораторы"},
        {icon: lab, title: "Лабораторная №1"},
        {icon: sendLab, title: "Слот для сдачи ЛР№1"},
    ],

    "Печатные материалы": [
        {icon: printer, title: "Конспект по лекции №1"},
        {icon: printer, title: "Конспект по лекции №2"},
    ],

    "Прочее": [
        {icon: other, title: "Конспект по лекции №1"},
        {icon: other, title: "Конспект по лекции №1"},
    ]
}

const CourseElement = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {Object.keys(accordionData).map((title, index) => (
                <AccordionItem
                    key={index}
                    title={title}
                    isOpen={openIndex === index}
                    onToggle={() => toggleAccordion(index)}
                >
                    {accordionData[title].map((item, subIndex) => (
                        <AccordionSubItem
                            key={subIndex}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </AccordionItem>
            ))}
        </div>
    );
};


const AccordionItem = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <button className="accordion-header" onClick={toggleAccordion}>
                <img src={isOpen ? OpenedIcon : ClosedIcon} alt="Opened Icon" style={{width: '25px'}}/>
                <div className="accordion-header-text">{title}</div>

            </button>


            <div
                className="accordion-content"
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
                    transition: "max-height 0.3s ease",
                }}
            >
                <div ref={contentRef} className="accordion-inner-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AccordionSubItem = ({icon, title}) => {


    return (
        <div className="accordion-sub-item">
            <img src={icon} style={{width: '20px'}}/>
            <div className="accordion-sub-item-text">{title}</div>
        </div>
    );
};


export default CourseElement;
