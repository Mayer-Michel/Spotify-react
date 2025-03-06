import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import { IMG_LOGO } from '../../constants/appConstant';

const Sidebar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    // On récupère l'id de l'user er la methode signOut du context
    const { userId, signOut } = useAuthContext();
    // On récupère le hook de navigation
    const navigate = useNavigate();

    // On crée la méthode de deconnexion
    const handleLogout = () => {
        signOut();
        navigate('/');
    }

    return (
        <>
            {/* nabar pour la vue au dessus de 768px */}
            <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black justify-between'>
                <div>
                    <img src={IMG_LOGO} alt="Logo Spotify" className='w-full h-14 object-contain' />
                    <h2 className='text-lg text-white font-semibold mt-10'>Albums</h2>
                </div>
            </div>
            {/* gestion des icones pour ouvrir/fermer le menu en petit ecran */}

            {/* navbar pour la vue en dessous de 768px */}
        </>
    )
}

export default Sidebar