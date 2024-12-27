import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../assets/constant";
const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname == link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={` text-white ${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transistion`}
          >
            <img
              src={link.imgUrl}
              alt={link.label}
              width={16}
              height={16}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            <p className="text-[10px] font-medium leading-[140%] text-light-2">
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
