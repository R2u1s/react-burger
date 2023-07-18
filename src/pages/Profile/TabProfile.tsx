import React from 'react';
import styles from './Profile.module.css';

const TabProfile: React.FC<{
  active: boolean,
  onClick: () => void,
  extraclass: string,
  text: string
}> = ({ active, onClick, extraclass, text }) => {

  const className = active ?
    `${styles['profile-nav-element']} ` :
    `${styles['profile-nav-element']} text_color_inactive `;

  return (
    <li className={className + extraclass} onClick={onClick}>
      {text}
    </li>
  );
}

export default TabProfile;