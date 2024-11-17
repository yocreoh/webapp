import React from 'react';

const Tag = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-blue-50 mx-1 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
      {children}
    </span>
  );
};

export default Tag;