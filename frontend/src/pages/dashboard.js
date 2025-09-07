import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect } from 'react'   
import MovieList from '@/components/MovieList' 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Search from '../components/Search'

const Dashboard = () => {
    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = query => {
        setSearchQuery(query)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/getMovies')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }   
                const data = await response.json()
                setMovies(data.results)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Dashboard - CinemaLoveReview</title>
            </Head>

            {/*<div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <p className="mb-4 font-semibold text-lg">映画一覧</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {movies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="bg-gray-100 rounded shadow p-2 text-center"
                                    >
                                        <img
                                            src={movie.image_url}       
                                            alt={movie.title}
                                            className="w-full h-48 object-cover rounded"
                                        />
                                        <p className="mt-2 font-medium">{movie.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
            <Search onSearch={handleSearch} />
             <MovieList title="上映中の映画" movies={movies} />
        </AppLayout>
    )
}   
export default Dashboard
