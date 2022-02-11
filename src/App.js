import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

export default () => {

    const [movieList, setMovieList] = useState([]);
    //inicia com uma lista vazia
    const [featuredData, setFeaturedData] = useState(null);
    //inicia com um valor nulo e exibe o filme em destaque    

    
    useEffect(() => {
        //Prepara para executar a função ao iniciar o componente
        const LoadAll = async () => {
            //pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //pegando o filme em destaque
            let originals = list.filter(i=>i.slug === 'originals');
            //gera um filme aleatório
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
            //pega o filme aleatório
            let chosen = originals[0].items.results[randomChosen];
            //pega o filme aleatório e armazena no featuredData
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            //chama a função setFeaturedData e passa o filme aleatório
            setFeaturedData(chosenInfo);
        }
        LoadAll();

    }, []);

    return (
        <div className="page">
            {featuredData &&
                <FeaturedMovie item={featuredData} />
                    //passando o filme em destaque
            }

            <section className="lists">                
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    );

}
