// animations/fadeIn.ts
export const fadeIn = (direction: 'up' | 'down', delay: number) => {
  const isUp = direction === 'up';
  const isDown = direction === 'down';

  return {
    hidden: {
      y: isUp ? 40 : isDown ? -40 : 0,
      scale: 0.9,
      opacity: 0,
    },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

