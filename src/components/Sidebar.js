import React from 'react'
import cover from '../assets/cover.png'
function Sidebar() {
    return (
       
            <div className="flex justify-end bg-red-800">
                <div className="w-40 h-screen bg-darkpurple ">

                </div>
                <div className="absolute top-0 right-0 h-screen w-1/5 flex mr-8">
                    <div className="bg-peach self-center">
                        <img src={cover} alt="" />
                    </div>
                    
                </div>
            </div>
            
       
    )
}

export default Sidebar
