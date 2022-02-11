import React from "react";
import './FeaturedMovie.css';

export default ({item}) => {
    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>            
            <div className="featured--vertical">
                <div className="featured--horizontal">                    
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">                                                
                        <div className="featured--points">{item.vote_average} Pontos</div>
                        <div className="featured--year">{(new Date(item.first_air_date)).getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : '' }</div>
                    </div>
                    <div className="featured--">{item.overview}</div>
                    <div className="featured--buttons">
                        <button className="featured--button">Assistir</button>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong>...</div>
                                        
                </div>
            </div>
        
        </section>
    );
}

