import clientPromise from "../lib/mongodb";

export default function Movies({ movies }) {
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Top Movies of All Time</h1>
            <p>
                {/* <small>(According to Metacritic)</small> */}
            </p>
            <ul style={{display: "flex",flexWrap: "wrap",justifyContent: "center"}}>
                {movies.map((movie) => (
                    // <li>
                    //     <h2>{movie.title}</h2>
                    //     <h3>{movie.metacritic}</h3>
                    //     <p>{movie.plot}</p>
                    // </li>
                    <div class="card" style={{width: "18rem", margin: "1rem", boxShadow: '1px 2px 9px #cccccc', fontFamily: "sans-serif", fontSize: "1rem", borderRadius: "5px",backgroundColor: "black"}}>
                        <a href={movie.goto} style={{height: "430px"}}>
                        <img style={{width: "100%"}} src={movie.poster} class="card-img-top" alt="..."/>
                        </a>
                            <div class="card-body" style={{padding: "1rem"}}>
                                <h3 class="card-title" style={{display: "flex", justifyContent: "center", color: "white"}}>{movie.title}</h3>
                                <p class="card-text" style={{marginBottom: "1rem", height: "6rem", color: "white"}}>{movie.plot.slice(0,150)}...</p>
                                <div style={{color: "#F0E68C"}}>Rating {movie.imdb.rating}</div>
                                <h4 style={{color: "gray"}}>aired in {movie.year}</h4>
                            </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
// return (
//     <div>
//         <h1>Top 20 Movies of All Time</h1>
//         <p>
//             <small>(According to Metacritic)</small>
//         </p>
//         <ul>
//             {movies.map((movie) => (
//                 <li>
//                     <h2>{movie.title}</h2>
//                     <h3>{movie.metacritic}</h3>
//                     <p>{movie.plot}</p>
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");

        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}