import React, {useState, useEffect} from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import pfp from '../../assets/logo.png'
import Job from '../../components/Job'
import Nav from '../org/Nav'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory,
    Redirect
  } from "react-router-dom";

  import {db,auth,storage} from '../../utils/firebase';


function Profile() {
    const u = useParams();
    const param = u.username;

    const history = useHistory();

    const [user, setuser] = useState(null)

    const [name, setname] = useState("")
    const [website, setwebsite] = useState("")
    const [pfp, setpfp] = useState("")
    const [desc, setdesc] = useState("")
    const [loc, setloc] = useState("")

    const [email, setemail] = useState("")


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user) {history.push('/')}
            else {
                setuser(user)
            }
        })
    },[])

    useEffect(() => {
        db.collection('org').doc(`${param}`).get().then((docs) => {
            console.log(docs.data())
            if(!docs.exists) {console.log('/error')}
            else {
                // console.log(docs.data())
                setpfp(docs.data().url)
                setname(docs.data().name)
                setwebsite(docs.data().website)
                setdesc(docs.data().desc)
                setloc(docs.data().address)
                setemail(docs.data().email)
                
            }
        })
        
    }, [])

    const [productList, setproductList] = useState([]);

    useEffect(() => {
       
        
       if(user){

        console.log(user.email)
        db.collection('jobs')
        .where("email", "==" ,user.email)
        .onSnapshot(snap => {
            let documents = [];

            snap.forEach(doc => {
                

                documents.push({...doc.data(), id: doc.id})
            })

            setproductList(documents)
            console.log(documents)
        })

    
}}, [user])
    

       const navigate = (item) => {
           console.log(item)
            history.push(`/job-details/${item}`)
       }

        

    return (
        <div className="h-screen">

            
        
            <div className="w-full relative">
                <div className="bg-lightpurple w-full ">
                    <div className="pt-5">
                    <Nav></Nav>
                    </div>
                    
                    <div className="flex py-10  pr-16 max-w-7xl mx-auto  justify-end">
                        <div className=" flex-col gap-4 flex justify-center">
                           
                            <button className="border-white border-2 text-white px-8 py-3 rounded-3xl"> <a target="_blank" href={website}>Visit Website</a> </button>
                        </div>
                        

                    </div>

                </div>
                

                <div className="sm:px-12 px-0 max-w-7xl mx-auto flex align-middle flex-wrap justify-evenly relative">
                    <div className="flex w-2/3   justify-start gap-4">
                        <div className="sm:w-24 w-16 mr-4 md:mr-8">
                            <img src={pfp} alt="" className="absolute -top-1/4 rounded-full sm:w-28 sm:h-28 w-20"/>
                        </div>
                        <div className="w-100">
                            <h2 className="text-black text-xl sm:text-2xl">{name}</h2>
                            {/* <p className="text-purpleaccent">Art and Crafts</p> */}

                        </div>
                    </div>


                   <div className="sm:flex hidden justify-between gap-4 mt-3">
                       <LocationOnIcon className="text-midtext"/>
                       <p className="text-midtext ">{loc}</p>
                   </div>

                </div>

                <div className="max-w-5xl mt-20 text-gray-700 sm:px-12 px-0 mx-auto">
                    <h5 className="text-darkpurple font-bold" >About</h5>

                    <p>{desc}</p>

                </div>

                <div className="max-w-5xl mt-20  text-gray-700 sm:px-12 px-0 mx-auto">
                    <h3 className="text-darkpurple font-bold" >Job Postings</h3>

                    {productList.map(item => {
                        console.log(item)
                        return <Job key={item.id} navigate={navigate} {...item}/>
                    })}
                   


                </div>
              
                       

                   
            </div>

            
           
        </div>
    )

}

export default Profile
