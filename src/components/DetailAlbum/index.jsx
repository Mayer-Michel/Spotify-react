import React from 'react'
import { useParams } from 'react-router-dom'
import HeaderDetail from './HeaderDetail';
import ToolBarDetail from './ToolBarDetail';
import ListAlbumSong from './ListAlbumSong';

const DetailAlbum = ({ dataAlbum }) => {
  return (
    <>
      <HeaderDetail dataAlbum={dataAlbum}/>
      <ToolBarDetail dataAlbum={dataAlbum}/>
      <ListAlbumSong dataAlbum={dataAlbum}/>
    </>

  )
}

export default DetailAlbum