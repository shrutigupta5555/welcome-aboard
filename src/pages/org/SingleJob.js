import React, {useState, useEffect} from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
    Redirect
  } from "react-router-dom";

  import {db,auth,storage} from '../../utils/firebase';

function SingleJob() {
    const p = useParams();
    const params = p.jobid;

    const [title, settitle] = useState("")
    const [salary, setsalary] = useState("");
    const [loc, setloc] = useState("");
    const [deadline, setdeadline] = useState("")
    const [qualification, setqualification] = useState("")
    const [addl, setaddl] = useState("")
    const [link, setlink] = useState("")


    const [benefits, setbenefits] = useState([])

    const history = useHistory();
 

    useEffect(() => {
        db.collection('jobs').doc(`${params}`).get().then((docs) => {
            console.log(docs.data())
            if(!docs.exists) {history.push('/error')}
            else {
                // console.log(docs.data())
                settitle(docs.data().title)
                setsalary(docs.data().salary)
                setloc(docs.data().loc)
                setdeadline(docs.data().deadline)
                setqualification(docs.data().qualification)
                setaddl(docs.data().addl)
                setlink(docs.data().link)
                setbenefits(docs.data().benefits)
            }
        })
        
    }, [])


    return (
        <div className="max-w-5xl mx-auto px-5 py-7">
            <h3 className="text-2xl font-semibold font-poppins">Job Description</h3>

            <div className="flex justify-start gap-52 mt-5">
                <p className="text-lg font-medium">{title}</p>
                <p className="text-darkpurple">${salary}</p>

            </div>

            <div className="flex text-lightpurple font-medium text-sm justify-start gap-4 mt-3">
                       <LocationOnIcon className="text-midtext text-xs"/>
                       <p className="text-midtext ">{loc}</p>
             </div>

             <div className="justify-start gap-4 mt-7">
                <p className="text-lightpurple  font-medium">Deadline: <span className="text-gray-600">{deadline}</span> </p>

             </div>

             <p className="text-lightpurple  font-medium mt-10">Qualifications Required:</p>
             <p className="text-gray-500">{qualification}</p>

             <p className="text-lightpurple  font-medium mt-8">Benefits</p>
             {benefits.map(item => {
                return <ol className="text-gray-500">{item.name}</ol>
             })}

             

             <p className="text-lightpurple  font-medium mt-8">Additional Benefits</p>
             <p className="text-gray-500">{addl}</p>

             
             <button className="bg-darkpurple mt-4 text-white px-9 py-2 rounded-3xl"> <a href={link}>Apply</a> </button>

        </div>
    )
}

export default SingleJob
