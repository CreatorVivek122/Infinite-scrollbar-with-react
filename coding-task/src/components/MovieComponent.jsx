import React from "react";
import MovieCard from "./MovieCard";

const MovieComponent = ({ MovieInfo }) =>{
    return(
        <div className="wrapper">
            <div className="container">
                <h1>List of cards</h1>
                <div className="grid grid-three-column">
                    {MovieInfo.map((curVal, id) => {
                        return <MovieCard key={id} myData={curVal} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default MovieComponent;