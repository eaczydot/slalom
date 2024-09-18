import React, { useState, useRef, useCallback, useMemo } from 'react';
import { FaFileAlt, FaFileContract, FaFileInvoiceDollar, FaFilePdf, FaDownload, FaComment, FaTag, FaHighlighter, FaSignature, FaSearch, FaEdit, FaPaperPlane } from 'react-icons/fa';
import '../styles/Documents.css';
import SignatureModal from '../components/SignatureModal';

const Documents = ({ setUnsignedDocuments }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [comments, setComments] = useState({});
  const [tags, setTags] = useState({});
  const [highlights, setHighlights] = useState({});
  const [signatures, setSignatures] = useState({});
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [chatMessages, setChatMessages] = useState([{ type: 'ai', content: "Hello Evan! How can I help you with your documents today?" }]);
  const [currentMessage, setCurrentMessage] = useState('');

  const documents = useMemo(() => [
    { id: 1, name: 'Q2 Financial Report', date: '2023-06-30', type: 'financial', status: 'available', content: 'This is the content of the Q2 Financial Report...' },
    { id: 2, name: 'Annual Shareholder Meeting Minutes', date: '2023-05-15', type: 'general', status: 'available', content: 'Minutes from the Annual Shareholder Meeting...' },
    { id: 3, name: 'Share Certificate Template', date: '2023-04-01', type: 'general', status: 'available', content: 'Template for Share Certificates...' },
    { id: 4, name: 'Non-Disclosure Agreement', date: '2023-07-01', type: 'personal', status: 'needs_signature', content: 'Non-Disclosure Agreement terms and conditions...' },
    { id: 5, name: 'Stock Option Agreement', date: '2023-07-05', type: 'personal', status: 'needs_signature', content: 'Stock Option Agreement details...' },
    { id: 6, name: 'Annual Budget Forecast', date: '2023-12-15', type: 'financial', status: 'available', content: 'Annual Budget Forecast for the upcoming year...' },
  ], []);

  const getIcon = useCallback((type) => {
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
  }, []);

  const filteredDocuments = useMemo(() => 
    documents
      .filter(doc => activeTab === 'all' || doc.type === activeTab)
      .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [activeTab, documents, searchTerm]
  );

  const handleDocumentClick = useCallback((document) => {
    setSelectedDocument(document);
  }, []);

  const handleDownload = useCallback((document) => {
    const element = document.createElement("a");
    const file = new Blob([document.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${document.name}.txt`;
    document.body.appendChild(element);
    element.click();
  }, []);

  const handleComment = useCallback((documentId) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      setComments(prev => ({
        ...prev,
        [documentId]: [...(prev[documentId] || []), comment]
      }));
    }
  }, []);

  const handleTag = useCallback((documentId) => {
    const tag = prompt("Enter a tag:");
    if (tag) {
      setTags(prev => ({
        ...prev,
        [documentId]: [...(prev[documentId] || []), tag]
      }));
    }
  }, []);

  const handleHighlight = useCallback(() => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'highlight';
    range.surroundContents(span);
    
    if (selectedDocument) {
      setHighlights(prev => ({
        ...prev,
        [selectedDocument.id]: [...(prev[selectedDocument.id] || []), selection.toString()]
      }));
    }
  }, [selectedDocument]);

  const handleSignature = useCallback(() => {
    setIsSignatureModalOpen(true);
  }, []);

  const handleSign = useCallback((signatureData) => {
    if (selectedDocument) {
      setSignatures(prev => ({
        ...prev,
        [selectedDocument.id]: signatureData
      }));
      setSelectedDocument(prev => ({...prev, status: 'signed'}));
      setUnsignedDocuments(prev => prev - 1);
    }
  }, [selectedDocument, setUnsignedDocuments]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e) => {
    setSelectedDocument(prev => ({...prev, content: e.target.value}));
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
    <div className="documents">
      <h1>Welcome to Your Documents, Evan</h1>
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
              placeholder="Ask about your documents..."
            />
            <button onClick={handleSendMessage}><FaPaperPlane /></button>
          </div>
        </div>
      </div>
      
      <div className="document-controls">
        <div className="document-tabs">
          <button onClick={() => setActiveTab('all')} className={`btn ${activeTab === 'all' ? 'active' : ''}`}>All</button>
          <button onClick={() => setActiveTab('financial')} className={`btn ${activeTab === 'financial' ? 'active' : ''}`}>Financial</button>
          <button onClick={() => setActiveTab('general')} className={`btn ${activeTab === 'general' ? 'active' : ''}`}>General</button>
          <button onClick={() => setActiveTab('personal')} className={`btn ${activeTab === 'personal' ? 'active' : ''}`}>Personal</button>
        </div>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
                {document.status === 'signed' && <span className="signature-complete">Signed</span>}
              </div>
            </li>
          ))}
        </ul>
        {selectedDocument && (
          <div className="document-viewer">
            <h2>{selectedDocument.name}</h2>
            <div className="document-actions">
              <button onClick={() => handleDownload(selectedDocument)} className="btn"><FaDownload /> Download</button>
              <button onClick={() => handleComment(selectedDocument.id)} className="btn"><FaComment /> Comment</button>
              <button onClick={() => handleTag(selectedDocument.id)} className="btn"><FaTag /> Tag</button>
              <button onClick={handleHighlight} className="btn"><FaHighlighter /> Highlight</button>
              <button onClick={handleEdit} className="btn"><FaEdit /> {isEditing ? 'Save' : 'Edit'}</button>
              {selectedDocument.status === 'needs_signature' && (
                <button onClick={handleSignature} className="btn"><FaSignature /> Sign</button>
              )}
            </div>
            {isEditing ? (
              <textarea
                className="document-content editable"
                value={selectedDocument.content}
                onChange={handleContentChange}
              />
            ) : (
              <div className="document-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: selectedDocument.content }}></div>
            )}
            <div className="document-interactions">
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
              {signatures[selectedDocument.id] && (
                <div className="document-signature">
                  <h3>Signature</h3>
                  <img src={signatures[selectedDocument.id]} alt="Signature" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <SignatureModal 
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSign={handleSign}
      />
    </div>
  );
};

export default Documents;