import React, { useEffect, useState } from 'react';
import './LoveYouBabudi.css'; // Import the CSS file

const LoveYouBabudi = () => {
  const sweetWords = [
    'Sweetheart',
    'Babu',
    'Babudi',
    'Love',
    'Darling',
    'Honey',
    'Pumpkin',
    'Cupcake',
    'Sugar',
    'Sunshine',
    'Boo',
    'Snugglebug',
    'Lovebug',
    'Muffin',
    'Pookie',
    'Lovie',
    'Bunny',
    'Baby',
    'Cutie',
    'Snookums',
    'Buttercup',
    'Precious',
    'Teddy',
    'Cookie',

    // 🌸 Burmese Sweet Words 🌸
    'မုန့်လုံးကလေး',
    'ချစ်သူ',
    'မမ',
    'သဲစလွှာ',
    'ချိုချို',
    'ကြာပွင့်',
    'လှိုင်',
    'မုန့်သလဲ',
    'ချစ်မောင်',
    'မယ်မယ်',
    'ဘဲပျော့',
    'ကြက်ဖ'
  ];

  const sweetSentences = [
    'Love You ❤️',
    'I am Sorry 😢',
    'I Miss You 🥹💖',
    'You are my Sunshine ☀️💛',
    'My Heart Beats for You 💓',
    'You are my Forever 🌎💑',
    'I Love You So Much 💞',
    'You are My Everything 🥰💘',
    'Thinking of You 🌸',
    'You are the Love of My Life 💍'
  ];

  const cuteEmojis = ['❤️', '💕', '💖', '💘', '💞', '🌸', '✨', '🌟', '🥰', '😍', '😻', '🌷', '💫', '🎀', '💐', '💛'];

  const textColors = [
    'text-red-500',
    'text-pink-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
    'text-orange-500'
  ];

  const bgColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffdeeb', '#c9f0ff'];

  const [messages, setMessages] = useState<any>([]);
  const [bgColor, setBgColor] = useState<any>('#ffadad');
  const [emojis, setEmojis] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSweetWord = sweetWords[Math.floor(Math.random() * sweetWords.length)];
      const randomSentence = sweetSentences[Math.floor(Math.random() * sweetSentences.length)];
      const randomEmoji = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];

      const newMessage = {
        text: `${randomSentence} ${randomSweetWord} ${randomEmoji}`,
        color: textColors[Math.floor(Math.random() * textColors.length)]
      };

      setMessages((prev: any) => (prev.length >= 2 ? [...prev.slice(1), newMessage] : [...prev, newMessage]));

      setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);

      const newEmojis = Array.from({ length: 10 }, () => ({
        emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
        left: Math.random() * 100 + 'vw',
        top: Math.random() * 100 + 'vh',
        size: Math.random() * 50 + 20 + 'px',
        duration: Math.random() * 4 + 2 + 's'
      }));

      setEmojis(newEmojis);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='love-container' style={{ backgroundColor: bgColor }}>
      {/* 🎵 Background Music */}
      <audio autoPlay loop>
        <source src='https://www.bensound.com/bensound-music/bensound-romantic.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>

      {messages.map((msg: any, index: any) => (
        <h1 key={index} className={`love-text ${msg.color}`}>
          {msg.text}
        </h1>
      ))}

      {emojis.map((emoji: any, index: any) => (
        <span
          key={index}
          className='floating-emoji'
          style={{
            left: emoji.left,
            top: emoji.top,
            fontSize: emoji.size,
            animationDuration: emoji.duration
          }}
        >
          {emoji.emoji}
        </span>
      ))}
    </div>
  );
};

export default LoveYouBabudi;
