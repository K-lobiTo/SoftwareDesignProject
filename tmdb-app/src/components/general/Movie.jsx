
const Movie = (props) => {
    return(
        <div className="col s12 m6 l3">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    {//we probably need to change this later to make it responsive (the height)
                        props.image == null ? 
                        <img src="" alt="card image" style={{width: "100%", height: 360}}></img>
                        :
                        <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="card image" style={{width: "100%", height: 360}}></img>
                        //we should consider making this a component later
                    }
                    <img src="">
                    </img>
                </div>
            </div>

        </div>
    )
}

export default Movie;