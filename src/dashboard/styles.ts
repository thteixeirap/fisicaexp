import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-evenly ;

  padding: 20px;
  flex-direction: row;
  display: flex;
`;

export const Main = styled.div`
  place-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Buttons = styled.div`
  width: 25vw;
  display: flex;  
  justify-content: space-between ;
  padding-top: 30px;
  padding-bottom: 40px;
`;

export const UniqueChart = styled.div`
  width: 45vw;
`

export const ContainerTable = styled.div`
  width: 80vw ;
  /* height: 10vw; */
  padding: 25px;
  /* text-align: center; */
  font-size: 1.2em;
  font-size: larger;
  color: #000;
  background-color: white;
`