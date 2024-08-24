import React, { useContext, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      {/* Your existing header code */}
      {isLoggedIn && user ? (
        <div>
          Welcome, {user.name}!<button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <a href="/admin-login">Login</a>
        </div>
      )}
    </header>
  );
}
