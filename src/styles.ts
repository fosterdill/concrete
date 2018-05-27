import styled from 'styled-components';
import { border } from './style-vars';

export const Sidebar = styled.div`
  z-index: 1;
  flex: 0 0 180px;
  background-color: #F7FEEF;
  border-right: ${border};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .50);
`;

export const Body = styled.div`
  background-image: url(public/tile.jpg);
  width: 100%;
  position: relative;
`;

export const StyledDiv = styled.div`
  display: flex;
  height: 100%;
`;