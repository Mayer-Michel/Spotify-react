import React from 'react'
import { useSelector } from 'react-redux'
import AlbumCard from '../Card/AlbumCard'

const AlbumSuggestion = ({ albumByGenre }) => {
  const { isPlaying, activeSong } = useSelector((state) => state.player)
  return (
    <div className='flex flex-col w-full mt-16'>
      <h2 className='text-xl font-bold text-white py-3'>Dans le même genre:</h2>
      <div className='flex flex-wrap items-center w-full '>
        {albumByGenre && albumByGenre.map((album, index) => (
          <div key={index} className='m-5'>
            <AlbumCard
              data={album}
              songs={album.songs}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={0}
            />
          </div>
        ))}

      </div>
    </div>
  )
}

export default AlbumSuggestion