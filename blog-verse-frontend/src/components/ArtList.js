import { Link } from "react-router-dom";

export default function ArtList({ articles }) {
	const articleInfo = articles.map((article, i) => {
		return (
			<div key={i}>
				<Link to={`/articles/${article.name}`}>
					<h3>{article.title}</h3>
					<p>{article.content[0].substring(0, 150)}....</p>
				</Link>
			</div>
		);
	});
	return (
		<div>
			<p>{articleInfo}</p>
		</div>
	);
}
