import { useState } from "react";
import axios from "axios";
export default function AddCommentForm({ articleName, onArticleUpdated }) {
	const [name, setName] = useState("");
	const [commentText, setCommentText] = useState("");

	async function addComment() {
		const response = await axios.post(`/api/articles/${articleName}/comment`, {
			postedBy: name,
			text: commentText,
		});

		const updatedArticle = response.data;
		onArticleUpdated(updatedArticle);
		setName("");
		setCommentText("");
	}

	return (
		<div>
			<form className="comment-form">
				<h3>Add a Comment</h3>
				<label>
					Name :{" "}
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					Comment : <br />
					<textarea
						rows="4"
						cols="50"
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					></textarea>
				</label>
				<button
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
