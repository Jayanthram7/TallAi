import React from 'react'
import Navbar from "./Navbar"
import Hero from "./Hero"
import Features from "./Features"
import Navbar1 from "./NavbarAL"
import NavbarAdmin from "./NavbarAdmin"

const HomePage = () => {
  return (
    <div className="">
        <NavbarAdmin/>
        <Hero/>
        <Features/>
    
    </div>
  )
}

export default HomePage