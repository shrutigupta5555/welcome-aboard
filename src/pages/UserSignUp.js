import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import { auth } from "../utils/firebase";
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function UserSignUp() {

    const [email , setEmail ] = useState("")
    const [pass, setPass] = useState("")
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, pass)
          .then((user) => {
            console.log(user);
            history.push("/user/setup");
          })
          .catch((err) => {
            console.log(err);
          });
    }
    return (
        <div className="flex justify-between">
        <div className="my-5 w-1/2 m-auto max-w-lg">
            <h3 className="text-2xl font-medium font-poppins"  >Create an account</h3>
            <form className="mt-10" action="">
                <div className="">
                   <label htmlFor="" className="block mt-5 text-tbtext">
                         Email Address
                    </label>
                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightpurple"  type="text" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="" className="block mt-5 text-tbtext">
                        Password
                    </label>
                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="password" name="" id="" value={pass} onChange={(e) => setPass(e.target.value)}/>
                
                    <label htmlFor="" className="block mt-5 text-tbtext">
                        Confirm Password
                    </label>
                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="password" name="" id="" value={pass} onChange={(e) => setPass(e.target.value)}/>
                
                </div>
                <button className="bg-lightpurple text-white px-8 py-3 rounded-3xl mt-10" onClick={(e)=>handleLogin(e)}>Sign Up</button>

                <p className="mt-5 text-darkpurple"><Link to="/user-login">Already a User? Sign In</Link></p>
            </form>
        </div>
       <Sidebar />
    </div>

    )
}

export default UserSignUp
