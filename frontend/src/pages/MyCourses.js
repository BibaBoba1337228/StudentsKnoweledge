import '../styles/MyCources.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import SearchIcon from '../assets/icons/search.svg'
import Background1 from '../assets/images/card_background_1.svg'
import Background2 from '../assets/images/card_background_2.svg'
import Background3 from '../assets/images/card_background_3.svg'
import Background4 from '../assets/images/card_background_4.svg'


function MyCourses() {

    const navigate = useNavigate();

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

                <div id="MyCourcesCourcesCardsWrapper">


                    <div id="MyCourcesCourcesCardsContainer">


                        <div className="MyCourcesCourcesCard" onClick={() => navigate('/system/course')}
                             style={{cursor: "pointer"}}>

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>

                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background1}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background2}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background3}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>
                        <div className="MyCourcesCourcesCard">

                            <img className="MyCourcesCourcesCardBackground" src={Background4}/>

                            <div className="MyCourcesCourcesCardTextContainer">

                                <div className="MyCourcesCourcesCardSubjectName">Технологии программирования</div>
                                <div className="MyCourcesCourcesCardSubjectSemestr">3 курс 5 семестр</div>

                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
}

export default MyCourses;
