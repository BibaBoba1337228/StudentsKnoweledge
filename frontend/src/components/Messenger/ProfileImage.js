import React, {useState} from "react";
import "../../styles/MyProfile.css";

function ProfileImage({initialPictureUrl}) {
    const [profilePicture, setProfilePicture] = useState(initialPictureUrl);
    const [hovered, setHovered] = useState(false);

    const handleImageHover = () => {
        setHovered(true);
    };

    const handleImageLeave = () => {
        setHovered(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePicture", file);

        try {
            const response = await fetch(
                `https://${process.env.REACT_APP_API_BASE_URL}/api/StudingUser/updateProfilePicture`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Error uploading image");

            const data = await response.json();
            setProfilePicture(`https://${process.env.REACT_APP_API_BASE_URL}/files/${data.profilePictureUrl}`);
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    return (
        <div
            className="profile-image-container"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            style={{position: "relative"}}
        >
            <label htmlFor="file-input">
                <img
                    src={profilePicture}
                    alt="Profile"
                    style={{width: "120px", cursor: "pointer"}}
                />
                {hovered && (
                    <div className="overlay-text">Нажмите для смены фото</div>
                )}
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{display: "none"}}
                onChange={handleFileUpload}
            />
        </div>
    );
}

export default ProfileImage;
