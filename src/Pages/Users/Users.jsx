import React from 'react'
import LeftsideBar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from './UsersList'
import { useLocation } from "react-router-dom";
const Users = () => {
  const location = useLocation()
  return (
    <div className='home-container-1'>
      <LeftsideBar />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
      <h1 style={{ fontWeight: "400" }}>Users</h1>
        <UsersList />
      </div>
    </div>
  )
}

export default Users;