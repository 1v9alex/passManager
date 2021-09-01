import React from 'react';
import { MdPerson } from 'react-icons/md';
import SidebarItem from './SidebarItem';
import Icon from '../../../assets/icons/24x24.png';

export default function Sidebar() {
  return (
    <div id="sideBar">
      <SidebarItem icon={Icon} text={'Accounts'} linkTo="/" />
      <SidebarItem icon={Icon} text={'Settings'} linkTo="/settings" />
    </div>
  );
}
