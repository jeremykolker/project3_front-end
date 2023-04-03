import React, { useState, useRef, useCallback } from 'react'
import useMovieSearch from './components/useMovieSearch'
import Movie from './components/Movie'
import "./App.css"

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    movies,
    hasMore,
    loading,
    error
  } = useMovieSearch(query, pageNumber)

  const observer = useRef()
  const lastMovieElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // console.log('Visible');
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(event) {
    setQuery(event.target.value)
    setPageNumber(1)
  }

  return (
    <>
      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <>
          <div ref={lastMovieElementRef} key={movie}>{movie}</div>
          </>
          )
        } else {
          return (
            <>
          <div key={movie}>{movie}</div>
          </>
          )
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}