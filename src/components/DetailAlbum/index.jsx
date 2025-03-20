import React from 'react'
import { useParams } from 'react-router-dom'
import HeaderDetail from './HeaderDetail';
import ToolBarDetail from './ToolBarDetail';
import ListAlbumSong from './ListAlbumSong';
import AlbumSuggestion from './AlbumSuggestion';

const DetailAlbum = ({ dataAlbum, albumByGenre }) => {
  return (
    <>
      <HeaderDetail dataAlbum={dataAlbum}/>
      <ToolBarDetail dataAlbum={dataAlbum}/>
      <ListAlbumSong dataAlbum={dataAlbum}/>
      <AlbumSuggestion albumByGenre={albumByGenre}/>
    </>

  )
}

export default DetailAlbum