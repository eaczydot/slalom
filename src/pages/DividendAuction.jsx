import React, { useState, useEffect } from 'react';
import '../styles/DividendAuction.css';

const DividendAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [newAuction, setNewAuction] = useState({ amount: '', price: '' });

  useEffect(() => {
    // Simulated API call to get current auctions
    setTimeout(() => {
      setAuctions([
        { id: 1, amount: 10000, price: 9500, highestBid: 9200 },
        { id: 2, amount: 5000, price: 4800, highestBid: 4600 },
      ]);
    }, 1000);
  }, []);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the auction
    setAuctions([...auctions, { id: Date.now(), ...newAuction, highestBid: 0 }]);
    setNewAuction({ amount: '', price: '' });
  };

  const handleBid = (auctionId, bidAmount) => {
    // Here you would typically make an API call to place a bid
    setAuctions(auctions.map(auction => 
      auction.id === auctionId ? { ...auction, highestBid: bidAmount } : auction
    ));
  };

  return (
    <div className="dividend-auction">
      <h1>Dividend Auction Portal</h1>
      <div className="create-auction">
        <h2>Create New Auction</h2>
        <form onSubmit={handleCreateAuction}>
          <input 
            type="number" 
            placeholder="Dividend Amount" 
            value={newAuction.amount}
            onChange={(e) => setNewAuction({...newAuction, amount: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="Asking Price" 
            value={newAuction.price}
            onChange={(e) => setNewAuction({...newAuction, price: e.target.value})}
          />
          <button type="submit">Create Auction</button>
        </form>
      </div>
      <div className="auction-list">
        <h2>Current Auctions</h2>
        {auctions.map(auction => (
          <div key={auction.id} className="auction-item">
            <p>Dividend Amount: ${auction.amount}</p>
            <p>Asking Price: ${auction.price}</p>
            <p>Highest Bid: ${auction.highestBid}</p>
            <input type="number" placeholder="Your Bid" />
            <button onClick={() => handleBid(auction.id, /* bid amount */)}>Place Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DividendAuction;