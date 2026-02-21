import React from 'react';
import { SocialIcons } from "./ui/social-icons";

const SocialIconsDemo = () => {
  return (
    <section className="min-h-[40vh] flex flex-col items-center justify-center bg-neutral-900 w-full py-20">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white uppercase font-mono">Connect with me</h2>
          <p className="text-sm text-neutral-400 font-mono">Hover over the icons below</p>
        </div>

        <SocialIcons />
      </div>
    </section>
  )
}

export default SocialIconsDemo;
