import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setError("Unable to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>👤 User Explorer</h1>
        <p>ReactJS + AJAX/API Assignment</p>
      </header>

      <main>
        <h2>Users</h2>

        <input
          type="text"
          placeholder="Search users by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        {loading ? (
          <p className="loading">Loading users...</p>
        ) : error ? (
          <p className="loading">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <p className="loading">No users found!</p>
        ) : (
          <div className="user-container">
            {filteredUsers.map((user) => (
              <div className="user-card" key={user.id}>
                <h3>{user.name}</h3>
                <p>📧 {user.email}</p>
                <p>📱 {user.phone}</p>
                <p>🌐 {user.website}</p>
                <p>🏠 {user.address.city}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;