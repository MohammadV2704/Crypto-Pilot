import React from 'react'
import {FallingLines} from 'react-loader-spinner'
const Loader = () => {
  return (

    <div style={{ display:'flex' ,justifyContent:'center',alignItems:'center',height:'100vh',color:'white'}}>

    <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  )
}

export default Loader
