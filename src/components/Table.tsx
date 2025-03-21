import "../index.css"
import "../styles/Search.css"
import minus from "../assets/minus-solid.svg"
import Candidate from "../interfaces/Candidate.interface"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"


export default function Table() {
    const [deletePressed, setDeletePressed] = useState(false)
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext undefined.");
    }
    const { savedUsers, setSavedUsers } = userContext;

    

    function handleDelete(userId: number) {
        setDeletePressed(!deletePressed)
        const updatedUsers = savedUsers.filter((user) => user.id !== userId)
        setSavedUsers(updatedUsers)
        localStorage.setItem('savedUsers', JSON.stringify(updatedUsers))
    }
//delete user in savedUsers array that matches user.id
//set new savedUsers to localStorage
  if (savedUsers.length === 0) {
    return (
        <h2>There are no potential candidates to display.</h2>
    )
  } else {
    return (
   <table className="table">
       <thead>
           <tr>
               <th>Image</th>
               <th>Name</th>
               <th>Location</th>
               <th>Email</th>
               <th>Company</th>
               <th>Bio</th>
               <th>Reject</th>
           </tr>
       </thead>
       <tbody>
       
                {savedUsers.map((user: Candidate) => {
                    return (
                    <tr key={user.id}>
                    <td className="image-cell"><a href={user.html_url} target="_blank" rel="noopener noreferrer"><img className="image" src={user.avatar_url} alt="" /></a></td>
                    <td className="cell"><span>{user.name === null ? user.login : `${user.name} (${user.login})`}</span></td>
                    <td className="cell">Location: {user.location === null ? "N/A" : user.location}</td>
                    <td className="cell">Email: {user.email === null ? ` N/A` :  <a href={`mailto: ${user.email}`}>{user.email}</a>}</td>
                    <td className="cell">Company: {user.company === '' ? ` N/A` : `${user.company}`}</td>
                    <td className="cell">Bio: {user.bio === null ? ` N/A` : user.bio}</td>
                    <td><button className="reject-button" onClick={() => handleDelete(user.id)}><img src={minus} alt="delete button" /></button></td>
                    </tr>)
                })}
       </tbody>
     
   </table>
  )
  }
  
}
