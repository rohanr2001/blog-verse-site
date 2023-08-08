import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../article-content";
import NotFound from "./NotFound";
import axios from "axios";

export default function ArticlePage() {
	const [articleInfo, setArticleInfo] = useState({ upvote: 0, comment: [] });
	const { articleId } = useParams();

	useEffect(() => {
		async function loadArticleInfo() {
			const response = await axios.get(`/api/articles/${articleId}`);
			setArticleInfo(response.data);
			console.log(response.data)
		}
		loadArticleInfo();
	}, []);

	const article = articles.find((article) => article.name === articleId);

	if (!article) {
		return <NotFound />;
	}

	return (
		<div>
			<p>{articleInfo.upvote}</p>
			<h1>{article.title}</h1>
			{article.content.map((para) => (
				<p key={para}>{para}</p>
			))}
		</div>
	);
}
