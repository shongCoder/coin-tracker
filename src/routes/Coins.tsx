import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  box-shadow: 3px 3px 5px rgba(0, 50, 150, 0.1);
  a {
    width: 440px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinName = styled.div`
  flex: 1;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 10px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Toggle = styled.input`
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid ${(props) => props.theme.textColor};
  border-radius: 1.25em;
  width: 36px;
  height: 20px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: ${(props) => props.theme.textColor};
    transition: left 250ms linear;
  }
  &:checked::before {
    background-color: ${(props) => props.theme.textColor};
    left: 16px;
  }
  &:checked {
    background-color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <ToggleLabel>
          <span>Dark</span>
          <Toggle
            role="switch"
            type="checkbox"
            onClick={toggleDarkAtom}
            checked={isDark}
          />
        </ToggleLabel>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                <CoinName>{coin.name} </CoinName>
                <Arrow>&rarr;</Arrow>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
