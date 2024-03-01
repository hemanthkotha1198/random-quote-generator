// RandomQuoteGenerator.js
import React, { useState } from 'react';
import './RandomQuoteGenerator.css';

const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchQuote = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      const newQuote = data.content + ' - ' + data.author;
      setQuote(newQuote);
      displayQuote(newQuote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const displayQuote = (quote) => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedQuote(prevQuote => prevQuote + quote[index]);
      index++;
      if (index === quote.length) {
        clearInterval(intervalId);
        setIsGenerating(false);
      }
    }, 50); // Adjust the interval to control the speed of the animation
  };

  return (
    <div className="container">
      <h1>Random Quote Generator</h1>
      <div className="quote-container">
        <p className="quote">{displayedQuote}</p>
      </div>
      <button className="generate-btn" onClick={fetchQuote} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Quote'}
      </button>
    </div>
  );
};

export default RandomQuoteGenerator;
