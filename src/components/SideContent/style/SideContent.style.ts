import { Avatar as AntAvatr } from 'antd';
import { theme } from 'src/styles/Theme';
import styled from 'styled-components';
interface StyleProps {
  mobileOn: any;
}

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 100px; */
  width: 100%;
`;

export const P = styled.p`
  color: 808080;
  margin: 0 0 5px 10px;
`;
export const Red = styled.span`
  color: red;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  align-items: center;
  gap: 10px;
`;

export const Ul = styled.ul`
  height: 800px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* touch-action: pan-y; */
  padding: 0 9px;
  ::-webkit-scrollbar {
    width: 6px;
    background: #dbdbdb;
  }

  ::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 1rem;
    border: 2px solid transparent;
  }
  a {
    display: block;
    word-break: keep-all;
    max-width: 140px;
    overflow: hidden;
    padding: 7px;
    font-size: 14px;
    font-weight: 400;
  }
  li {
    border-radius: 8px;
    color: rgb(58, 58, 58);
    transition: all 0.2s;
    margin: 1px 0;
    text-transform: uppercase;
  }
  li:hover {
    background-color: ${theme.color.prRgb(0.3)};
    color: ${theme.color.secondary};
  }

  .active {
    background-color: ${theme.color.prRgb(0.4)};
    color: ${theme.color.secondary};
  }
`;
