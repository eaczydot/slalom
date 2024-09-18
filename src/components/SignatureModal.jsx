import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureModal = ({ isOpen, onClose, onSign }) => {
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
    setSignature(null);
  };

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      alert('Please provide a signature');
      return;
    }
    const signatureData = signatureRef.current.toDataURL();
    setSignature(signatureData);
    onSign(signatureData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign Document</h2>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-canvas'
          }}
        />
        <div className="modal-actions">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;