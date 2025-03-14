import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchResetSearch } from '../../store/album/albumSlice';
import SearchBar from '../../components/Services/SearchBar';

const Search = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResetSearch())
  }, [])
  
  return (

      <SearchBar />
  )
}

export default Search;