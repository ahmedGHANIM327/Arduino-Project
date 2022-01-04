import './Home.css';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    return (
        <div id="home">
            <Button className='connexion' variant="contained" endIcon={<ArrowRightIcon />} onClick={() => navigate('/notifyme/')} color="error">Connexion</Button>
            <h1>Notify Me</h1>
        </div>
    )
}
