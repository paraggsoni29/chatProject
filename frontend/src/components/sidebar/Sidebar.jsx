import React from 'react'
import SearchInput from "./SearchInput"; // Adjust the path according to your folder structure
import Converstaions from './Converstaions';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput/>
      <div className='divider px-2'> </div>
      <Converstaions/>
      <LogoutButton/> 


    </div>
  )
}

export default Sidebar
