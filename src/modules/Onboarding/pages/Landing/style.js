import styled from "styled-components";

const LandingStyle = styled.div`
  @media only screen and (max-width: 570px) {
    .custom-input-group {
      flex-direction: column;
      input {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;

export default LandingStyle;
