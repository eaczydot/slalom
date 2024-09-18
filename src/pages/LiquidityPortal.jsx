import React, { useState, useEffect } from 'react';
import { FaGavel, FaHandHoldingUsd, FaChartLine, FaExchangeAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/LiquidityPortal.css';

const LiquidityPortal = () => {
  const [auctions, setAuctions] = useState([]);
  const [bids, setBids] = useState([]);
  const [userDividends, setUserDividends] = useState(0);
  const [newAuctionAmount, setNewAuctionAmount] = useState('');
  const [newAuctionDuration, setNewAuctionDuration] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Fetch auctions, bids, and user dividends from API
    // This is a mock implementation
    setAuctions([
      { id: 1, amount: 5000, duration: '6 months', highestBid: 4800 },
      { id: 2, amount: 10000, duration: '1 year', highestBid: 9500 },
    ]);
    setBids([
      { id: 1, auctionId: 1, amount: 4800, bidder: 'User123' },
      { id: 2, auctionId: 1, amount: 4750, bidder: 'User456' },
      { id: 3, auctionId: 2, amount: 9500, bidder: 'User789' },
    ]);
    setUserDividends(15000);

    // Add initial greeting message
    setChatMessages([{ type: 'ai', content: "Hello Evan! How can I assist you with liquidity options today?" }]);
  }, []);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    // API call to create new auction
    console.log(`Creating auction for ${newAuctionAmount} over ${newAuctionDuration}`);
    // Reset form
    setNewAuctionAmount('');
    setNewAuctionDuration('');
  };

  const handleBid = (auctionId, amount) => {
    // API call to place bid
    console.log(`Placing bid of ${amount} on auction ${auctionId}`);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      setChatMessages([...chatMessages, { type: 'user', content: currentMessage }]);
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChatMessages(prev => [...prev, { type: 'ai', content: `Here's some information about ${currentMessage}, Evan...` }]);
      }, 1000);
      setCurrentMessage('');
    }
  };

  return (
    <div className="liquidity-portal">
      <h1>Liquidity Portal</h1>
      
      <div className="chat-interface">
        <div className="chat-container">
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.type}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask about liquidity options..."
            />
            <button onClick={handleSendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-item">
          <h2><FaHandHoldingUsd /> Your Available Dividends</h2>
          <p className="large-number">${userDividends.toLocaleString()}</p>
        </div>
        <div className="dashboard-item">
          <h2><FaGavel /> Active Auctions</h2>
          <p className="large-number">{auctions.length}</p>
        </div>
        <div className="dashboard-item">
          <h2><FaChartLine /> Total Liquidity</h2>
          <p className="large-number">${auctions.reduce((sum, auction) => sum + auction.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="auction-creation">
        <h2><FaExchangeAlt /> Create New Auction</h2>
        <form onSubmit={handleCreateAuction}>
          <input 
            type="number" 
            placeholder="Amount" 
            value={newAuctionAmount} 
            onChange={(e) => setNewAuctionAmount(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Duration (e.g., 6 months)" 
            value={newAuctionDuration} 
            onChange={(e) => setNewAuctionDuration(e.target.value)}
            required
          />
          <button type="submit" className="btn">Create Auction</button>
        </form>
      </div>

      <div className="auctions-list">
        <h2>Active Auctions</h2>
        {auctions.map(auction => (
          <div key={auction.id} className="auction-item">
            <h3>Auction #{auction.id}</h3>
            <p>Amount: ${auction.amount.toLocaleString()}</p>
            <p>Duration: {auction.duration}</p>
            <p>Highest Bid: ${auction.highestBid.toLocaleString()}</p>
            <input type="number" placeholder="Your Bid" />
            <button onClick={() => handleBid(auction.id, 0)} className="btn">Place Bid</button>
          </div>
        ))}
      </div>

      <div className="bids-list">
        <h2>Recent Bids</h2>
        {bids.map(bid => (
          <div key={bid.id} className="bid-item">
            <p>Auction #{bid.auctionId}: ${bid.amount.toLocaleString()} by {bid.bidder}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiquidityPortal;