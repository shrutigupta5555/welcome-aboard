import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div className="max-w flex shadow-md p-4 justify-between relative">
            <div className="flex justify-items-start lg:ml-48">
                <div className="bg-accent rounded-full h-8 w-8"></div>
                <Link to="/home" className="lg:mx-3 md:mx-3 mx-4">Dos Sistas</Link>
            </div>

           
                <div className="justify-items-end lg:pr-96  pr-64 md:block hidden">
                    <Link to="/products" className="mx-6">Browse</Link>
                    <Link to="/cart">My Cart</Link>
                    <button className="mx-6" >Log Out</button>
            </div>

            

           
        </div>
    )
}

export default Navbar
