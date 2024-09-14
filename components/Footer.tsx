import { ThemeSwitcher } from "./theme-switcher";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-between text-center text-xs items-center">
      <p>
        Hecho con 🤍 por{" "}
        <a
          href="https://github.com/solidsnk86"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          SolidSnk86
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
};
