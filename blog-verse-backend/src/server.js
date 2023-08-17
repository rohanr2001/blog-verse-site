import express from "express";
import { articleCollection, connectToDatabase } from "./dbConnection.js";
const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
	//Get Article information endpoint
	const { name } = req.params;
	const article = await articleCollection.findOne({ name });
	if (!article) {
		res.sendStatus(404);
	} else {
		res.json(article);
	}
});

app.get("/api/articles", async (req, res) => {
	const articles = await articleCollection.find().toArray();
	if (articles) {
		res.json(articles);
	} else {
		res.send([]);
	}
});

app.put("/api/addArticle/:name", async (req, res) => {
	//Adding a new article endpoint
	const { name } = req.params;
	const { author, comment, upvote } = req.body;

	try {
		let result = await articleCollection.insertOne({
			name,
			title,
			author,
			comment,
			upvote,
		});
		res.send(`Inserted Document ${result.insertedId}`);
	} catch (err) {
		console.log(`Error inserting to the database ${err}`);
	}
});

app.put("/api/articles/:name/upvote", async (req, res) => {
	//Increasing the upvote end point
	const { name } = req.params;
	const increase = { $inc: { upvote: 1 } };
	try {
		await articleCollection.updateOne({ name: name }, increase);

		const article = await articleCollection.findOne({ name: name });

		if (article) {
			res.json(article);
		} else {
			res.send("That article doesn't exist");
		}
	} catch (err) {
		res.sendStatus(500);
	}
});

app.post("/api/articles/:name/comment", async (req, res) => {
	//Add comment to the article endpoint
	const { name } = req.params;
	const { postedBy, text } = req.body;
	try {
		await articleCollection.updateOne(
			{ name },
			{ $push: { comment: { postedBy, text } } }
		);

		const article = await articleCollection.findOne({ name: name });
		if (article) {
			res.json(article);
		} else {
			res.send("That article doesn't exist");
		}
	} catch (err) {
		res.send(`comment not posted ${err}`);
	}
});

connectToDatabase(() => {
	app.listen(5000, () => {
		console.log("running on port 5000");
	});
});
