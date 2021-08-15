import React,{useState, useEffect} from 'react'
import Particles from 'react-particles-js'
import logo from '../../assets/logo.png'
import Nav from './Nav'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
    Redirect
  } from "react-router-dom";

  import {db,auth,storage} from '../../utils/firebase';



function Portfolio() {

    const u = useParams();
    const param = u.username;

    const history = useHistory();

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [bio, setbio] = useState("")
    const [job, setjob] = useState("")
    const [company, setcompany] = useState("")
    
    const [url, seturl] = useState('')
    const [interests, setinterests] = useState([])

    const colors = ['#FFCCCC', '#CCFFE3', '#A4E3EC', '#A4E3EC', 'A4E3EC']


    useEffect(() => {
        db.collection('users').doc(`${param}`).get().then((docs) => {
            console.log(docs.data())
            if(!docs.exists) {console.log(param)}
            else {
                // console.log(docs.data())
                setfname(docs.data().fname)
                setlname(docs.data().lname)
                setbio(docs.data().bio)
                setjob(docs.data().job)
                setcompany(docs.data().company)
                setinterests(docs.data().interest)
                seturl(docs.data().url)
            }
        })
        
    }, [])

    const random = () => {
        return Math.floor(Math.random() * 4)
    }
    return (
        <div className="bg-darkbg  h-screen relative">

            <Nav></Nav>

            <div className="absolute  mx-auto max-w-5xl left-1/2 transform -translate-x-1/2 top-0">

                <div className="pt-10">
                    
                    <img src={url} className="w-40 mx-auto object-cover  h-40  rounded-full"  alt="" />
                    

                </div>

                <h2 className="font-semibold text-3xl mt-8 text-white text-center">Hi, I'm {fname} {lname}.</h2>

                <p className="text-gray-100 opacity-75 my-3.5 text-center">{bio}</p>


                <div className="flex flex-wrap mt-8 gap-5">
                    {
                        interests.map(item => {
                            return <span className="px-4 py-1 rounded-3xl"  style={{backgroundColor: colors[random()]}}>{item.name}</span>
                        })
                    }
                    
                </div>


                <h3 className="font-medium text-xl mt-24 text-white text-center">Cool Things I've Done.</h3>
                <div className="bg-gray-100 px-4 py-1 rounded-2xl md:w-1/2 w-full">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium">{job}</p>
                      

                    </div>
                    <p className="text-darkpurple font-semibold">{company}</p>
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
