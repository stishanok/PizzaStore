import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="145" cy="145" r="110" />
      <rect x="25" y="322" rx="6" ry="6" width="240" height="75" />
      <rect x="152" y="411" rx="15" ry="15" width="113" height="45" />
      <rect x="25" y="420" rx="6" ry="6" width="101" height="30" />
      <rect x="25" y="275" rx="6" ry="6" width="240" height="30" />
    </ContentLoader>
  );
}

export default LoadingBlock;
