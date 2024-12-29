// const Movie = (props) => {
//     return(
//         <div className="col s12 m6 l3">
//             <div className="card">
//                 <div className="card-image waves-effect waves-block waves-light" style={{height: "400px"}}>
//                     {
//                         props.image == null ? 
//                         <img src="https://theradar.ng/_next/image?url=%2Fapi%2Fimages%2Fchillguy-1-gID_7-1732815432740-755124263.png&w=1920&q=75" alt="card image" style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
//                         :
//                         <img src={`http://image.tmdb.org/t/p/w500${props.image}`} alt="card image" style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Movie;

import React from 'react';

const Movie = (props) => {
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light" style={{ height: "400px" }}>
          {
            props.image == null ?
              <img src="https://theradar.ng/_next/image?url=%2Fapi%2Fimages%2Fchillguy-1-gID_7-1732815432740-755124263.png&w=1920&q=75" alt="card image" style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
              :
              <img src={`http://image.tmdb.org/t/p/w500${props.image}`} alt="card image" style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
          }
        </div>
      </div>
    </div>
  );
}

export default Movie;
