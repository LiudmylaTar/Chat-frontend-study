import { FaUserCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import css from "./AvatarWithStatus.module.css";

const AvatarWithStatus = () => {
  return (
    <div className={css.wrapper}>
      <FaUserCircle className={css.icon} />
      <span className={css.check}>
        <FaCheck size={10} color="#4caf50" />
      </span>
    </div>
  );
};
export default AvatarWithStatus;
