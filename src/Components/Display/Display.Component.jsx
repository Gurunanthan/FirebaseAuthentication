import React from "react";

const Display = ({currentUser,handleSignOut}) => {
  return (
    <div>
      {currentUser.photoURL && (
        <img
          src={currentUser.photoURL}
          alt="User Profile"
          className="profileImage"
        />
      )}
      <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
      <button className="button" onClick={handleSignOut}>
        Log Out
      </button>
    </div>
  );
};

export default Display;
