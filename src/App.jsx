import React from 'react'
import { Outlet } from 'react-router-dom'
import { USER_INFO } from './constants/appConstant'
import useAuthCheck from './hooks/useAuthCheck';
import Sidebar from './components/Ui/Sidebar';

const App = () => {
  // On récupère les infos de l'user dans le localstorage
  const user = JSON.parse(localStorage.getItem(USER_INFO));
  // On vérifie que l'utilisateur en session est bien le bon
  useAuthCheck(user);
  return (
    <div className='relative flex'>
      <Sidebar />
     <div className='flex-1 flex flex-col bg-gardient-to-b from-black to-[rgb(18,18,18)]'>
      {/* TODO: appeler la Topbar */}
      <div className='h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
        <div className='flex-1 h-fit pb-40 text-white'>
          <Outlet />
        </div>
      </div>
     </div>
     {/* TODO: afficher le player */}
    </div>
  )
}

export default App