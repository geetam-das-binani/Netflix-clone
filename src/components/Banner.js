import React, { useEffect, useState } from "react";
import requests from "../requests";
import axios from "../axios";
import "../styles/Banner.css";

export default function Banner() {
	const [movie, setMovies] = useState({});
	useEffect(() => {
		const fetchBannerData = async () => {
			const req = await axios.get(requests.fetchNetflixOriginals);
			setMovies(
				req.data.results[Math.floor(Math.random() * req.data.results.length)]
			);
			console.log(req.data.results);
			return req;
		};
		fetchBannerData();
	}, []);
	// if movie dessciption is >150 use substr method else return the original string
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<header
			className="banner"
			style={{
				background: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}') no-repeat center center/cover`,
			}}
		>
			<div className="banner_contents">
				<h1 className="banner_title">
					{movie?.title ||
						movie?.name ||
						movie?.original_title ||
						movie?.original_name}
				</h1>

				<div className="banner_buttons">
					<button className="banner_button">Play</button>
					<button className="banner_button">My List</button>
				</div>

				<h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
			</div>

			<div className="banner_fadebottom" />
		</header>
	);
}
