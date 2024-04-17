/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const fontCss = css({
  fontSize: "10px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "left",
  color: "#FF3D3D",
});

const Tooltip = ({ children }: Props) => {
  return <div css={fontCss}>{children}</div>;
};

export default Tooltip;
