export default function CommentList({ comment }) {
	return (
		<div>
			{comment.map((comment) => (
				<li key={comment.postedBy + ":" + comment.text} className="comment">
					<h4 className="postedBy">{comment.postedBy}</h4>
					<p>"{comment.text}"</p>
				</li>
			))}
		</div>
	);
}
