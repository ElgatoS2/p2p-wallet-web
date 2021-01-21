import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@linaria/react';
import { Decimal } from 'decimal.js';
import { rgba } from 'polished';

import { TokenAccount } from 'api/token/TokenAccount';
import { AmountUSDT } from 'components/common/AmountUSDT';
import { TokenAvatar } from 'components/common/TokenAvatar';
import { shortAddress } from 'utils/tokens';

const Wrapper = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${rgba(0, 0, 0, 0.05)};
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  color: #000;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`;

const TokenName = styled.div`
  max-width: 300px;
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

const WrapperLink = styled(Link)`
  display: flex;
  margin: 10px;
  padding: 10px;

  text-decoration: none;

  cursor: pointer;

  &:hover {
    background: #f6f6f8;
    border-radius: 12px;

    ${TokenName} {
      color: #5887ff;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  color: #a3a5ba;
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
`;

type Props = {
  token: TokenAccount;
};

export const TokenRow: FunctionComponent<Props> = ({ token }) => {
  return (
    <Wrapper>
      <WrapperLink to={`/wallet/${token.address.toBase58()}`}>
        <TokenAvatar symbol={token.mint.symbol} size={48} />
        <Content>
          <Top>
            <TokenName title={token.mint.address.toBase58()}>
              {token.mint.symbol || token.mint.address.toBase58()}
            </TokenName>
            <AmountUSDT
              value={new Decimal(token.mint.toMajorDenomination(token.balance))}
              symbol={token.mint.symbol}
            />
          </Top>
          <Bottom>
            <div>{shortAddress(token.address.toBase58())}</div>
            <div>
              {token.mint.toMajorDenomination(token.balance)} {token.mint.symbol}
            </div>
          </Bottom>
        </Content>
      </WrapperLink>
    </Wrapper>
  );
};
