import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Fetch data
  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        setLoading(true);
        const [userRes, postRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ]);

        if (!userRes.ok || !postRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const users = await userRes.json();
        const posts = await postRes.json();
        setUsers(users);
        setPosts(posts.slice(0, 10)); // Limit posts for display
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: formData.title,
      body: formData.body,
      userId: selectedUser?.id || 1,
    };
    setPosts((prev) => [newPost, ...prev]);
    setFormData({ title: '', body: '' });
  };

  return (
    <div className={`dashboard ${theme}`}>
      <header>
        <h1>Dashboard</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <>
            {/* User Selector */}
            <section className="user-selector">
              <h2>Select a User</h2>
              <select
                onChange={(e) =>
                  setSelectedUser(users.find((user) => user.id === +e.target.value))
                }
              >
                <option value="">-- Select a User --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {selectedUser && (
                <div className="selected-user">
                  <h3>{selectedUser.name}</h3>
                  <p>Email: {selectedUser.email}</p>
                  <p>Company: {selectedUser.company.name}</p>
                </div>
              )}
            </section>

            {/* Form for Adding a Post */}
            <section className="post-form">
              <h2>Create a Post</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="body">Body</label>
                  <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    placeholder="Enter post body"
                    required
                  ></textarea>
                </div>
                <button type="submit">Add Post</button>
              </form>
            </section>

            {/* Post List */}
            <section className="post-list">
              <h2>Posts</h2>
              {posts.length > 0 ? (
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="post">
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                      <p>
                        <strong>User:</strong>{' '}
                        {users.find((user) => user.id === post.userId)?.name || 'Unknown'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No posts available</p>
              )}
            </section>
          </>
        )}
      </main>

      <footer>
        <p>© 2024 Dashboard App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
