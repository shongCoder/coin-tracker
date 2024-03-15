import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../api";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

const Detail = styled.div`
  /* display: flex;
  justify-content: space-between; */
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 50, 150, 0.1);
  margin-bottom: 10px;
`;
const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    padding-top: 5px;
    margin-bottom: 5px;
  }
`;

interface PriceData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
    refetchInterval: 5000,
  });
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <>
          <Detail>
            <DetailItem>
              <span>open</span>
              <span>{data?.open}</span>
            </DetailItem>
          </Detail>
          <Detail>
            <DetailItem>
              <span>high</span>
              <span>{data?.high}</span>
            </DetailItem>
          </Detail>
          <Detail>
            <DetailItem>
              <span>low</span>
              <span>{data?.low}</span>
            </DetailItem>
          </Detail>
          <Detail>
            <DetailItem>
              <span>close</span>
              <span>{data?.close}</span>
            </DetailItem>
          </Detail>
        </>
      )}
    </div>
  );
}

export default Price;
