import React, { useState } from "react";

import NotificationIcon from "../../assets/icons/notification.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

const HeaderRight = () => {
    return (
        <div className="dashbord-header-right">
            <img
                src={NotificationIcon}
                alt="notification-icon"
                className="dashbord-header-icon"
            />
            <img
                src={SettingsIcon}
                alt="settings-icon"
                className="dashbord-header-icon"
            />
            <img
                className="dashbord-header-avatar"
                src="https://reqres.in/img/faces/9-image.jpg"
            />
        </div>
    )
}

export default HeaderRight