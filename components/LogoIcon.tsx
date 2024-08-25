import numberOf from "@/package.json";

export const LogoIcon = () => {
  return (
    <a
      className="py-2 px-3 flex no-underline items-center gap-2"
      href="/"
      rel="noreferrer"
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        fill="currentColor"
      >
        <path d="M5.285 0A5.273 5.273 0 0 0 0 5.285v13.43A5.273 5.273 0 0 0 5.285 24h13.43A5.273 5.273 0 0 0 24 18.715V5.285A5.273 5.273 0 0 0 18.715 0ZM12 4.154a8.809 7.337 0 0 1 8.809 7.338A8.809 7.337 0 0 1 12 18.828a8.809 7.337 0 0 1-2.492-.303A8.656 7.337 0 0 1 5.93 19.93a9.929 7.337 0 0 0 1.54-2.155 8.809 7.337 0 0 1-4.279-6.283A8.809 7.337 0 0 1 12 4.154" />
      </svg>
      ChismeApp
      <small className="text-orange-300 italic">v{numberOf.version}</small>
    </a>
  );
};
