import ArtList from "./ArtList";
import { articles } from "../article-content";
export default function ArticleList() {
	return (
		<div>
			<h1>Article List</h1>
			<ArtList articles={articles} />
		</div>
	);
}
