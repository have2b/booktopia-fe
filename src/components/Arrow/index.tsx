import React from "react";

interface ArrowProp {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function NextArrow(props: ArrowProp) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " before:!text-red-800 before:!text-3xl"}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props: ArrowProp) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " before:!text-red-800 before:!text-3xl"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
