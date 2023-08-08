import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/articles" element={<ArticleList />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/articles/:articleId" element={<ArticlePage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;