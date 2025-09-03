import React, { useEffect, useState } from "react";
import "./News.css"; 

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
const apiKey = process.env.REACT_APP_NEWS_API_KEY;


  useEffect(() => {
    const fetchNews = async () => {
      try {                                                                   
        setLoading(true);

        const category = props.category || "general";
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=9`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok" && data.articles) {
          setArticles(data.articles);
          setTotalResults(data.totalResults);
        } else {
          setArticles([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [props.category,page, apiKey]);

  const HandlePre = () => { 
  if(page > 1) {
    setPage(page - 1);
  }}

  const HandleNext = () => {
   if (page < Math.ceil(totalResults / 6)) {
      setPage(page + 1);
    }}

  return (
    <div className="news-container">
      <h2 className="news-heading">
        {(props.category || "general").charAt(0).toUpperCase() +
          (props.category || "general").slice(1)}{" "}
        News
      </h2>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-image" />
              <div className="skeleton-text short" />
              <div className="skeleton-text long" />
              <div className="skeleton-button" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p>No news found...</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div className="news-card" key={index}>
              <img
                src={
                  article.urlToImage ||
                  "https://cdn-icons-png.flaticon.com/512/21/21601.png"
                }
                className="news-img"
                alt="news"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/21/21601.png";
                }}
              />
              <div className="news-content">
                <h5 className="news-title">{article.title}</h5>
                <p className="news-description">{article.description}</p>
                <p className="news-author">
                  <p>Author:{" "}
                  {article.author || "Unknown"} -{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}{" "}
                  {new Date(article.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p></p>
                <a
                  href={article.url}  
                  target="_blank"
                  rel="noreferrer"
                  className="news-button"
                >
                
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    <div className="d-flex justify-content-between mt-3">
    <button className="btn btn-primary" onClick={HandlePre} disabled={page<=1}>Previous</button>
    <button className="btn btn-primary" onClick={HandleNext} disabled={page >= Math.ceil(totalResults / 6)}>Next</button>
</div>

    </div>
  );
};

export default News;
 