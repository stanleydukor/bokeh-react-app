import React from "react";
import { connect } from "react-redux";
import { selectors as imageSelectors } from "store/image";
import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import EditorHeaderStyle from "./style";
import history from "routes/history";

const EditorHeader = ({ rgbImageUrl, depthImageUrl }) => {
  const routeLocationNext = path => {
    if (path.includes("upload-images")) {
      history.push("/app/editor");
    }
    if (path.includes("editor")) {
      history.push("/app/complete");
    }
  };
  const routeLocationPrev = path => {
    if (path.includes("upload-images")) {
      history.push("/");
    }
    if (path.includes("editor")) {
      history.push("/app/upload-images");
    }
    if (path.includes("complete")) {
      history.push("/app/editor");
    }
  };
  return (
    <EditorHeaderStyle>
      <Flex h="70px" px="20px" bg="transparent" alignItems="center" justifyContent="space-between">
        <IconButton
          onClick={() => {
            routeLocationPrev(history.location.pathname);
          }}
          variant="primary"
          icon={<ArrowBackIcon />}
        />
        {history.location.pathname.includes("complete") ? null : (
          <IconButton
            onClick={() => {
              routeLocationNext(history.location.pathname);
            }}
            disabled={history.location.pathname.includes("upload-images") && (!rgbImageUrl || !depthImageUrl)}
            variant="primary"
            icon={<ArrowForwardIcon />}
          />
        )}
      </Flex>
    </EditorHeaderStyle>
  );
};

const mapStateToProps = state => ({
  rgbImageUrl: imageSelectors.rgbImageUrl(state),
  depthImageUrl: imageSelectors.depthImageUrl(state)
});

export default connect(mapStateToProps, null)(EditorHeader);
