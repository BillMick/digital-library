"use client";

import React from "react";
import Logo from "@/components/Logo/Logo";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const Footer: React.FC = () => {
  return (
    <>
      {/* Music Player */}
      <MusicPlayer />

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 flex flex-col items-center">
        <Logo />
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Digital Library. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
