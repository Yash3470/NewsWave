import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5 text-center">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} NewsApp | Built with ❤️ by Yash</p>
        <small>
          <a href="https://newsapi.org" target="_blank" rel="noreferrer" className="text-info">
            Powered by NewsAPI.org
          </a>
        </small>
      </div>
    </footer>
  );
}
