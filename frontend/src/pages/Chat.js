import '../styles/Chat.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate, useParams} from 'react-router-dom';
import clip from '../assets/icons/clip.svg'


function Chat() {
    const {chatId} = useParams();

    const navigate = useNavigate();

    return (
        <div id="ChatWrapper">


            <div id="ChatContainer">

                <div id="ChatHeaderContainer">
                    <div id="ChatHeader">Ерофеев А.А.</div>
                    <div id="ChatDelimiter"></div>
                </div>

                <div id="ChatCourcesCardsWrapper">


                    <div id="ChatCourcesCardsContainer">

                        <div className="ChatMessage">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage fromMe">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage fromMe">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage fromMe">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage fromMe">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>

                        <div className="ChatMessage fromMe">

                            <div className="ChatMessageText">Бэдра Бэдра Бэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                                БэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдраБэдра
                            </div>
                            <div className="ChatMessageDate">23.03.2024 23:13</div>

                        </div>


                    </div>


                </div>

                <div className="message-input-container">
                          <textarea
                              className="message-input"
                              placeholder="Начните писать сообщение..."
                          ></textarea>
                    <button className="attach-button"><img src={clip} style={{width: "20px"}}/></button>
                </div>

            </div>

        </div>
    );
}

export default Chat;
