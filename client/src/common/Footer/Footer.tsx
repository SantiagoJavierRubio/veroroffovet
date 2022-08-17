import React from 'react';
import styled from '@emotion/styled';

const FooterComp = styled.footer`
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
    font-size: 12px;
    color: #777;
`;

export default function Footer() {
  return (
    <FooterComp>
        This is my footer
    </FooterComp>
  )
}
