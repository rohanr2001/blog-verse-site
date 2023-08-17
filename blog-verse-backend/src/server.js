import express from "express";
import { articleCollection, connectToDatabase } from "./dbConnection.js";
import fs from "fs";
import admin from "firebase-admin";
import path from "path";
import "dotenv/config";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(async (req, res, next) => {
	const { authtoken } = req.headers;

	if (authtoken) {
		try {
			req.user = await admin.auth().verifyIdToken(authtoken);
		} catch (e) {
			return res.sendStatus(400);
		}
	}
	req.user = req.user || {};
	next();
});

app.get("/api/articles/:name", async (req, res) => {
	//Get Article information endpoint
	const { name } = req.params;
	const { uid } = req.user;

	const article = await articleCollection.findOne({ name });
	if (!article) {
		res.sendStatus(404);
	} else {
		const upvoteIds = article.upvoteIds || [];
		article.canUpvote = uid && !upvoteIds.includes(uid);
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

app.use((req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
});

app.put("/api/articles/:name/upvote", async (req, res) => {
	//Increasing the upvote end point
	const { name } = req.params;
	const { uid } = req.user;
	const article = await articleCollection.findOne({ name });

	try {
		if (article) {
			const upvoteIds = article.upvoteIds || [];
			const canUpvote = uid && !upvoteIds.includes(uid);

			if (canUpvote) {
				await articleCollection.updateOne(
					{ name },
					{
						$inc: { upvote: 1 },
						$push: { upvoteIds: uid },
					}
				);
			}
			const updatedArticle = await articleCollection.findOne({ name });
			res.json(updatedArticle);
		} else {
			res.send("That article does not exist");
		}
	} catch (err) {
		res.sendStatus(500);
	}
});

app.post("/api/articles/:name/comment", async (req, res) => {
	//Add comment to the article endpoint
	const { name } = req.params;
	const { text } = req.body;
	const { email } = req.user;
	try {
		await articleCollection.updateOne(
			{ name },
			{ $push: { comment: { postedBy: email, text } } }
		);

		const article = await articleCollection.findOne({ name });
		if (article) {
			res.json(article);
		} else {
			res.send("That article doesn't exist");
		}
	} catch (err) {
		res.send(`comment not posted ${err}`);
	}
});

const PORT = process.env.PORT || 8000;

connectToDatabase(() => {
	app.listen(8000, () => {
		console.log("running on port " + PORT);
	});
});
