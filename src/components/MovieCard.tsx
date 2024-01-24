// MovieCard.tsx
import React from 'react';
import '../styling/discover.css';

interface MovieCardProps {
    title: string;
    posterPath: string;
    videoPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, videoPath }) => {
    // Reference to the video element
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Function to play video
    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.style.display = 'block'; // Show the video
            ///videoRef.current.play().then(r => console.log(r));
        }
    };

    // Function to pause video
    const pauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.style.display = 'none'; // Hide the video
            videoRef.current.pause();
        }
    };

    return (
        <div className="movie-card" onMouseEnter={playVideo} onMouseLeave={pauseVideo}>
            <img src={posterPath} alt={title} className="movie-card-image" />
            <video
                ref={videoRef}
                src={videoPath}
                loop
                muted
                className="movie-card-video"
            />
            <div className="movie-card-overlay">{title}</div>
        </div>
    );
};

export default MovieCard;
