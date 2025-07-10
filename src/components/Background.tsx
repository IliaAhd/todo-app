import { useTheme } from "../contexts/ThemeContext";

export default function Background() {
  const { theme } = useTheme();

  return theme === "light" ? (
    <>
      <img className="w-full sm:hidden" src="bg-mobile-light.jpg" alt="bg" />
      <img
        className="w-full hidden sm:block"
        src="bg-desktop-light.jpg"
        alt="bg"
      />
    </>
  ) : (
    <>
      <img className="w-full sm:hidden" src="bg-mobile-dark.jpg" alt="bg" />
      <img
        className="w-full sm:block hidden"
        src="bg-desktop-dark.jpg"
        alt="bg"
      />
    </>
  );
}
