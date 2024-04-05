import React from 'react';

interface UserHeaderProps {
  username?: string;
  avatarUrl?: string;
}

const AVATAR_SIZE = 50;

const UserHeader: React.FC<UserHeaderProps> = ({ username, avatarUrl }) => {
  if (username && avatarUrl) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
          flexGrow: 1,
          margin: '0 10px',
          padding: '5px 0px',
        }}
      >
        <div style={{ width: '100%', marginRight: '10px' }}>
          <p>{username}</p>
        </div>
        <div
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            minWidth: AVATAR_SIZE,
            minHeight: AVATAR_SIZE,
            maxWidth: AVATAR_SIZE,
            maxHeight: AVATAR_SIZE,
            borderRadius: '50%',
            overflow: 'hidden',
            marginLeft: '10px',
          }}
        >
          <img
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            src={avatarUrl}
            alt="User Avatar"
          />
        </div>
      </div>
    );
  } else {
    return <span>Login/Sign up</span>;
  }
};

export default UserHeader;
