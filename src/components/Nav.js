import React, { useEffect, useState } from "react";
import "../styles/Nav.css";

export default function Nav() {
	const [show, setShow] = useState(false);
	const scrollFunc = (condition) => {
		setShow(condition);
	};
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				scrollFunc(true);
			} else {
				scrollFunc(false);
			}
		});
		return () => {
			window.removeEventListener("scroll", scrollFunc);
		};
	}, []);
	return (
		<div className={`nav ${show && "nav_show"}`}>
			<div className="netflix_image">NETFLIX</div>
			<img
				className="avatar_image"
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dtkiap1Pv7EH2eIracwOSFNlNdWCxSNnVFke2fnMcA&s"
				alt="Avatar Logo"
			/>
		</div>
	);
}
