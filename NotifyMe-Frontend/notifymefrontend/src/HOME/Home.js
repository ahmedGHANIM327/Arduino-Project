import {useState} from 'react';
import './Home.css';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [homePage , setHomePage] = useState(true);

    const goDashboard = () => {
        setHomePage(false);
    }

    const navigate = useNavigate();

    return (
        <div id="home">
            <Button className='connexion' variant="contained" endIcon={<ArrowRightIcon />} onClick={() => navigate('/notifyme/')} color="error">Connexion</Button>
        </div>
    )
}
