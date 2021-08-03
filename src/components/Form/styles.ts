import styled from 'styled-components';

export const Container = styled.form`
  width: 500px;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 30px;

  padding: 20px 40px;

  position: absolute;
  top: 30px;
  left: 40px;

  z-index: 1;

  fieldset {
    border: 0;

    legend {
      width: 100%;

      font-size: 32px;
      line-height: 34px;
      color: #5c8599;
      font-weight: 700;

      border-bottom: 1px solid #d3e2e5;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }

    > div {
      + div {
        margin-top: 24px;
      }

      label {
        display: flex;
        color: #8fa7b3;
        margin-bottom: 8px;
        line-height: 24px;

        span {
          font-size: 14px;
          color: #8fa7b3;
          margin-left: 24px;
          line-height: 24px;
        }
      }

      input {
        width: 100%;
        height: 44px;
        padding: 0 16px;

        background: #f5f8fa;
        border: 1px solid #d3e2e5;
        border-radius: 20px;
        outline: none;
        color: #5c8599;
      }
    }
  }

  button {
    margin-top: 34px;

    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background-color: #4254f5;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 800;

    transition: background-color 0.2s;

    &:hover {
      background-color: #6c79f5;
    }
  }

  /* Styling react select */

  .filter__control {
    width: 100% !important;
    background: #f5f8fa !important;
    border: 1px solid #d3e2e5 !important;
    border-radius: 20px !important;
    outline: none !important;
    color: #5c8599 !important;
  }

  .filter__option {
    background: #f5f8fa !important;
    color: #5c8599 !important;
  }

  .filter__option--is-focused {
    background: #d3e2e5 !important;
    color: #010101 !important;
  }
`;
