import React, { useState } from 'react';
import { FaFileAlt, FaFileContract, FaFileInvoiceDollar, FaFilePdf, FaDownload, FaComment, FaTag, FaHighlighter } from 'react-icons/fa';
import '../styles/Documents.css';

function Documents() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [comments, setComments] = useState({});
  const [tags, setTags] = useState({});
  const [highlights, setHighlights] = useState({});

  const documents = [
    { id: 1, name: 'Q2 Financial Report', date: '2023-06-30', type: 'financial', status: 'available', content: 'This is the content of the Q2 Financial Report...' },
    { id: 2, name: 'Annual Shareholder Meeting Minutes', date: '2023-05-15', type: 'general', status: 'available', content: 'Minutes from the Annual Shareholder Meeting...' },
    { id: 3, name: 'Share Certificate Template', date: '2023-04-01', type: 'general', status: 'available', content: 'Template for Share Certificates...' },
    { id: 4, name: 'Non-Disclosure Agreement', date: '2023-07-01', type: 'personal', status: 'needs_signature', content: 'Non-Disclosure Agreement terms and conditions...' },
    { id: 5, name: 'Stock Option Agreement', date: '2023-07-05', type: 'personal', status: 'needs_signature', content: 'Stock Option Agreement details...' },
    { id: 6, name: 'Annual Budget Forecast', date: '2023-12-15', type: 'financial', status: 'available', content: 'Annual Budget Forecast for the upcoming year...' },
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

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document) => {
    // Implement download functionality
    console.log(`Downloading ${document.name}`);
  };

  const handleComment = (documentId) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      setComments(prev => ({
        ...prev,
        [documentId]: [...(prev[documentId] || []), comment]
      }));
    }
  };

  const handleTag = (documentId) => {
    const tag = prompt("Enter a tag:");
    if (tag) {
      setTags(prev => ({
        ...prev,
        [documentId]: [...(prev[documentId] || []), tag]
      }));
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    const highlightedText = selection.toString();
    if (highlightedText && selectedDocument) {
      setHighlights(prev => ({
        ...prev,
        [selectedDocument.id]: [...(prev[selectedDocument.id] || []), highlightedText]
      }));
    }
  };

  return (
    <div className="documents">
      <h1>Documents</h1>
      <div className="document-tabs">
        <button onClick={() => setActiveTab('all')} className={`btn ${activeTab === 'all' ? 'active' : ''}`}>All</button>
        <button onClick={() => setActiveTab('personal')} className={`btn ${activeTab === 'personal' ? 'active' : ''}`}>Personal Agreements</button>
        <button onClick={() => setActiveTab('financial')} className={`btn ${activeTab === 'financial' ? 'active' : ''}`}>Company Financials</button>
        <button onClick={() => setActiveTab('general')} className={`btn ${activeTab === 'general' ? 'active' : ''}`}>General</button>
      </div>
      <div className="document-container">
        <ul className="document-list">
          {filteredDocuments.map((document) => (
            <li key={document.id} className={`document-item ${document.status === 'needs_signature' ? 'needs-signature' : ''}`} onClick={() => handleDocumentClick(document)}>
              {getIcon(document.type)}
              <div className="document-info">
                <h3>{document.name}</h3>
                <p>{document.date}</p>
                {document.status === 'needs_signature' && <span className="signature-needed">Signature Required</span>}
              </div>
            </li>
          ))}
        </ul>
        {selectedDocument && (
          <div className="document-viewer">
            <h2>{selectedDocument.name}</h2>
            <div className="document-actions">
              <button onClick={() => handleDownload(selectedDocument)} className="btn-action"><FaDownload /> Download</button>
              <button onClick={() => handleComment(selectedDocument.id)} className="btn-action"><FaComment /> Comment</button>
              <button onClick={() => handleTag(selectedDocument.id)} className="btn-action"><FaTag /> Tag</button>
              <button onClick={handleHighlight} className="btn-action"><FaHighlighter /> Highlight</button>
            </div>
            <div className="document-content">
              {selectedDocument.content}
            </div>
            {comments[selectedDocument.id] && (
              <div className="document-comments">
                <h3>Comments</h3>
                <ul>
                  {comments[selectedDocument.id].map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}
            {tags[selectedDocument.id] && (
              <div className="document-tags">
                <h3>Tags</h3>
                {tags[selectedDocument.id].map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
            {highlights[selectedDocument.id] && (
              <div className="document-highlights">
                <h3>Highlights</h3>
                <ul>
                  {highlights[selectedDocument.id].map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;