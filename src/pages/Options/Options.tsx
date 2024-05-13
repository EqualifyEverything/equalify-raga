import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="OptionsContainer">
      <div>{title} Page</div>
      <div>Manage keyboard shortcuts here!</div>
    </div>
  );
};

export default Options;
