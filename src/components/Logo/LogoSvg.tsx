import React from "react";
import Image from "next/image";

const LogoSvg = ({ width = 200, height = 60 }) => {
  return (
    <Image
      src="/logo/logo_black.png" // Update this path with your logo image
      alt="Logo"
      width={width}
      height={height}
      priority // Ensures the logo loads quickly
    />
  );
};

export default LogoSvg;
