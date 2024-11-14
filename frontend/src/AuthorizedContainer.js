import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import './styles/AuthorizedContainer.css';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

function AuthorizedContainer() {
    return (
        <div className="App">
            <div className="MainContainer">
                <LeftMenu/>
                <div style={{width:'80%'}}>

                </div>
                <RightMenu></RightMenu>
            </div>
        </div>
    );
}

export default AuthorizedContainer;
