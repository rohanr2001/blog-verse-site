import ArtList from "./ArtList";
import { articles } from "../article-content";
export default function ArticleList() {
	return (
		<div>
			<h1 className="article-list-title">Available Articles</h1>
			<div className="article-container">
				<ArtList articles={articles} />
			</div>
		</div>
	);
}
