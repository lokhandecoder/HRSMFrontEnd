import React, { useState } from 'react';
import "../../Resources/Styles/HomePageCSS/ProfileImageSetter.css";

interface ProfileImageSetterProps {
  defaultImage: string;
}

const ProfileImageSetter: React.FC<ProfileImageSetterProps> = ({ defaultImage }) => {
  const [image, setImage] = useState<string>(defaultImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result as string;
        setImage(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-image-setter">
      <div className="profile-image-container">
        <img src={image} alt="Profile" className="profile-image" />
      </div>
      <label htmlFor="image-upload" className="image-upload-label" >

        Choose a new profile picture
      </label>
      
    </div>
  );
};

export default ProfileImageSetter;
