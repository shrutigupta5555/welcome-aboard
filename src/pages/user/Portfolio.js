import React from 'react'
import Particles from 'react-particles-js'
import logo from '../../assets/logo.png'
function Portfolio() {

    const colors = ['#FFCCCC', '#CCFFE3', '#A4E3EC', '#A4E3EC', 'A4E3EC']

    const random = () => {
        return Math.floor(Math.random() * 4)
    }
    return (
        <div className="bg-darkbg  h-screen relative">

            <div className="absolute  mx-auto max-w-5xl left-1/2 transform -translate-x-1/2 top-0">

                <div className="pt-10">
                    
                    <img src={logo} className="w-40 mx-auto   h-40  rounded-full"  alt="" />
                    

                </div>

                <h2 className="font-semibold text-3xl mt-8 text-white text-center">Hi, I'm Sara James.</h2>

                <p className="text-gray-100 opacity-75 my-3.5 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sit assumenda doloremque repellat deleniti dolorem, quae vitae accusantium iure perspiciatis dignissimos nobis. Rerum, illo placeat. Ratione deserunt pariatur rem iure.</p>


                <div className="flex mt-8 gap-5">
                    <span className="px-4 py-1 rounded-3xl"  style={{backgroundColor: colors[random()]}}>Python</span>
                </div>


                <h3 className="font-medium text-xl mt-8 text-white text-center">Cool Things I've Done.</h3>
                <div className="bg-gray-100 px-4 py-1 rounded-2xl md:w-1/2 w-full">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium">Developer Relations</p>
                      

                    </div>
                    <p className="text-darkpurple font-semibold">Zanie Co</p>
                </div>                
                


            </div>


            
            
            <Particles
                className="h-screen"
                params={{
                    particles: {
                    color: {
                        value: "#ffffff"
                    },
                    line_linked: {
                        color: {
                        value: "#ffffff"
                        }
                    },
                    number: {
                        value: 50
                    },
                    size: {
                        value: 3
                    }
                    }
                }}
            />
            
        </div>
    )
}

export default Portfolio
