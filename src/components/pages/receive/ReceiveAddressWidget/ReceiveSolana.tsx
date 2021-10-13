import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { styled } from '@linaria/react';

import { TokenAccount } from 'api/token/TokenAccount';
import { UsernameAddressWidget } from 'components/common/UsernameAddressWidget';
import { Accordion, Icon } from 'components/ui';
import { getExplorerUrl } from 'utils/connection';
import { useUsername } from 'utils/hooks/useUsername';

import { BottomInfo, Description, ExplorerA, UsernameAddressWidgetWrapper } from './styled';

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 20px;

  background: #fafbfc;
  border-radius: 12px;
`;

const QuestionIcon = styled(Icon)`
  margin-right: 13px;
  width: 44px;
  height: 44px;

  color: #5887ff;
`;

export const ReceiveSolana: FC = () => {
  const cluster = useSelector((state) => state.wallet.network.cluster);

  const availableTokenAccounts = useSelector((state) =>
    state.wallet.tokenAccounts.map((itemToken) => TokenAccount.from(itemToken)),
  );
  const publicKey = useSelector((state) => state.wallet.publicKey);
  const solAccount = useMemo(
    () => availableTokenAccounts.find((account) => account.address.toBase58() === publicKey),
    [availableTokenAccounts, publicKey],
  );
  const { username, domain } = useUsername();

  if (!solAccount) {
    return null;
  }
  return (
    <>
      <Description>
        <InfoBlock>
          <QuestionIcon name="info" />
          <div>
            Receive any token within the <strong>Solana network</strong> even if it is not included
            in your wallet list
          </div>
        </InfoBlock>
        <Accordion title="Which cryptocurrencies can I use?">
          The Solana Program Library (SPL) is a collection of on-chain programs maintained by the
          Solana team. The SPL Token program is the token standard of the Solana blockchain.
          <br />
          <br />
          Similar to ERC20 tokens on the Ethereum network, SPL Tokens are designed for DeFi
          applications. SPL Tokens can be traded on Serum, a Solana based decentralized exchange and
          FTX.
        </Accordion>
      </Description>
      <UsernameAddressWidgetWrapper>
        <UsernameAddressWidget
          address={publicKey || ''}
          username={username ? `${username}${domain}` : ''}
        />
      </UsernameAddressWidgetWrapper>
      <BottomInfo>
        <ExplorerA
          href={getExplorerUrl('address', solAccount.address.toBase58(), cluster)}
          target="_blank"
          rel="noopener noreferrer noindex"
          className="button">
          View in Solana explorer
        </ExplorerA>
      </BottomInfo>
    </>
  );
};
