import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
export default function NavBar() {
	const { user } = useUser();
	const navigate = useNavigate();
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
			<ul className="list">
				{listItems}{" "}
				<li className="list-item">
					{user ? (
						<button
							onClick={() => {
								signOut(getAuth());
							}}
						>
							Logout
						</button>
					) : (
						<button
							onClick={() => {
								navigate("/login");
							}}
						>
							Login
						</button>
					)}
				</li>
			</ul>
		</nav>
	);
}
