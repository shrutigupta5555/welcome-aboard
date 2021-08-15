import React, {useState, useEffect} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
    Redirect,
    Link
  } from "react-router-dom";

  import {db,auth,storage} from '../../utils/firebase';

function Nav() {

    const history = useHistory()

    const [user, setuser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user) {history.push('/')}
            else {
                setuser(user)
            }
        })
    })


    const handleLogOut = (e) => {
        e.preventDefault()

        auth.signOut().then(
            history.replace('/')
        )
    }

    return (
        <div className="flex justify-end  text-white align-middle gap-12">
            <Link className="self-center" to="/browse-jobs">Browse Jobs</Link>
            <a className="self-center" target="_blank" href="https://www.overleaf.com/">Resume Templates</a>
            {user ?  
                <button className="bg-darkpurple  text-white px-9 py-2 rounded-3xl self-center" onClick={handleLogOut}>Log Out</button> : ""
            }
        </div>
    )
}

export default Nav