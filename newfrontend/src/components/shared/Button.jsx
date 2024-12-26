import { useNavigate } from "react-router-dom";
const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
  routepath,
}) => {
  const navigate = useNavigate();
  function route() {
    navigate(routepath);
  }
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      onClick={route}
    >
      {leftIcon}
      <span className="relative font-general text-xs uppercase overflow-hidden inline-flex">
        <div>{title}</div>
      </span>
    </button>
  );
};

export default Button;
