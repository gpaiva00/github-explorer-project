import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 18px;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;

        @media (max-width: 675px) {
          max-width: 500px;
          font-size: 26px;
        }
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;

        @media (max-width: 675px) {
          font-size: 15px;
        }
      }

      small {
        font-size: 15px;
        display: block;
        margin-top: 16px;
        color: #a8a8b3;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      & + svg {
        display: flex;
        align-items: center;
      }

      svg {
        display: block;
        margin-bottom: 16px;
        cursor: pointer;
        /* color: #6c6c80; */
        transition: color 0.2s;

        &:hover {
          color: #d81e5b;
        }
      }

      button {
        border: 0;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }

      @media (max-width: 675px) {
        & + li {
          margin-left: 50px;
        }

        strong {
          font-size: 26px;
        }
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    /* efeito ao deslocar para direita */
    transition: transform 0.2s;

    /* sempre que for seguindo de um elemento do mesmo TIPO
     * a + a {}
     */
    & + a {
      margin-top: 10px;
    }

    &:hover {
      /* desloca para a direita */
      transform: translateX(10px);
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;

        @media (max-width: 675px) {
          font-size: 18px;
        }
      }

      p {
        color: #a8a8b3;
        margin-top: 4px;
        font-size: 18px;

        @media (max-width: 675px) {
          font-size: 16px;
        }
      }
    }

    svg {
      /* pega toda a margem disponivel na esquerda */
      margin-left: auto;
      color: #cbcbd3;
    }
  }
`;

export const NoIssues = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;

  span {
    font-size: 18px;
    color: #737380;
  }
`;
