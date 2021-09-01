import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  text: string;
  icon?: any;
  linkTo: string;
}

export default function SidebarItem(props: SidebarProps) {
  const navigate = useNavigate();

  const switchPage = () => {
    navigate(props.linkTo);
  };

  return (
    <div onClick={switchPage} className={'sideBarItem'}>
      {props.icon && <img src={props.icon}></img>}
      <div style={{ marginLeft: 6 }}>{props.text}</div>
    </div>
  );
}
