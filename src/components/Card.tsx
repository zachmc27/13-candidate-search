import CandidateProps from "../interfaces/Candidate.interface"

export default function Card(props: CandidateProps) {
    
  return (
    <div className='card'>
        <a className='image-box' href={props.html_url} target="_blank" rel="noopener noreferrer">
            <img className="card-image" src={props.avatar_url} alt="" />
        </a>
        <div className='info-box'>
          <h1 className='title'>{props.name === '' ? `${props.login}` : `${props.name} (${props.login})`}</h1>
          <p className='content'>Location: {props.location === '' ? ` Unknown` : `Location: ${props.location}`}</p>
          <p className='content'>Email: {props.email === '' ? ` Unknown` :  <a href={`mailto: ${props.email}`}>{props.email}</a>} </p>
          <p className='content'>Company: {props.company === '' ? ` Unknown` : `${props.company}`}</p>
          <p className='content'>Bio: {props.bio === '' ? ` Unknown` : props.bio}</p>
        </div>
      </div>
  )
}
