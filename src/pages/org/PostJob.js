import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar'
import Checkbox from '@material-ui/core/Checkbox';
import CheckBox from '../../components/Checkbox';
import {db, auth, storage} from '../../utils/firebase';
import { Redirect, useHistory } from 'react-router-dom';

function PostJob() {
     //user
     const [user, setuser] = useState(null)

     const [title, settitle] = useState("")
     const [salary, setsalary] = useState("");
     const [loc, setloc] = useState("");
     const [deadline, setdeadline] = useState("")
     const [qualification, setqualification] = useState("")
     const [addl, setaddl] = useState("")
     const [link, setlink] = useState("")
 
   
 
     const history = useHistory();
 
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

     const handleSubmit = async (e) => {
         e.preventDefault()
         const newItem = {

            title : title,
            salary : salary,
            loc : loc,
            deadline : deadline,
            qualification: qualification,
            addl :addl,
            benefits : checkList,
            link: link,
            email : user.email
         }
         db.collection('jobs').add(newItem).then((res) => {
             console.log(res)
            history.goBack()}).catch((err) => console.log(err))
     }

     const OPTIONS = [
        {
            id: 'a',
            name : 'Health Insurance'
        },
        {
            id: 'b',
            name : 'Vision Insurance'
        },
        {
            id: 'c',
            name : 'Dental Insurance'
        },
        {
            id: 'd',
            name : 'Maternity Leave'
        },
        {
            id: 'e',
            name : 'Short Term Disability'
        },
        {
            id: 'f',
            name : 'Long Term Disability'
        },
        {
            id: 'g',
            name : 'Menstrual Leave'
        },
        {
            id: 'h',
            name : 'Vacation Policy (10+ days)'
        },
        {
            id: 'i',
            name : 'Vacation Policy (less than 10 days)'
        },
        {
            id: 'j',
            name : 'Vacation Policy (unlimited'
        },
        {
            id: 'k',
            name : 'Professional Growth Stipend'
        },
        {
            id: 'l',
            name : 'Cell Phone reimbursement'
        },
        {
            id: 'm',
            name : 'Technology equipement stipend'
        },
        {
            id: 'n',
            name : 'Internet stipend'
        },
        
    
    ]
    return (
        <div className="my-5 w-10/12 sm:w-1/2 m-auto max-w-lg">
        <h3 className="text-2xl font-medium font-poppins"  >Post A Job</h3>
        <form className="mt-10" action="">
            <br />
            
           
            
                    <div className="mr-5">
                        <label htmlFor="" className="mt-5 text-tbtext text-gray-700">
                            Job Title
                        </label>
                        <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={title} onChange={(e) => settitle(e.target.value)}/>
                    </div>
                   
                        <label htmlFor="" className="mt-5 text-tbtext text-gray-700">
                            Salary (in USD)
                        </label>
                        <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="number" name="" id="" value={salary} onChange={(e) => setsalary(e.target.value)}/>
                   

                  
                        <p className="text-darkpurple text-xs font-bold mb-10">We believe in transparent hiring.All salaries and salary ranges are required to post a job on Black Remote She</p>
                   
                



                <label htmlFor="" className="mt-15 text-tbtext text-gray-700">
                           Location Requirement (if any)
                    </label>
                    <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={loc} onChange={(e) => setloc(e.target.value)}/>
                   
                   <br />
                   <br />
                   <br />
               
                <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                    Deadline
                </label>
                <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="date" name="" id="" value={deadline} onChange={(e) => setdeadline(e.target.value)}/>
                
                <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                    Qualifications Required
                </label>
                <input  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={qualification} onChange={(e) => setqualification(e.target.value)}/>
                
                

                <div class="w-full py-3">
                    <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                        Benefits
                    </label>
                
                    {OPTIONS.map(data => {
                        return  <CheckBox handleCheckboxChange={handleCheckboxChange} {...data} />
                    })}
                </div>


                <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                    Additional Benefits
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id=""  value={addl} onChange={(e) => setaddl(e.target.value)}/>
               

                <label htmlFor="" className="block mt-5 text-tbtext text-gray-700">
                    Link To Apply
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full my-1 py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purpleaccent"  type="text" name="" id="" value={link} onChange={(e) => setlink(e.target.value)}/>
               

                
                
         
<br /><br /><br />
            <button className="bg-lightpurple text-white px-8 py-3 rounded-3xl"  onClick={(e) => {handleSubmit(e)}}>Submit</button>
        </form>
    </div>
    )
}

export default PostJob
