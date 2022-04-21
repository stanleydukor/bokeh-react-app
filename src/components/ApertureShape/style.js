import styled from "styled-components";

const ApertureShapeStyle = styled.div`
  .color-scheme-container {
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    .color-box {
      cursor: pointer;
      @media only screen and (max-width: 570px) {
        margin-bottom: 10px;
      }
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default ApertureShapeStyle;
