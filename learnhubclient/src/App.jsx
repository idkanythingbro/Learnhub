import { useState } from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  const [user, setUser] = useState(true);
  if (user) {
    return <ProfilePage user={user} />;
  } else {
    return (
      <>
        <HomePage user={user} />
      </>
    );
  }
}

export default App;
