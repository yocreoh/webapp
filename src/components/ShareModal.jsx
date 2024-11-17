import React, { useState, useEffect } from 'react';

const ShareModal = ({ item, close, isOpen }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [copied, setCopied] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') close();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [close]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const shareUrl = new URL(`https://www.yocreoh.com/estampitas/${item.id}`);
  if (from) shareUrl.searchParams.append('from', from);
  if (to) shareUrl.searchParams.append('to', to);

  const handleCopy = async () => {
    const shareUrlString = shareUrl.toString();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrlString);
      } else {
        // Fallback for browsers that don't support Clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = shareUrlString;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log('Failed to copy: ' + err);
    }
  };

  if (!isOpen) return null;

  const shareUrlString = shareUrl.toString();
  const shareText = `${from ? `De: ${from}` : ''} ${to ? `Para: ${to}` : ''}`.trim();
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Compartir</h2>
          <button 
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              De
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(opcional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Para
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(opcional)"
            />
          </div>

          <div className="pt-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <input
                type="text"
                readOnly
                value={shareUrl.toString()}
                className="flex-1 bg-transparent text-sm"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                {!copied ? (
                  <span>Copiar enlace</span>
                ) : (
                  <span className="inline-flex items-center">
                    <svg 
                      className="w-3 h-3 mr-1.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    ¡Enlace copiado!
                  </span>
                )}
              </button>
            </div>
            <div className="sharing-buttons flex flex-wrap justify-center mt-4">
              <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                target="_blank" 
                rel="noreferrer" 
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrlString)}`}
                aria-label="Share on Facebook">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <title>Facebook</title>
                  <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z" />
                </svg>
              </a>
              <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                target="_blank" 
                rel="noreferrer" 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrlString)}&text=${encodeURIComponent(shareText)}`}
                aria-label="Share on Twitter">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <title>Twitter</title>
                  <path d="m459 152 1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 0 0 156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0 1 36 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 0 1 181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z" />
                </svg>
              </a>
              <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                target="_blank" 
                rel="noreferrer" 
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrlString}`)}`}
                aria-label="Share on Whatsapp" 
                draggable="false">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <title>Whatsapp</title>
                  <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z" />
                </svg>
              </a>
              <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                target="_blank" 
                rel="noreferrer" 
                href={`https://telegram.me/share/url?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrlString)}`}
                aria-label="Share on Telegram" 
                draggable="false">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <title>Telegram</title>
                  <path d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm115 169c-4 39-20 134-28 178-4 19-10 25-17 25-14 2-25-9-39-18l-56-37c-24-17-8-25 6-40 3-4 67-61 68-67l-1-4-5-1q-4 1-105 70-15 10-27 9c-9 0-26-5-38-9-16-5-28-7-27-16q1-7 18-14l145-62c69-29 83-34 92-34 2 0 7 1 10 3l4 7a43 43 0 0 1 0 10z" />
                </svg>
              </a>
              <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" 
                target="_blank" 
                rel="noreferrer" 
                href={`mailto:?subject=${encodeURIComponent('Compartir')}&body=${encodeURIComponent(`${shareText} ${shareUrlString}`)}`}
                aria-label="Share by Email" 
                draggable="false">
                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <title>Email</title>
                  <path d="M464 64a48 48 0 0 1 29 86L275 314c-11 8-27 8-38 0L19 150a48 48 0 0 1 29-86h416zM218 339c22 17 54 17 76 0l218-163v208c0 35-29 64-64 64H64c-35 0-64-29-64-64V176l218 163z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;