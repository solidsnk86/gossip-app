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
      <small className="flex bg-orange-300 translate-y-[2px] ml-1 text-xs text-black font-bold px-1 rounded-xl">
        BETA
      </small>
    </a>
  );
};
