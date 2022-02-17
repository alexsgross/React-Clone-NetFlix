import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

    const [movieList, setMovieList] = useState([]); //inicia com uma lista vazia
    const [featuredData, setFeaturedData] = useState(null); //inicia com um valor nulo e exibe o filme em destaque  
    const [blackHeader, setBlackHeader] = useState(false); //inicia com false e altera o css do header para black

    
    useEffect(() => { //Prepara para executar a função ao iniciar o componente
        const LoadAll = async () => { //pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);  //pegando o filme em destaque
            let originals = list.filter(i=>i.slug === 'originals'); //gera um filme aleatório
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1)); //pega o filme aleatório
            let chosen = originals[0].items.results[randomChosen];  //pega o filme aleatório e armazena no featuredData
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');  //chama a função setFeaturedData e passa o filme aleatório
            setFeaturedData(chosenInfo);
        }
        LoadAll();

    }, []);

    useEffect(() => {  //Prepara para executar a função ao iniciar o componente
        const scrollListener = () => { 
            if(window.scrollY > 10){
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        
        }
        window.addEventListener('scroll', scrollListener);
        return () => { //Prepara para executar a função ao sair do componente
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);

    return (
        <div className="page">

            <Header black={blackHeader} />            

            {featuredData &&
                <FeaturedMovie item={featuredData} />  //passando o filme em destaque
            }

            <section className="lists">                
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
            <footer>
                Projeto feito em React <spam role="img" aria-label="coração"></spam> Por Alex Sandro Gross<br/>
                Todos os direitos reservados a Netflix<br/>
                Os dados para o projeto foram extraídos do Site Themoviedb.org              
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>                
                </div>
            }
        </div>
    );

}
