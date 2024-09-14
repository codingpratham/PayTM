import React from 'react'
import Appbar from '../Components/Appbar'
import Balance from '../Components/Balance'
import { Users } from '../Components/User'


const Dashboard = () => {

  return (
    <div>
      <Appbar/>
      <div className='m-8'>
          <Balance value={1000}/>
          <Users/>
      </div>
    </div>
  )
}

export default Dashboard