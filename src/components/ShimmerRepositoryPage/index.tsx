import React, { FC } from 'react';
import Shimmer from 'react-shimmer-effect';

import { RepositoryInfo } from './styles';

const ShimmerComponent: FC = () => (
  <>
    <RepositoryInfo>
      <div className="shimmerContainer">
        <header>
          <Shimmer>
            <div className="shimmerCircle img" />
          </Shimmer>
          <div className="textInfo">
            <Shimmer>
              <div className="shimmerLine strong" />
              <div className="shimmerLine p" />
              <div className="shimmerLine small" />
            </Shimmer>
          </div>
        </header>
      </div>
      <div className="shimmerContainer ul">
        <Shimmer>
          {[1, 2, 3, 4].map((i) => (
            <div className="shimmerLine li" />
          ))}
        </Shimmer>
      </div>
      <div className="shimmerContainer issues">
        <Shimmer>
          {[1, 2, 3, 4].map((i) => (
            <div className="shimmerLine li" />
          ))}
        </Shimmer>
      </div>
    </RepositoryInfo>
  </>
);

export default ShimmerComponent;
