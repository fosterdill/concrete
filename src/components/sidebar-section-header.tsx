import * as React from 'react';
import styled from 'styled-components';

const SectionH2 = styled.h2`
  box-sizing: border-box;
  font-size: 16px;
  text-transform: uppercase;
  width: 100%;
  padding: 22px 18px 6px 18px;
  border-bottom: 1px solid rgb(231, 231, 231);
`;

interface Props {
  children: any
}

const SidebarSectionHeader: React.SFC<Props> = ({ children }: Props) => (
  <SectionH2>
    {children}
  </SectionH2>
);

export default SidebarSectionHeader;