// routes/Library.js
import React from 'react';
import ContentLibrary from '../components/features/ContentLibrary';

const Library = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        <ContentLibrary />
      </div>
    </div>
  );
};

export default Library;
