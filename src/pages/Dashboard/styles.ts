import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: '#3a3a3a3';
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;

  @media (max-width: 675px) {
    font-size: 40px;
  }
`;

export const FormGroup = styled.div``;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    width: 490px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    border: 1px solid #fff;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 68px;
    width: 490px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border: 0;
    border-radius: 0 5px 5px 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }

  @media (max-width: 675px) {
    display: block;

    input {
      width: 100%;
      height: 60px;
      border-radius: 5px;
    }

    button {
      margin-top: 16px;
      height: 60px;
      border-radius: 5px;
    }
  }
`;

// export const SugestionList = styled.ul`
//   /* position: absolute; */
//   display: block;
//   border: 1px solid #fff;
//   border-radius: 0 0 5px 5px;
//   border-top-width: 0;
//   list-style: none;
//   margin-top: -3px;
//   max-height: 143px;
//   overflow-y: auto;
//   padding-left: 0;
//   max-width: 490px;
//   background-color: #fff;

//   li {
//     padding: 10px 18px;
//     color: #a8a8b3;
//     transition: font-weight 0.2s;

//     &:hover {
//       color: #3a3a3a3;
//       cursor: pointer;
//       font-weight: 700;
//     }

//     &:not(:last-of-type) {
//       /* border-bottom: 0.5px solid #cbcbd3; */
//     }
//   }
// `;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

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

    img {
      height: 64px;
      width: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;

        @media (max-width: 675px) {
          font-size: 15px;
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

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
