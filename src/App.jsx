import React from 'react';
import { Outlet } from 'react-router-dom';
import { USER_INFO } from './constants/appConstant'
import useAuthCheck from './hooks/useAuthCheck';
import Topbar from './components/Ui/Topbar';
import Sidebar from './components/Ui/Sidebar';
import { useSelector } from 'react-redux';
import MusicPalyer from './components/MusicPlayer';



const App = () => {
  // On récupère les infos de l'user dans le localstorage
  const user = JSON.parse(localStorage.getItem(USER_INFO));
  // On vérifie que l'utilisateur en session est bien le bon
  useAuthCheck(user);
  // On récupère le state activeSong du slice player
  const { activeSong } = useSelector(state => state.player)

  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gardient-to-b from-black to-[rgb(18,18,18)]'>
        <Topbar />
        <div className='h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40 text-white'>
            <Outlet />
          </div>
        </div>
      </div>
      {/* on affiche le player */}
      {activeSong?.title && (
        <div className='absolute h-28 bottom-0 left-0 right-0 animate-slideup bg-gradient-to-br from-white_01 to-black backdrop-blur-lg rounded-t-3xl z-10'>
          <MusicPalyer />
        </div>
      )}
    </div>
  )
}

export default App