import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import {FaEthereum} from 'react-icons/fa'
const Header = () => {
  return (
   <>
    <div className='navbar'>
    <div className='logo'>
       <FaEthereum color="rgb(75, 193, 190)" size={"30"} />
        <h1>CryotoPilot</h1>
    </div>
        <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/coin'>COINS</Link></li>            
        </ul>
    </div>
   </>
  )
}

export default Header
