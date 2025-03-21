import { useState, useEffect, useContext } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import "../styles/Search.css"
import plus from "../assets/plus-solid.svg"
import minus from "../assets/minus-solid.svg"
import Card from '../components/Card';
import Candidate from '../interfaces/Candidate.interface';
import { UserContext } from '../components/UserContext';


// use searchGithub to get a random list of users
// plug data.user into searchGithubUser for profile data
// plug data into card
// when button is pressed useEffect runs function again to generate new data
// when yes is pressed, send data to saved candidates

// useState yes pressed? true or false
// no pressed? true or false
// if true useEffect triggers
// useEffect generates new list of users and resets states to false
const CandidateSearch = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext undefined.");
  }
  const { savedUsers, setSavedUsers } = userContext;
  const [selectedYes, setSelectedYes] = useState(false);
  const [selectedNo, setSelectedNo] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [userData, setUserData] = useState<Candidate | null>(null);

  
  useEffect(() => {
    if(selectedYes && !isInitialMount) {
        setSelectedYes(false);
        findUserData()
    }
    setIsInitialMount(false);
  }, [selectedYes])

  useEffect(() => {
    if(selectedNo && !isInitialMount) {
      setSelectedNo(false);
      findUserData()

    }
    setIsInitialMount(false);
  }, [selectedNo])


  async function handleYesChange() {
    setSelectedYes(!selectedYes);
    if (userData) {
      const updatedSavedUsers = [...savedUsers, userData];
      setSavedUsers(updatedSavedUsers);
      localStorage.setItem('savedUsers', JSON.stringify(updatedSavedUsers))
    }
  }

  function handleNoChange() {
    setSelectedNo(!selectedNo)
  }

  async function findUserData() {
    const userList = await searchGithub();
    if (userList.length === 0) {
      setUserData(null);
      return;
    }
    const username = userList[0].login;
    try {
      const user = await searchGithubUser(username);
      if (!user) {
        setUserData(null);
        return;
      }
      // console.log('this is the user data:', user)
      setUserData(user)
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  }

  useEffect(() => {
    findUserData();
    
  }, [])

if (userData?.id === undefined) {
   return(
    <div className='error-box'>
    <h2>No more candidates available to display...</h2>
    <p>Try refreshing the page</p>
    </div>
  )
} else {
  return (
    <>
      <h1>Candidate Search</h1>
    
      <Card
        id = {userData?.id || 0}
        avatar_url={userData?.avatar_url || ''}
        name={userData?.name || ''}
        login={userData?.login || ''}
        location={userData?.location || ''}
        email={userData?.email || ''}
        company={userData?.company || ''}
        bio={userData?.bio || ''}
        html_url={userData?.html_url || ''}
      />
      <div className="options-box">
        <button className='bubble yes' onClick={handleYesChange}>
          <img src={plus} alt="plus sign" className='icon' />
        </button>
        <button className='bubble no' onClick={handleNoChange}>
          <img src={minus} alt="minus sign" className='icon'/>
        </button>
      </div>
    </>
) 
}
 
};

export default CandidateSearch;
