import '../styles/MyCources.css'
import '../styles/fonts.css'
import {useNavigate, useLoaderData} from 'react-router-dom';
import SearchIcon from '../assets/icons/search.svg'
import Background1 from '../assets/images/card_background_1.svg'
import Background2 from '../assets/images/card_background_2.svg'
import Background3 from '../assets/images/card_background_3.svg'
import Background4 from '../assets/images/card_background_4.svg'
import {useEffect, useState} from 'react';
import {ClipLoader} from "react-spinners";

function MyCourses() {

    const data = useLoaderData();
    const [isLoading, setIsLoading] = useState(true); // состояние загрузки
    const navigate = useNavigate();

    const backgrounds = [Background1, Background2, Background3, Background4];

    useEffect(() => {
        // Создаем промисы для загрузки всех картинок
        const preloadImages = backgrounds.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve; // Разрешим промис, когда изображение загрузится
                img.onerror = reject; // Отклоняем промис, если изображение не загрузилось
            });
        });

        // Ожидаем загрузки всех изображений
        Promise.all(preloadImages)
            .then(() => {
                setIsLoading(false); // Все изображения загружены, меняем состояние
            })
            .catch((error) => {
                console.error('Ошибка при загрузке изображений:', error);
                setIsLoading(false); // В случае ошибки тоже завершаем загрузку
            });
    }, [backgrounds]);

    const getRandomBackground = () => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        return backgrounds[randomIndex];
    };

    const getSemesterText = (semester) => {
        const year = Math.floor(semester / 2) + 1; // Assuming 2 semesters per year
        const sem = semester % 2 === 0 ? "лето" : "осень"; // Example: autumn or spring
        return `${year} курс ${semester} семестр`;
    };

    return (
        <div id="MyCourcesWrapper">

            <div id="MyCourcesContainer">
                <div id="MyCourcesHeaderContainer">
                    <div id="MyCourcesHeaderAndSearchBarContainer">
                        <div id="MyCourcesHeader">Мои курсы</div>
                        <div id="MyCourcesSearchBar">
                            <input id="MyCourcesSearchBarInput" placeholder="Поиск курса"/>
                            <img src={SearchIcon} alt="Иконка поиска" style={{width: '25px'}}/>
                        </div>
                    </div>
                    <div id="MyCourcesDelimiter"></div>
                </div>

                {/* Показать лоадер, если идет загрузка */}
                {isLoading ? (
                    <div className="loader">
                        <ClipLoader size={50} color={"#007BFF"} loading={isLoading}/>
                    </div>
                ) : (
                    <div id="MyCourcesCourcesCardsWrapper">
                        <div id="MyCourcesCourcesCardsContainer">
                            {data.map(course => (
                                <div key={course.id} className="MyCourcesCourcesCard"
                                     onClick={() => navigate(`/system/courses/course/${course.id}`)}
                                     style={{cursor: "pointer"}}>
                                    <img className="MyCourcesCourcesCardBackground"
                                         loading="eager" src={getRandomBackground()}/>

                                    <div className="MyCourcesCourcesCardTextContainer">
                                        <div className="MyCourcesCourcesCardSubjectName">{course.name}</div>
                                        <div
                                            className="MyCourcesCourcesCardSubjectSemestr">{getSemesterText(course.semester)}</div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default MyCourses;
