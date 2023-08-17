import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

export default function AddCommentForm({ articleName, onArticleUpdated }) {
	const [name, setName] = useState("");
	const [commentText, setCommentText] = useState("");
	const { user } = useUser();

	async function addComment() {
		const token = user && (await user.getIdToken());
		const headers = token ? { authtoken: token } : {};
		const response = await axios.post(
			`/api/articles/${articleName}/comment`,
			{
				postedBy: name,
				text: commentText,
			},
			{
				headers,
			}
		);

		const updatedArticle = response.data;
		onArticleUpdated(updatedArticle);
		setName("");
		setCommentText("");
	}

	return (
		<div>
			<form className="comment-form">
				<h3>Add a Comment</h3>
				{user && <p>You are posting as {user.email}</p>}
				<label>
					<textarea
						rows="4"
						cols="50"
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					></textarea>
				</label>
				<button
					className="list-item"
					onClick={(e) => {
						e.preventDefault();
						addComment();
					}}
				>
					Add Comment
				</button>
			</form>
		</div>
	);
}
