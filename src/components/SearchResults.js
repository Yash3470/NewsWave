import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=4e5b3423ab704ecf80355e0ff30419c2&pageSize=9`;
        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container my-4">
      <h2>Search Results for: <strong>{query}</strong></h2>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No results found...</p>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={article.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
