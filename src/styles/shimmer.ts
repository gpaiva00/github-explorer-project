import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .shimmerContainer {
    border: 0px solid rgba(255, 255, 255, 1);
    /* box-shadow: 0px 0px 20px rgba(0, 0, 0, .1); */
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    padding: 16px;
    /* width: 200px; */
  }

  .shimmerCircle {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  .shimmerLine {
    width: 96px;
    height: 8px;
    align-self: center;
    margin-left: 16px;
    border-radius: 8px;
  }

`;
