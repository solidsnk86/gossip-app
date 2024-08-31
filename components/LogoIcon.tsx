import numberOf from "@/package.json";

export const LogoIcon = () => {
  return (
    <a
      className="py-2 px-3 flex no-underline items-center gap-1 text-lg"
      href="/"
      rel="noreferrer"
    >
      <img
        src="/logo.png"
        width={28}
        height={28}
        alt="Logo ChismeApp"
        className="mr-1"
      />
      ChismeApp
      <small className="flex text-orange-300 translate-y-[2px] text-xs">
        v{numberOf.version}
      </small>
    </a>
  );
};
