import React, { useEffect, useState } from 'react';

const App = () => {
  // const user ={
  //   'lastname': 'Doe',
  //   'firstname': 'John',
  //   'age': 24
  // }

  useEffect(() => {
    // comportement lors du montage du composant
    setFirstname('Tata');
    return () => {
      // comportement lors du démontage du composant
    }
  }, []);


  const [firstname,setFirstname] = useState('Toto');
  const [isActive,setIsActive] = useState(false);
  console.log('Hello world !');
  const handleFirstname = () => {
    const name = firstname == 'Tata' ? 'John' : 'Julien';
    setFirstname(name);
  };

  const toggleState = () => {
    setIsActive(!isActive);
  }

  const state = isActive ? "Est actif" : "N'est pas actif";
  return (
    // <Test name={user} title={"Hello World"}/>
    <div>
      <p className="cursor-pointer" onClick={()=>{handleFirstname()}}>{ firstname }</p>
      <p className={`${isActive ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500' } p-2 border`}>{state}</p>
      <button className='bg-gray-200 px-3 py-2 rounded-lg hover:ng-gray-500 cursor-pointer' onClick={()=>{toggleState()}}>Changer l'état</button>
    </div>
  );
}

export default App