import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
function Home() {
    return (
        <div className="flex justify-between w-full">
            <div className=" m-auto max-w-xl">
                <div className="-mt-32">
                    <img src={logo} alt="" />
                </div>

                <div className="ml-16  mt-10">
                   <p className=" font-poppins text-4xl font-medium">A community for Black queer and trans women, nonbinary people and allies interested in working remotely.</p> 
                </div>

                <button className="bg-lightpurple text-white px-8 py-3 rounded-3xl mt-10 ml-16"> <Link to="/sign-up-user"> Sign Up As Individual</Link></button>
                <button className="border-2 border-lightpurple  px-8 py-3 rounded-3xl mt-10 ml-16"> <Link to="/sign-up-org"> Sign Up As Organization</Link></button>
            </div>
            <Sidebar/>
        </div>
    )
}

export default Home
