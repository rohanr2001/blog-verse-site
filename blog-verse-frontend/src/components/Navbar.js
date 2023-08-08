import { Link } from "react-router-dom";


export default function NavBar() {
	const pages = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "About",
			path: "/about",
		},
		{
			name: "Articles",
			path: "/articles",
		},
	];

	const listItems = pages.map((page) => (
		<Link key={page.name} to={page.path}>
			<li className="list-item">{page.name}</li>
		</Link>
	));

	return (
		<nav className="nav-list">
			<h1 className="main-logo">
				<span className="left">BLOG</span>
				<span className="right">VERSE</span>
			</h1>
			<ul className="list">{listItems}</ul>
		</nav>
	);
}
