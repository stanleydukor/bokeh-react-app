import styled from "styled-components";

const FinishStyle = styled.div`
  .titleBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      width: 50px;
      height: 50px;
      color: green;
    }
  }
  .imageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 200px;
      height: auto;
    }
  }
`;

export default FinishStyle;
