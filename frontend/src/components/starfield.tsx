function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 110 }, (_, i) => {
  const cols = 11;
  const rows = 10;
  const col = i % cols;
  const row = Math.floor(i / cols);

  const jitterX = (pseudoRandom(i + 1) * 0.85 + 0.05) * (100 / cols);
  const jitterY = (pseudoRandom((i + 1) * 31) * 0.85 + 0.05) * (100 / rows);

  const left = col * (100 / cols) + jitterX;
  const top = row * (100 / rows) + jitterY;
  const duration = 2.5 + pseudoRandom((i + 1) * 7) * 3.5;
  const delay = pseudoRandom((i + 1) * 13) * 6;

  let size: number;
  let isBig = false;

  if (i % 14 === 0) {
    size = 3.2;
    isBig = true;
  } else if (i % 7 === 0) {
    size = 2.4;
  } else if (i % 3 === 0) {
    size = 1.0;
  } else {
    size = 1.5;
  }

  const opacity = isBig
    ? 0.75 + pseudoRandom((i + 1) * 19) * 0.25
    : 0.25 + pseudoRandom((i + 1) * 19) * 0.55;

  const shouldTwinkle = i % 4 !== 0;

  return {
    id: i,
    left,
    top,
    duration,
    delay,
    size,
    opacity,
    shouldTwinkle,
    isBig,
  };
});

const SHOOTING_STARS = [
  { id: 0, top: 16, left: 35, duration: 10, delay: 1, width: 220 },
  { id: 1, top: 42, left: 68, duration: 13, delay: 6, width: 250 },
  { id: 2, top: 72, left: 25, duration: 16, delay: 11, width: 200 },
];

export function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STARS.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`star${star.shouldTwinkle ? " twinkle" : ""}${star.isBig ? " star-big" : ""}`}
          style={
            {
              top: `${star.top.toFixed(2)}%`,
              left: `${star.left.toFixed(2)}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              ...(star.shouldTwinkle
                ? {
                    animationDuration: `${star.duration.toFixed(2)}s`,
                    animationDelay: `${star.delay.toFixed(2)}s`,
                  }
                : {}),
            } as React.CSSProperties
          }
        />
      ))}
      {SHOOTING_STARS.map((shoot) => (
        <div
          key={`shoot-${shoot.id}`}
          className="shooting-star"
          style={
            {
              top: `${shoot.top}%`,
              left: `${shoot.left}%`,
              width: `${shoot.width}px`,
              animationDelay: `${shoot.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
