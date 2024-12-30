
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginUserDetails } from "./service/user.service";
import Routing from "./components/Routing";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginUserDetails());
  }, []);

  return (
    <main className=" bg-black">
      <Routing />
    </main>
  );
};

export default App;
