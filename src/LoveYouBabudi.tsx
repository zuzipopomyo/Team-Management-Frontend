import React, { useEffect, useState } from 'react';
import './LoveYouBabudi.css'; // Import CSS file

const LoveYouBabudi = () => {
  const sweetWords = [
    'Sweetheart',
    'Babu',
    'Babudi',
    'Love',
    'Darling',
    'Honey',
    'Angel',
    'Pumpkin',
    'Cupcake',
    'Sugar',
    'Sunshine',
    'Boo',
    'Snugglebug',
    'Cuddlebug',
    'Lovebug',
    'Muffin',
    'Pookie',
    'Lovie',
    'Bunny',
    'Baby',
    'Cutie',
    'Snookums',
    'Buttercup',
    'Dove',
    'Precious',
    'Peach',
    'Teddy',
    'Cherry',
    'Babe',
    'Cookie',
    'Fluffy',
    'Huggabear',
    'Lambchop',
    'Moonbeam',
    'Sprinkles',
    'Bubbles',
    'Marshmallow',
    'Pudding',
    'Twinkle',
    'Rainbow',
    'Rose',
    'Tinkerbell',
    'Choco',
    'Sparkle',
    'Gummybear',
    'Dimples',
    'Angel Face',
    'Button',
    'Pookie Bear',
    'Love Dove',
    'BunBun',
    'Starshine',
    'Cinnamon',
    'Mariposa',
    'SnickerDoodle',
    'Peanut',
    'Panda',
    'Jellybean',
    'Cherry Pie',
    'Ducky',
    'Pooh Bear',
    'Dreamy',
    'Snuggle Muffin',
    'Honey Bun',
    'Starlight',
    'Luna',
    'Twinkie',
    'Pearl',
    'Goldie',
    'Teddy Bear',
    'Sugarplum',
    'Kitten',
    'Cuddle Bunny',
    'Sweet Pea',
    'Love Muffin'
  ];

  const textStyles = ['text-8xl', 'text-9xl', 'text-10xl', 'text-11xl', 'text-12xl'];

  const bgColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffdeeb', '#c9f0ff'];

  const [messages, setMessages] = useState<any>([]);
  const [bgColor, setBgColor] = useState('#ffadad');

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        text:
          Math.random() > 0.5
            ? `Love You ${sweetWords[Math.floor(Math.random() * sweetWords.length)]} ❤️`
            : `I am Sorry ${sweetWords[Math.floor(Math.random() * sweetWords.length)]} 😢`,
        style: textStyles[Math.floor(Math.random() * textStyles.length)],
        color: `color-${Math.floor(Math.random() * 12)}` // Random color
      };

      setMessages((prev: any) => {
        return prev.length >= 2 ? [...prev.slice(1), newMessage] : [...prev, newMessage];
      });

      // Change background color
      setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='love-container' style={{ backgroundColor: bgColor }}>
      {messages.map((msg: any, index: any) => (
        <h1 key={index} className={`love-text ${msg.style} ${msg.color}`}>
          {msg.text}
        </h1>
      ))}
    </div>
  );
};

export default LoveYouBabudi;
