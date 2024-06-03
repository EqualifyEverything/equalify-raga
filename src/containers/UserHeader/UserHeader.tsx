import React from 'react';
import { User } from '../../../utils/CommonTypes';
import { useAuthProvider } from '../../providers/AuthProvider';
import icon from '../../assets/img/icon-128.png';

interface UserHeaderProps {
  username?: string;
  avatarUrl?: string;
}

const AVATAR_SIZE = 50;

const UserHeader: React.FC<UserHeaderProps> = () => {
  const authProviderState = useAuthProvider();

  const username = authProviderState?.user?.name || 'Guest';
  const avatarUrl = authProviderState?.user?.iconUrl || icon;

  const login = () => {
    console.info('logging in');
    let user: User = {
      id: Date.now().toString(),
      name: 'John Doe',
      email: 'foo@bar.com',
    };
    authProviderState.setUser(user);
  };

  if (!authProviderState?.user)
    return (
      <div>
        <button onClick={login}>Login or Sign up.. please</button>
      </div>
    );

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
