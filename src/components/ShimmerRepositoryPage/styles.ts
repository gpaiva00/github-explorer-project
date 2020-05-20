import styled from 'styled-components';

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    .img {
      width: 120px;
      height: 120px;
    }

    div.textInfo {
      margin-left: 14px;
      display: flex;
      flex-direction: column;

      .strong {
        width: 400px;
        height: 40px;

        @media (max-width: 675px) {
          max-width: 500px;
          width: 200px;
          height: 20px;
        }
      }

      .p {
        width: 320px;
        height: 50px;
        margin-top: 10px;
        align-self: flex-start;

        @media (max-width: 675px) {
          /* font-size: 15px; */
        }
      }

      .small {
        height: 10px;
        width: 150px;
        align-self: flex-start;
        display: block;
        margin-top: 16px;
      }
    }
  }

  .ul {
    display: flex;
    margin-top: 40px;

    .li {
      height: 60px;
      width: 55px;

      & + .li {
        margin-left: 60px;
      }
    }
  }

  .issues {
    margin-top: 80px;
    display: flex;
    flex-direction: column;

    .li {
      width: 100%;
      padding: 40px 0;
      display: block;

      & + .li {
        margin-top: 10px;
      }
    }
  }
`;
