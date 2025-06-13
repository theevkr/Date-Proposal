import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<Position>({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pages = [
    {
      title: "Hey Beautiful... 💕",
      subtitle: "I have something important to ask you",
      content: "Are you ready for this journey?",
      showButtons: false,
      showNext: true
    },
    {
      title: "Do you think I'm sweet?",
      subtitle: "Be honest with me...",
      content: "I've been thinking about this for a while",
      showButtons: true,
      showNext: false
    },
    {
      title: "Do you enjoy our conversations?",
      subtitle: "Those late night chats mean everything to me",
      content: "Your laugh always brightens my day",
      showButtons: true,
      showNext: false
    },
    {
      title: "Would you like to spend more time together?",
      subtitle: "Just the two of us...",
      content: "I promise it'll be amazing",
      showButtons: true,
      showNext: false
    },
    {
      title: "Will you go on a date with me? 💖",
      subtitle: "This is the moment of truth",
      content: "I'm nervous but so excited to ask you this...",
      showButtons: true,
      showNext: false,
      finalQuestion: true
    },
    {
      title: "YES! 🎉✨",
      subtitle: "You just made me the happiest person alive!",
      content: "I can't wait for our amazing date together! 💕",
      showButtons: false,
      showNext: false,
      success: true
    }
  ];

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonClicks(prev => prev + 1);
  };

  const handleYes = () => {
    if (currentPage < pages.length - 2) {
      setCurrentPage(prev => prev + 1);
      setNoButtonClicks(0);
      setNoButtonPosition({ x: 0, y: 0 });
    } else {
      setCurrentPage(pages.length - 1); // Success page
    }
  };

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  const getNoButtonText = () => {
    if (noButtonClicks === 0) return "No";
    if (noButtonClicks === 1) return "Are you sure?";
    if (noButtonClicks === 2) return "Really?";
    if (noButtonClicks === 3) return "Think again...";
    if (noButtonClicks === 4) return "Don't be mean!";
    if (noButtonClicks >= 5) return "Pretty please? 🥺";
    return "No";
  };

  useEffect(() => {
    // Reset no button position when page changes
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonClicks(0);
  }, [currentPage]);

  const currentPageData = pages[currentPage];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative overflow-hidden"
    >
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-200 opacity-20 animate-pulse`}
            size={20 + Math.random() * 30}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center transform transition-all duration-500 hover:scale-105">
          
          {/* Progress indicator */}
          {!currentPageData.success && (
            <div className="mb-8">
              <div className="flex justify-center space-x-2">
                {pages.slice(0, -1).map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentPage ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                {currentPageData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                {currentPageData.subtitle}
              </p>
              <p className="text-lg text-gray-500">
                {currentPageData.content}
              </p>
            </div>

            {/* Decorative element */}
            <div className="flex justify-center py-4">
              {currentPageData.success ? (
                <div className="flex space-x-2 animate-bounce">
                  <Sparkles className="text-yellow-500" size={32} />
                  <Heart className="text-red-500" size={32} />
                  <Sparkles className="text-yellow-500" size={32} />
                </div>
              ) : (
                <Heart className="text-pink-500 animate-pulse" size={48} />
              )}
            </div>

            {/* Buttons */}
            {currentPageData.showButtons && (
              <div className="relative h-32 flex items-center justify-center">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                  <button
                    onClick={handleYes}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300"
                  >
                    Yes! 💖
                  </button>
                  
                  <button
                    ref={noButtonRef}
                    onClick={moveNoButton}
                    onMouseEnter={moveNoButton}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition-all duration-200 focus:outline-none absolute sm:relative"
                    style={{
                      transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                      transition: noButtonClicks > 0 ? 'transform 0.3s ease-out' : 'none'
                    }}
                  >
                    {getNoButtonText()}
                  </button>
                </div>
              </div>
            )}

            {currentPageData.showNext && (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center mx-auto space-x-2"
              >
                <span>Let's Go</span>
                <ArrowRight size={20} />
              </button>
            )}

            {currentPageData.success && (
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  Get ready for the most amazing date ever! 🌟
                </p>
                <button
                  onClick={() => {
                    setCurrentPage(0);
                    setNoButtonClicks(0);
                    setNoButtonPosition({ x: 0, y: 0 });
                  }}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Start Over (for fun!) 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      {currentPageData.showButtons && currentPageData.finalQuestion && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75">
          Tip: The "No" button is a bit shy... 😉
        </div>
      )}
    </div>
  );
}

export default App;