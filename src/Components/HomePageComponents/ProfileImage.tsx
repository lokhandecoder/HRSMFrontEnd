import React, { useState, ChangeEvent } from "react";
import "../../Resources/Styles/HomePageCSS/Profile.css";
import PersonIcon from '@mui/icons-material/Person';

const ProfileImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setUpdatedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    // Perform any update logic here if needed
    setUpdatedImage(image);
  };

  const handleSaveImage = () => {
    // Perform save logic here using the updatedImage state
    // For example, you can send the updatedImage to your backend

    // After saving, you might want to reset the image to null or display a success message
    setImage(null);
  };

  return (
    <div className="profile-picture-upload">
      <label htmlFor="file-input" className="profile-picture-label">
        {updatedImage ? (
          <img src={updatedImage} alt="Profile" className="profile-picture" />
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
      <div className="buttons">
        <button onClick={handleUpdateImage} disabled={!image}>
          Update
        </button>
        <button onClick={handleSaveImage} disabled={!updatedImage}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
