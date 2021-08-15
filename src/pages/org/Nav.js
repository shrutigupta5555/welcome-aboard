import React from 'react'

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

    const handleLogOut = (e) => {
        e.preventDefault()

        auth.signOut().then(
            history.replace('/')
        )
    }

    return (
        <div className="flex justify-end  text-white align-middle gap-12">
            <Link className="self-center" to="/post-job">Post A Job</Link>
            <button className="bg-darkpurple  text-white px-9 py-2 rounded-3xl self-center" onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default Nav
