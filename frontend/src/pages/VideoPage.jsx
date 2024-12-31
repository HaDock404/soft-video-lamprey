import '../styles/videopage.css'
import HouseIcon from '../components/HouseIcon.jsx'
import { Link } from 'react-router-dom'

function VideoPage() {
    return (
        <section className="videopage">
            <Link to='/' className="videopage_button_home">
                <HouseIcon />
                Home
            </Link>
            Welcome in video Page
        </section>
    )
}

export default VideoPage