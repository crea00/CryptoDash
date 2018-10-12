import React from 'react';
import styled,{ css } from 'styled-components';
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import { fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground } from "./Style";

const numberFormat = number => {
  return +(number + '').slice(0, 7);
}

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const CoinTileCompact = CoinTile.extend`
  ${fontSize3} 
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: right; 
`;

const PaddingBlue = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 5px;
`;

const ChartGrid = styled.div`
  display: grid;
  margin-top: 15px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

export default function() {
  let self = this;

  return (
    [<CoinGrid>
      {this.state.prices.map(function(price, index) {
        let sym = Object.keys(price)[0];
        let data = price[sym]['USD'];
        let tileProps = {
          dashboardFavorite: sym === self.state.currentFavorite,
          onClick: () => {
            self.setState({ currentFavorite: sym });
          }
        }
        return index < 5 ? (
          <CoinTile {...tileProps}> 
            <CoinHeaderGrid>        
              <div>{sym}</div> 
              <CoinSymbol>
                <ChangePct red={data.CHANGEPCT24HOUR < 0}> 
                  {numberFormat(data.CHANGEPCT24HOUR)}% 
                </ChangePct>
              </CoinSymbol>
            </CoinHeaderGrid>  
            <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>     
        </CoinTile>
         ) : (
          <CoinTileCompact {...tileProps}>
            <div style={{justifySelf: 'left'}}> {sym}</div>
            <CoinSymbol>
              <ChangePct red={data.CHANGEPCT24HOUR < 0}> 
                {numberFormat(data.CHANGEPCT24HOUR)}% 
              </ChangePct>
            </CoinSymbol>
            <div>${numberFormat(data.PRICE)}</div>     
          </CoinTileCompact>
        );
      })}
    </CoinGrid>,
    <ChartGrid>
      <PaddingBlue>
        <h2 style={{ textAlign: 'center' }}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>
        <img 
          style={{ height: '200px', display: 'block', margin: 'auto' }} 
          src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`}
        />
      </PaddingBlue>
      <PaddingBlue>
        Chart goes here...
      </PaddingBlue>
    </ChartGrid>
    ]
  )
}