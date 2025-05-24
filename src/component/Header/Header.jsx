import css from "./Header.module.css";
import AvatarWithStatus from "../AvatarWithStatus/AvatarWithStatus";

export default function AppHeader() {
  return (
    <header className={css.header}>
      <AvatarWithStatus />
      <button type="submit" className={css.button}>
        Log in
      </button>
    </header>
  );
}
