import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../article-content";
import NotFound from "./NotFound";
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";
import axios from "axios";

export default function ArticlePage() {
	const [articleInfo, setArticleInfo] = useState({ upvote: 0, comment: [] });
	const { articleId } = useParams();

	useEffect(() => {
		async function loadArticleInfo() {
			const response = await axios.get(`/api/articles/${articleId}`);
			setArticleInfo(response.data);
			console.log(response.data);
		}
		loadArticleInfo();
	}, []);

	const article = articles.find((article) => article.name === articleId);

	async function addUpvote() {
		const response = await axios.put(`/api/articles/${articleId}/upvote`);
		const updatedArticle = response.data;
		setArticleInfo(updatedArticle);
	}

	if (!article) {
		return <NotFound />;
	}

	return (
		<div className="article-content">
			<h1 className="article-title">{article.title}</h1>
			<div className="upvotes-container">
				<button onClick={addUpvote}>Upvote</button>
				<p className="upvotes-count">
					This Article is Upvoted By : <b>{articleInfo.upvote}</b> Readers
				</p>
			</div>

			{article.content.map((para) => (
				<p className="article-para" key={para}>
					{para}
				</p>
			))}
			<AddCommentForm
				articleName={articleId}
				onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
			/>
			<h3 style={{ margin: "20 ,0 ,0 ,0" }}>Comments: </h3>
			<ul className="comment-container">
				<CommentList comment={articleInfo.comment} />
			</ul>
		</div>
	);
}
