import React from "react";

export const Tooltip = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      {children}
      <small className="absolute left-8 -translate-x-1/2 mb-2 hidden w-max max-w-xs rounded-md bg-zinc-800 border border-foreground/10 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        {title}
      </small>
    </div>
  );
};
