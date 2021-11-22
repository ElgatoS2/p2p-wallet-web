import type { FC } from 'react';
import React from 'react';

import { useSwap } from 'app/contexts/swap';

// import { SwapButtonFeeRelayer } from './SwapButtonFeeRelayer';
import { SwapButtonOriginal } from './SwapButtonOriginal';

export const SwapButton: FC = () => {
  const { trade } = useSwap();

  const isSol = trade.inputTokenName === 'SOL';

  if (isSol) {
    return <SwapButtonOriginal />;
  }

  return <SwapButtonOriginal />;
  // return <SwapButtonFeeRelayer />;
};