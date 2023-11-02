import React, { useState, ChangeEvent } from "react";
import "../../Resources/Styles/HomePageCSS/Profile.css";
import PersonIcon from '@mui/icons-material/Person';


const ProfileImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-picture-upload">
      <label htmlFor="file-input" className="profile-picture-label">
        {image ? (
          <img src={image} alt="Profile" className="profile-picture" />
        ) : (
          <div className="placeholder">Upload Profile Picture</div>

        )}
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ProfileImage;
