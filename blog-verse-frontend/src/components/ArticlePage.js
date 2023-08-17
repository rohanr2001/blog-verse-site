import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../article-content";
import NotFound from "./NotFound";
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";
import useUser from "../hooks/useUser";
import axios from "axios";

export default function ArticlePage() {
	const [articleInfo, setArticleInfo] = useState({
		upvote: 0,
		comment: [],
	});
	const { articleId } = useParams();

	const { user, isLoading } = useUser();

	useEffect(() => {
		async function loadArticleInfo() {
			const token = user && (await user.getIdToken());
			const headers = token ? { authtoken: token } : {};
			const response = await axios.get(`/api/articles/${articleId}`, {
				headers,
			});
			setArticleInfo(response.data);
		}
		if (isLoading) {
			loadArticleInfo();
		}
	}, []);

	const article = articles.find((article) => article.name === articleId);

	async function addUpvote() {
		const token = user && (await user.getIdToken());
		const headers = token ? { authtoken: token } : {};
		const response = await axios.put(
			`/api/articles/${articleId}/upvote`,
			null,
			{ headers }
		);
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
				{user ? (
					<button className="list-item" onClick={addUpvote}>
						Upvote
					</button>
				) : (
					<button className="list-item">Login to Upvote</button>
				)}

				<p className="upvotes-count">
					This Article is Upvoted By : <b>{articleInfo.upvote}</b> Readers
				</p>
			</div>
			<div className="article-para">
				{article.content.map((para) => (
					<p key={para}>{para}</p>
				))}
			</div>

			{user ? (
				<AddCommentForm
					articleName={articleId}
					onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
				/>
			) : (
				<button className="list-item">Login to Comment</button>
			)}

			<h3 style={{ margin: "20 ,0 ,0 ,0" }}>Comments: </h3>
			<ul className="comment-container">
				<CommentList comment={articleInfo.comment} />
			</ul>
		</div>
	);
}
