// components/GoogleAd.jsx
import React, { useEffect } from 'react';

function GoogleAd({ slot, format = 'auto', responsive = true }) {
  useEffect(() => {
    try {
      // Push the command to AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      {/*GOOGE-AD*/}
    </div>
  );
}

export default GoogleAd;