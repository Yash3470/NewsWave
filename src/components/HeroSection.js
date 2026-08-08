import React, { useEffect, useState } from "react";
import "./Herosection.css"; // Import custom styles for the hero section
const HeroSection = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
 const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  useEffect(() => {
    const fetchHeroNews = async () => { 
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=5`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching hero news:", error);
      }
    };

    fetchHeroNews();
  }, [apiKey]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, [articles]);

  if (articles.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Loading Hero News...</h2>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="container my-5">
      <h1 className="hero-title">Stay Informed with the Latest Headlines</h1>
        <p className="hero-subtitle">Breaking news from around the world — updated in real-time</p>
      <div className="card bg-dark text-white">
        <img
          src={
            currentArticle.urlToImage ||
            "https://cdn-icons-png.flaticon.com/512/21/21601.png"
          }
          className="card-img"
          alt="Top headline"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50">
          <h2 className="card-title">{currentArticle.title}</h2>
          <p className="card-text d-none d-md-block">
            {currentArticle.description}
          </p>
          <a
            href={currentArticle.url}
            className="btn btn-primary w-25 mt-2"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
