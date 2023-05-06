import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../styles/Rows.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

export default function Row(props) {
	const [movies, setMovies] = useState([]);
	const [trailerId, setTrailerId] = useState("");
	const baseurl = "https://image.tmdb.org/t/p/original/";
	let { title, fetchUrl, isLargeRow } = props;
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};
	const handlePopUp = (movie) => {
		if (trailerId) {
			setTrailerId("");
		} else {
			movieTrailer(movie?.name || "")
				.then((url) => {
					// new URL(url).search WILL GIVE US SOMETHING LIKE THIS (?v=GKYr5eWm8EY)
					// new URLSearchParams RETURNS AN OBJECT WITH A GET METHOD TO GET VIDEO ID BASED ON A PARAMETER WHICH IS 'V' HERE
					const params = new URLSearchParams(new URL(url).search);
					setTrailerId(params.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};
	//  A Snippet of code which runs on a specific condition
	useEffect(() => {
		const fetchdata = async () => {
			const request = await axios.get(fetchUrl);

			setMovies(request.data.results);
			return request;
		};
		fetchdata();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row_posters">
				{movies.map((movie) => {
					let { id, poster_path, name, backdrop_path } = movie;
					return (
						<img
							width={"200px"}
							key={id}
							onClick={() => handlePopUp(movie)}
							// if isLargeRow===true we are adding another class to our images
							className={`row_poster ${isLargeRow && "row_posterLarge"}`}
							src={baseurl.concat(isLargeRow ? poster_path : backdrop_path)}
							alt={name}
						/>
					);
				})}
			</div>
			{trailerId && <YouTube videoId={trailerId} opts={opts} />}
		</div>
	);
}
