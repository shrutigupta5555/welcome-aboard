import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar'
import {db, auth, storage} from '../../utils/firebase';
import { Redirect, useHistory } from 'react-router-dom';


function Setup() {

    //user
    const [user, setuser] = useState(null)

    const [name, setname] = useState("")
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [pos, setpos] = useState("")
    const [website, setwebsite] = useState("")
    const [desc, setdesc] = useState("")
    const [address, setaddress] = useState("")

    //image
    const [file, setfile] = useState(null);
    const [url, seturl] = useState("")

    const history = useHistory();

    


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
            pos : pos,
            website : website,
            address : address,
            desc : desc
        }

        const username = user.email.split("@")[0]

        const dbRef = db.collection('org').doc(`${username}`);

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
                        <h5 className="text-darkpurple font-bold">Account Owner Details</h5>
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
                                       Position at company
                                </label>
                                <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={pos} onChange={(e) => setpos(e.target.value)}/>
                               
                               <br />
                               <br />
                               <br />
                            <h5 className="text-darkpurple font-bold">Company Specific Information</h5>
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Name
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={name} onChange={(e) => setname(e.target.value)}/>
                            
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Website
                            </label>
                            <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={website} onChange={(e) => setwebsite(e.target.value)}/>
                            
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Description
                            </label>
                            <textarea rows="6"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id=""  value={desc} onChange={(e) => setdesc(e.target.value)}/>
                           

                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Address
                            </label>
                            <textarea rows="6"  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={address} onChange={(e) => setaddress(e.target.value)}/>
                           

                            <div class="w-full px-3 py-3">
                            <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                                Company Logo
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

export default Setup
