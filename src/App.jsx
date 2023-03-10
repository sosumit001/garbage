import './App.css'

import { useContext } from 'react'
import { AuthContext } from './context/auth'
import { Link } from 'react-router-dom'

// import RoundSpin from './pageAttributes/RoundSpin'

function App() {
  // const [scale,setScale] = useState(0)
  // const [scrolly,setScrolly] = useState(0)
  const {user} = useContext(AuthContext)

  const handlePageScroll = (event) => {
    setScrolly(event.target.scrollTop)
  }

  // const handleMouseMove = (event) => {
  //   var customPointer = document.querySelector(".circular-text")
  
  //   customPointer.style.top = (scrolly + event.clientY - 20) + "px"
  //   customPointer.style.left = event.clientX - 40 + "px"
 
  // }

  const handeCreateMouseMove = (event) => {
    event.target.style.setProperty('--left-eff',`${event.clientX}px`)
  }
  const handeCreateMouseEnter = (event) => {
    event.target.style.setProperty('--scale-effect','1')
    event.target.style.setProperty('--top-eff','-260px')
    event.target.style.setProperty('--radius-eff','10px')

  }
  const handeCreateMouseLeave = (event) => {
    event.target.style.setProperty('--scale-effect','0')
    event.target.style.setProperty('--top-eff','-90px')
    event.target.style.setProperty('--radius-eff','40%')
  }
  const handlebuildingBtn = () => {
    window.location.href = '/signup'
  }

  return (
    <div className="app">
      {
      user?(
      <div>
        <h2>start building...</h2>
        <span>go to </span>
        <Link to={'/edit'}>edit page</Link>
      </div>
      ):(
        <div id = "appWrapper" onScroll={handlePageScroll}>
        
        <div className='page-second' >
           <div>
           <h1>Linktree</h1>
           <h2>create your Linktree in just minutes</h2>
           <span style={{width:"80%", margin:"auto",textAlign:"right"}}> customize your own Linktree in just minutes! Our platform makes it easy for you to share all your important links in one place, so your followers and clients can easily access your content, social media, and products</span>
           <button onClick={handlebuildingBtn} onMouseLeave={handeCreateMouseLeave} onMouseEnter={handeCreateMouseEnter} onMouseMove={handeCreateMouseMove}>start building</button>
           </div>
        </div>
        
        {/* <div className='test_ page-first'>
        <article>
          
          <h2>Add <span style={{color:"blue", fontSize:"2.2rem"}} >Links</span> in One <span style={{color:"blue", fontSize:"2.2rem"}} >Place</span></h2>
          <p style={{width:"80%", margin:"auto"}}> This is where you can customize your Linktree to showcase the links and content that matter most to you. Add, remove, or rearrange the links to your social media profiles, website, and other pages. Choose from a variety of collect types to highlight your content, such as photos, videos, music, and more. With your personalized Linktree, you can make it easy for your followers to find what they're looking for. Make your changes now and save your updated Linktree!</p>
         </article>
         <RoundSpin scale = {scale} size = {80} text = {"ARTFUL "} />
        </div> */}
        </div>
        
      )
      }
    </div>
  )
}


export default App
