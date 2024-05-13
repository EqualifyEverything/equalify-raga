import React from 'react';
import icon from '../../assets/img/icon-128.png';
import UserHeader from '../../containers/UserHeader/UserHeader';
import './Popup.css';
import { AuthContextProvider } from '../../providers/AuthProvider';

// define the Section Props
interface SectionProps {
  title: string;
  onClick: () => void;
}

// define a Section that receives a title and onClick function
const Section = ({ title, onClick }: SectionProps) => {
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
  const issueClicked = (issueType: string) => {
    console.info(`issue clicked: ${issueType}`);
    alert(`logging: ${issueType}`);
  };

  return (
    <AuthContextProvider>
      <div className="App">
        <div className="App-content">
          <div className="App-header">
            <UserHeader />
          </div>
          <div className="main-content">
            <Section
              title="Meta Page Issue"
              onClick={() => issueClicked('meta page')}
            />
            <Section
              title="Specific Issue"
              onClick={() => issueClicked('specific issue')}
            />
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default Popup;
