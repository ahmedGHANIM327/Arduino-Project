import {useState} from 'react';
import App from '../App'
import './Home.css'

export default function Home() {

    const [homePage , setHomePage] = useState(true);

    const goDashboard = () => {
        setHomePage(false);
    }

    return (
        <div id="home">
            
        </div>
    )
}
