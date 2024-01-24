
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import MovieCard from '../components/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styling/discover.css';
import { CustomArrowProps } from 'react-slick';
import MovieDetailsModal from '../components/MovieDetailsModal';
interface Movie {
    _id: string;
    id: string;
    title: string;
    poster_path: string;
    video_path?: "./mockup_preview.mp4" ;
    overview?:string;
    backdrop_path?:string;
    genres:string[];
}
interface Category {
    title: string;
    movies: Movie[];
}

interface MovieCardProps {
    title: string;
    posterPath: string;
    videoPath?: string; // `?` makes the prop optional
}

// Custom arrow components
const SampleNextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "-25px" }} // Adjust the style as necessary
            onClick={onClick}
        />
    );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "-25px", zIndex: 1 }} // Adjust the style as necessary
            onClick={onClick}
        />
    );
};


const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};




const DiscoverPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // State to manage the selected movie

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                method: 'GET',
                url: 'https://movies-api14.p.rapidapi.com/home',
                headers: {
                    'X-RapidAPI-Key': '5278248ca7mshec4189ce4f8a451p1e0165jsn3d0d8879031f',
                    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);


    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);

    };

    const handleCloseModal = () => {
        setSelectedMovie(null); // Close the modal
    };

    return (
        <div className="discover-container">
            {categories.map((category, index) => (
                <div key={index} className="category-section">
                    <h2 className="section-title">{category.title}</h2>
                    <Slider {...sliderSettings}>
                        {category.movies.map((movie) => (
                            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                                <MovieCard
                                    title={movie.title}
                                    posterPath={movie.poster_path.replace('/original/', '/w200/')}
                                    videoPath={movie.video_path || './mockup_preview.mp4'}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
            {selectedMovie && (
                <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default DiscoverPage;
