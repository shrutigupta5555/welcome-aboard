import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
    Redirect
} from "react-router-dom";

import {db,auth,storage} from '../utils/firebase';
import Job from '../components/Job';

import LightNav from './user/LightNav'

function JobColl() {

    const [productList, setproductList] = useState([]);

    const [user, setuser] = useState(null);

    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user) {history.push('/')}
            else {
                setuser(user)
            }
        })
    },[])

    const navigate = (item) => {
        console.log(item)
         history.push(`/job-details/${item}`)
    }


    useEffect(() => {
       
        
        if(user){
 
         console.log(user.email)
         db.collection('jobs')
         
         .onSnapshot(snap => {
             let documents = [];
 
             snap.forEach(doc => {
                 documents.push({...doc.data(), id: doc.id})
             })
 
             setproductList(documents)
            //  console.log(documents)
         })
 
     
 }}, [user])
    return (
        <div className="">
            <LightNav></LightNav>
              <div className="max-w-6xl mx-auto px-4 py-7">
                    <h2>Job Opportunities</h2>
                    <br /><br /><br />
                    {productList.map(item => {
                        return <Job key={item.id} navigate={navigate} {...item}/>
                    })}
                </div>

        </div>
      
    )
}

export default JobColl
