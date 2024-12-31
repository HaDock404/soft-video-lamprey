import '../styles/homepage.css'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <article className='welcome_article'>
            <h1 className='welcome_title'>Welcome Back!</h1>
            <div className='welcome_text'>Dont' forget to plug your video capture card and join us 😉 !</div>
            <Link to="/video" className='welcome_button'>Join</Link>
        </article>
    )
}

export default Welcome