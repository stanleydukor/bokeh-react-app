import styled from "styled-components";

const EditorStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .image-viewer {
    flex: 1;
    width: 100%;
  }
  .editor-pane {
    height: 250px;
    width: 100%;
    .editor-pane-tools {
      width: 100%;
    }
  }
`;

export default EditorStyle;
