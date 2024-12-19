import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import '../../styles/AuthorizedContainer.css';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";


function AuthorizedContainer() {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);


    const handleMenuToggle = (collapsedState) => {
        setIsMenuCollapsed(collapsedState);
    };

    return (
        <div
            className="MainContainer"
            style={{
                marginLeft: isMenuCollapsed ? "60px" : "200px",
            }}
        >
            <div className={`LeftMenu ${isMenuCollapsed ? "collapsed" : ""}`}>
                <LeftMenu onMenuToggle={handleMenuToggle}/>
            </div>
            <div className="Content">
                <Outlet></Outlet>
            </div>
            <div className="RightMenu">
                <RightMenu/>
            </div>
        </div>
    );
}

export default AuthorizedContainer;
