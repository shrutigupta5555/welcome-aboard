import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar'
import {db, auth, storage} from '../../utils/firebase';
import { Redirect, useHistory } from 'react-router-dom';
import CheckBox from '../../components/Checkbox';


function PortfolioSetUp() {

    //user
    const [user, setuser] = useState(null)

   
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [bio, setbio] = useState("")
    const [job, setjob] = useState("")
    const [company, setcompany] = useState("")
    const [hs, seths] = useState("")
    const [hsdesc, sethsdesc] = useState('')
    const [clg, setclg] = useState("")
    const [clgdesc, setclgdesc] = useState('')

    //image
    const [file, setfile] = useState(null);
    const [url, seturl] = useState("")

    const history = useHistory();

    const OPTIONS = [
        {
            id: 'a',
            name : 'FrontEnd Development'
        },
        {
            id: 'b',
            name : 'Backend Development'
        },
        {
            id: 'c',
            name : 'App Development'
        },
        {
            id: 'd',
            name : 'DevOps'
        },
        {
            id: 'e',
            name : 'Video Editing'
        },
        {
            id: 'f',
            name : 'UI/Ux'
        },
        {
            id: 'g',
            name : 'Travel'
        },
        {
            id: 'h',
            name : 'Graphic Design'
        },
        {
            id: 'i',
            name : 'Algorithms'
        },
        {
            id: 'j',
            name : 'Cybersecurity'
        },
        {
            id: 'k',
            name : 'Illustrations'
        },
        {
            id: 'l',
            name : 'Sports'
        },
        {
            id: 'm',
            name : 'Other'
        },
        
        
    
    ]

     //checlist
     const [checkList, setcheckList] = useState([]);

     const handleCheckboxChange = (name,id) => {
        const existElement = checkList.find(e => e.id == id) ;
        const filteredElement = checkList.filter(e => e.id !== id);
        
        const insertedElement = !existElement ? [{name, id}, ...checkList] : filteredElement

        setcheckList(insertedElement);
      
    };


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user) {history.push('/')}
            else {
                setuser(user)
            }
        })
    })

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setfile(image)
    }


    const handleUpload = async (e) => {
        e.preventDefault()

        const newItem = {
            fname : fname,
            lname : lname,
            bio : bio,
            interest : checkList,
            job : job,
            company : company,
            hs: hs,
            hsdesc: hsdesc,
            clg: clg,
            clgdesc: clgdesc
        }

        const username = user.email.split("@")[0]

        const dbRef = db.collection('users').doc(`${username}`);

        dbRef.set(newItem).then(() => {
            const uploadTask = storage.ref(`/images/${username}`).put(file);

            uploadTask.on("state_changed", (snapshot) => {
                console.log(snapshot)
            }, err => {
                console.log(err)
            }, () => {
                storage
                    .ref("images")
                    .child(`${username}`)
                    .getDownloadURL()
                    .then((url => {
                        dbRef.update({url})
                    })).then(() => {
                        history.replace(`/profile/${username}`);
                    })
            })
        }).catch(error => console.log(error))
    }
    return (
       
            <div className="flex justify-between">
                <div className="my-5 w-10/12 sm:w-1/2 m-auto max-w-lg">
                    <h3 className="text-2xl font-medium font-poppins"  >Complete your profile</h3>
                    <form className="mt-10" action="">
                        <br />
                        {/* <h5 className="text-darkpurple font-bold">Account Owner Details</h5> */}
                        <div className="">
                        <div className="flex mt-5">
                                <div className="mr-5">
                                    <label htmlFor="" className="mt-5 text-tbtext text-gray-700">
                                        First Name
                                    </label>
                                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={fname} onChange={(e) => setfname(e.target.value)}/>
                                </div>
                                <div className="">
                                    <label htmlFor="" className="mt-5 text-tbtext text-gray-700">
                                        Last Name
                                    </label>
                                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={lname} onChange={(e) => setlname(e.target.value)}/>
                                </div>

                              
    
                               
                            </div> 



                            <label htmlFor="" className="mt-5 text-tbtext text-gray-700">
                                       Bio (A Brief Introduction)
                                </label>
                                <textarea rows="5"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={bio} onChange={(e) => setbio(e.target.value)}/>
                               
                               <br />
                               <br />
                               <br />

                            <h5 className="text-darkpurple font-bold">Interests</h5>
                            <div class="w-full py-3">
                    
                
                                {OPTIONS.map(data => {
                                    return  <CheckBox handleCheckboxChange={handleCheckboxChange} {...data} />
                                })}
                            </div>


                            <h5 className="text-darkpurple font-bold mt-5">Past Experiences</h5>
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Job Title
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={job} onChange={(e) => setjob(e.target.value)}/>
                            
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Name
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={company} onChange={(e) => setcompany(e.target.value)}/>
                            

                            <h5 className="text-darkpurple font-bold mt-5">Professional Background</h5>


                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Do you have a high school diploma or GED? (Yes/No)
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={hs} onChange={(e) => seths(e.target.value)}/>
                            <label htmlFor="" className="mt-2 text-tbtext text-gray-700">
                                      Please Share a brief explanation (If Not)
                                </label>
                            <textarea rows="5"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={hsdesc} onChange={(e) => sethsdesc(e.target.value)}/>


                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Did you go to college/trade school? (Yes/No)
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={clg} onChange={(e) => setclg(e.target.value)}/>
                            <label htmlFor="" className="mt-2 text-tbtext text-gray-700">
                                      What did you do Instead? (Tip: Tell us a brief story about your travel experience or exciting project) (If Not)
                                </label>
                            <textarea rows="5"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={clgdesc} onChange={(e) => setclgdesc(e.target.value)}/>
                               

                            
                          
                            <div class="w-full px-3 py-3">
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Profile Picture
                            </label>
                                <input type="file" onChange={handleImageAsFile}/>
                            </div>
                            
                        </div>

                        <button className="bg-lightpurple text-white px-8 py-3 rounded-3xl" onClick={(e) => handleUpload(e)}>Submit</button>
                    </form>
                </div>
               <Sidebar />
            </div>
        )
    
}

export default PortfolioSetUp
