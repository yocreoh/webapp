import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAd from './GoogleAd';
import Tag from './ui/Tag';

function CardList({ data }) {
  const handleImageError = (e) => {
    e.target.src = '/noimage.png';
  };

  const renderItem = (item) => (
    <Link key={item.id} to={`/estampita/${item.id}`} className="flex items-center p-4 border-b border-blue-700/10">
      <div className="w-16 h-16 overflow-hidden mr-4">
        <img 
          src={item.thumbnail || '/noimage.png'}  
          alt={item.title} 
          className="w-full h-full object-cover object-top rounded"
          onError={handleImageError} 
        />
      </div>
      <div>
        <h2 className="font-bold">{item.title}</h2>
        <div className="text-sm text-gray-600">
          {item.tags.map((tag, index) => 
            <Tag key={index}>{tag}</Tag>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="pt-16 px-4">
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && index % 10 === 0 && (
            <GoogleAd slot="GOOGE-AD" />
          )}
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CardList;
