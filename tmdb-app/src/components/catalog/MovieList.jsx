import Movie from '../general/Movie'

const MovieList = (props) => {
    return (
    <div className="containter">
        <div className="row">
            <div className="col s12">
                {
                    props.movies.map((movie, i) => {
                        return(
                            <Movie key={i} image={movie.poster_path} />
                        )
                    })
                }
            </div>
        </div>
    </div>
    )
}

export default MovieList