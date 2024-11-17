import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';
import ShareModal from './ShareModal';
import GoogleAd from './GoogleAd';
import Tag from './ui/Tag';
import Button from './ui/Button';

function CardDetails({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const item = data.find(d => d.id === id);
  if (!item) return <p>Estampita no encontrada.</p>;

  return (
    <div className="pt-4 px-4">
      <Card
        holographicOptions={{ enabled: true }}
        img={item.image}
        size={{ width: 300, height: 400 }}
        rarityPreset="common"
        />

      <GoogleAd slot="GOOGE-AD" />

      <div className="my-2 px-4 space-y-6">
        
        <h1 className="font-roboto-thin text-3xl font-thin mb-6 text-center">
          {item.title}
        </h1>

        <div className="text-gray-600 flex justify-center">
          {item.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>

        <div className="relative p-1 flex justify-center">
          <Button onClick={() => setIsModalOpen(true)}>Compartir</Button>
        </div>

        <div className="my-2">
          <h2 className="font-roboto-thin text-xl mb-1">Oración</h2>
          <p className="text-gray-800">{item.prey}</p>
        </div>

        <div className="my-2">
          <h2 className="font-roboto-thin text-xl mt-1">Efecto</h2>
          <p className="text-gray-800">{item.effect}</p>
        </div>

        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>

      <ShareModal item={item} isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
    </div>
  );
}

export default CardDetails;
