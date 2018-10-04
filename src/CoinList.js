import React from 'react';
import styled, { css } from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, redBoxShadow, greenBoxShadow } from "./Style";

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
`;

const CoinTile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
  ${props => props.favorite && css`
    &:hover{
      cursor: pointer;
      ${redBoxShadow}
    }
  `}
`;

const FavoriteCoin = CoinTile.extend`

`;

const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinSymbol = styled.div`
  justify-self: right;
`;

export default function(favorites=false) {
  console.log('CoinSample', this.state.coinList['BTC']);
  let coinKeys = favorites ? this.state.favorites : Object.keys(this.state.coinList).slice(0,100);
  return( 
    <CoinGrid>
      {coinKeys.slice(0,100).map(coin => 
        <CoinTile favorite={favorites}>
          <CoinHeaderGrid>        
            <div>{this.state.coinList[coin].CoinName}</div>
            <CoinSymbol>{this.state.coinList[coin].Symbol}</CoinSymbol>
          </CoinHeaderGrid>
          <img 
            style={{ height: '50px' }} 
            src={`http://cryptocompare.com/${this.state.coinList[coin].ImageUrl}`}
          />
        </CoinTile>  
      )}
    </CoinGrid>
  )
}