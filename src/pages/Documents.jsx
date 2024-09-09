import React, { useState } from 'react';
import { FaFileAlt, FaFileContract, FaFileInvoiceDollar, FaFilePdf } from 'react-icons/fa';
import '../styles/Documents.css';

function Documents() {
  const [activeTab, setActiveTab] = useState('all');

  const documents = [
    { name: 'Q2 Financial Report', date: '2023-06-30', type: 'financial', status: 'available' },
    { name: 'Annual Shareholder Meeting Minutes', date: '2023-05-15', type: 'general', status: 'available' },
    { name: 'Share Certificate Template', date: '2023-04-01', type: 'general', status: 'available' },
    { name: 'Non-Disclosure Agreement', date: '2023-07-01', type: 'personal', status: 'needs_signature' },
    { name: 'Stock Option Agreement', date: '2023-07-05', type: 'personal', status: 'needs_signature' },
    { name: 'Annual Budget Forecast', date: '2023-12-15', type: 'financial', status: 'available' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'financial':
        return <FaFileInvoiceDollar className="document-icon financial" />;
      case 'general':
        return <FaFileAlt className="document-icon general" />;
      case 'personal':
        return <FaFileContract className="document-icon personal" />;
      default:
        return <FaFilePdf className="document-icon" />;
    }
  };

  const filteredDocuments = activeTab === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === activeTab);

  return (
    <div className="documents">
      <h1>Documents</h1>
      <div className="document-tabs">
        <button onClick={() => setActiveTab('all')} className={`btn ${activeTab === 'all' ? 'active' : ''}`}>All</button>
        <button onClick={() => setActiveTab('personal')} className={`btn ${activeTab === 'personal' ? 'active' : ''}`}>Personal Agreements</button>
        <button onClick={() => setActiveTab('financial')} className={`btn ${activeTab === 'financial' ? 'active' : ''}`}>Company Financials</button>
        <button onClick={() => setActiveTab('general')} className={`btn ${activeTab === 'general' ? 'active' : ''}`}>General</button>
      </div>
      <ul className="document-list">
        {filteredDocuments.map((document, index) => (
          <li key={index} className={`document-item ${document.status === 'needs_signature' ? 'needs-signature' : ''}`}>
            {getIcon(document.type)}
            <div className="document-info">
              <h3>{document.name}</h3>
              <p>{document.date}</p>
              {document.status === 'needs_signature' && <span className="signature-needed">Signature Required</span>}
            </div>
            <button className="btn">{document.status === 'needs_signature' ? 'Sign' : 'Download'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;