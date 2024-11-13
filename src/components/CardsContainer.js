import React from 'react';
import f1 from '../components/image/f1.png';
import f2 from '../components/image/f2.png';
import f3 from '../components/image/f3.png';
import f4 from '../components/image/f4.png';
import f5 from '../components/image/f5.png';
import f6 from '../components/image/f6.png';

// Card Component
const Card = ({ image, title, description, bgColor }) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg shadow-md ${bgColor}`}>
      <div className="w-16 h-16 mb-4">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-sm mt-2 text-gray-500">{description}</p>
    </div>
  );
};

// Main Component
const CardsContainer = () => {
  const cardsData = [
    {
      image: f1, // Use the imported image variable directly
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders.',
      bgColor: 'bg-blue-100'
    },
    {
      image: f2,
      title: 'Online Order',
      description: 'Order your favorite items online.',
      bgColor: 'bg-pink-100'
    },
    {
      image: f3,
      title: 'Save Money',
      description: 'Save money with our great deals.',
      bgColor: 'bg-green-100'
    },
    {
      image: f4,
      title: 'Promotions',
      description: 'Take advantage of our promotions.',
      bgColor: 'bg-purple-100'
    },
    {
      image: f5,
      title: 'Happy Sell',
      description: 'We provide a joyful selling experience.',
      bgColor: 'bg-yellow-100'
    },
    {
      image: f6,
      title: '24/7 Support',
      description: 'We are here to help anytime, any day.',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
