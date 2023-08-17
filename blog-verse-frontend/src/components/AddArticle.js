import { useState } from "react";
import { articles } from "../article-content";

export default function AddArticle() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [article, setArticle] = useState("");
	const [articlesList, setArticlesList] = useState(articles);

	function generateRandomName() {
		const result = Math.random().toString(36).substring(2, 7);
		return result;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const randomName = generateRandomName();
		const newArticle = {
			name: randomName,
			title,
			author,
			article,
		};
		const updatedArticles = [...articlesList, newArticle];
		setArticlesList(updatedArticles);

		setTitle("");
		setAuthor("");
		setArticle("");
	}

	return (
		<form>
			<h1>Add new article</h1>
			<input
				type="text"
				placeholder="Article-Title"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			></input>
			<br />
			<input
				type="text"
				placeholder="Author-name"
				value={author}
				onChange={(e) => {
					setAuthor(e.target.value);
				}}
			>
			</input>
			<br />
			<textarea
				placeholder="article..."
				rows="10"
				cols="80"
				value={article}
				onChange={(e) => {
					setArticle(e.target.value);
				}}
			></textarea>
			<br />
			<button onClick={handleSubmit}>Submit Article</button>
		</form>
	);
}
