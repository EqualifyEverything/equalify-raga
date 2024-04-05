import React from 'react';
import logo from '../../assets/img/logo.svg';
import icon from '../../assets/img/icon-128.png';
import UserHeader from '../../containers/UserHeader/UserHeader';
import './Popup.css';

// define a Section that receives a title and onClick function
const Section = ({ title, onClick }) => {
  return (
    <div className="section">
      <button onClick={onClick}>{title}</button>
    </div>
  );
};

/**
 * TODO:
 *
 * Decide if we're using:
 * - React Router
 * - Redux
 * - Context API
 *
 * add provider for:
 * - handling Auth
 * - submitting issues
 *
 */

const Popup = () => {
  return (
    <div className="App">
      <div className="App-content">
        <div className="App-header">
          <UserHeader username={'Morgan Smith'} avatarUrl={icon} />
        </div>
        <div className="main-content">
          <Section title="Meta Page Issue" onClick={() => alert('meta page')} />
          <Section
            title="Specific Issue"
            onClick={() => alert('specific issue')}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
