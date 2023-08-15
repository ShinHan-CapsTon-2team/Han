import React from "react";
import styled from "styled-components";
 // 컴포넌트 조립 하기 
const InTitle=({ value, onChange, width }) => {
    return (
      <Layout>
        <In value={value} onChange={onChange} width={width} />
      </Layout>
    );
  };
  
  export default InTitle;
  
  const Layout = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 31px;
    height: 40px;
    input{
        color: 'black',
        fontSize: 40,
        fontFamily: 'Inter',
        fontWeight: '400',
        border: 'none',
        outline: 'none',
        width: '100%',
        '@media screen and (max-height: 864px)': {
            fontSize: 35,
    },
    
    
  `;
  const In = styled.input`
  color: 'black',
  fontSize: 40,
  fontFamily: 'Inter',
  fontWeight: '400',
  border: 'none',
  outline: 'none',
  width: '100%',
  @media screen and (max-height: 864px)': {
      fontSize: 35,
    }
    
  `;