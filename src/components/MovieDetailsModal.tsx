// MovieDetailsModal.tsx
import React from 'react';
import '../styling/modal.css';

interface MovieDetailsModalProps {
    movie: Movie;
    onClose: () => void;
}
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

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-header">
                    <img src={movie.backdrop_path} alt={movie.title} className="modal-backdrop-image" />
                </div>
                <div className="modal-body">
                    <div className="modal-title-genres">
                        <h1 className="modal-title">{movie.title}</h1>
                        <p className="modal-genres">{movie.genres.join(', ')}</p>
                    </div>
                    <p className="modal-description">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};
export default MovieDetailsModal;
