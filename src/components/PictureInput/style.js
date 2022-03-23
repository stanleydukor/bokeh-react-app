import styled from "styled-components";

const PictureInputStyle = styled.div`
  width: 100%;
  min-height: 147px;
  margin: 0;
  .picture-input {
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    .profile-image {
      img {
        object-fit: contain;
        height: 100%;
        width: 100%;
      }
    }
    label {
      justify-content: center;
      align-items: center;
      background: transparent;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    .file {
      justify-content: center;
      align-items: center;
      background: transparent;
      height: 100%;
      width: 100%;
    }
    input {
      display: none;
    }
    @media only screen and (max-width: 570px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .profile-image {
        margin-bottom: 10px;
      }
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default PictureInputStyle;
