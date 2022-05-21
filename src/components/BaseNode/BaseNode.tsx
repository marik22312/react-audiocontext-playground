import React from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import style from "./BaseNode.module.scss";

export const BaseNode: React.FC = (props) => {
  return <div className={style.nodeWrapper}>{props.children}</div>;
};
