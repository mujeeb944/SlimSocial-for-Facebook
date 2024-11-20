onst initialState = {
    user: null,
    posts: [],
    theme: 'light',
  };
  
  const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
  
    const toggleTheme = () => {
      setState((prevState) => ({
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      }));
    };
  
    const loginUser = (user) => {
      setState((prevState) => ({
        ...prevState,
        user,
      }));
    };
  
    return (
      <AppContext.Provider value={{ state, toggleTheme, loginUser }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const { data: posts, loading, error } = useFetchData('/api/posts');
  
    useEffect(() => {
      if (!posts) return;
      // Update global state with posts
      setState((prevState) => ({
        ...prevState,
        posts,
      }));
    }, [posts]);
  
    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url);
    };
  
    useEffect(() => {
      router.events.on('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, [router.events]);
  
    return (
      <AppProvider>
        <Layout>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data: {error}</p>}
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  };
  
  export default App;
  
  // API routes for posts and users
  export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
  
    return {
      props: {
        posts,
      },
    };
  }
  
  // Mock API handlers
  export const getPost = async (id) => {
    const res = await fetch(https://jsonplaceholder.typicode.com/posts/${id});
    return await res.json();
  };
  
  export const getUser = async (id) => {
    const res = await fetch(https://jsonplaceholder.typicode.com/users/${id});
    return await res.json();
  };
  
  // Example API Route file under /pages/api/posts.js
  export default async function handler(req, res) {
    if (req.method === 'GET') {
      const posts = await getPosts();
      res.status(200).json(posts);
    } else if (req.method === 'POST') {
      const newPost = { id: Date.now(), ...req.body };
      res.status(201).json(newPost);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  
  // Additional utility functions
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Example client-side fetching and context usage
  const HomePage = () => {
    const { state, toggleTheme, loginUser } = useAppContext();
    const { data, loading } = useFetchData('/api/posts');
  
    const login = () => {
      loginUser({ id: 1, name: 'John Doe' });
    };
  
    return (
      <div>
        <h1>Welcome to the Next.js App</h1>
        <button onClick={toggleTheme}>
          Switch to {state.theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <button onClick={login}>Log In</button>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default HomePage;
  // app.js
  
  import React, { useState, useEffect, createContext, useContext } from 'react';
  import { useRouter } from 'next/router';
  import Layout from '../components/Layout';
  import fetch from 'isomorphic-unfetch';
  
  // Context setup for global state management
  const AppContext = createContext();
  
  export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  // Custom hook for fetching data
  const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await res.json();
          setData(json);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };
  
  // Initial global state
  const initialState = {
    user: null,
    posts: [],
    theme: 'light',
  };
  
  const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
  
    const toggleTheme = () => {
      setState((prevState) => ({
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      }));
    };
  
    const loginUser = (user) => {
      setState((prevState) => ({
        ...prevState,
        user,
      }));
    };
  
    return (
      <AppContext.Provider value={{ state, toggleTheme, loginUser }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const { data: posts, loading, error } = useFetchData('/api/posts');
  
    useEffect(() => {
      if (!posts) return;
      // Update global state with posts
      setState((prevState) => ({
        ...prevState,
        posts,
      }));
    }, [posts]);
  
    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url);
    };
  
    useEffect(() => {
      router.events.on('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, [router.events]);
  
    return (
      <AppProvider>
        <Layout>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data: {error}</p>}
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    );
  };
  
  export default App;
  
  // API routes for posts and users
  export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
  
    return {
      props: {
        posts,
      },
    };
  }
  
  // Mock API handlers
  export const getPost = async (id) => {
    const res = await fetch(https://jsonplaceholder.typicode.com/posts/${id});
    return await res.json();
  };
  
  export const getUser = async (id) => {
    const res = await fetch(https://jsonplaceholder.typicode.com/users/${id});
    return await res.json();
  };
  
  // Example API Route file under /pages/api/posts.js
  export default async function handler(req, res) {
    if (req.method === 'GET') {
      const posts = await getPosts();
      res.status(200).json(posts);
    } else if (req.method === 'POST') {
      const newPost = { id: Date.now(), ...req.body };
      res.status(201).json(newPost);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  
  // Additional utility functions
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Example client-side fetching and context usage
  const HomePage = () => {
    const { state, toggleTheme, loginUser } = useAppContext();
    const { data, loading } = useFetchData('/api/posts');
  
    const login = () => {
      loginUser({ id: 1, name: 'John Doe' });
    };
  
    return (
      <div>
        <h1>Welcome to the Next.js App</h1>
        <button onClick={toggleTheme}>
          Switch to {state.theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <button onClick={login}>Log In</button>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default HomePage;
  // app.js
  
  import React, { useState, useEffect, createContext, useContext } from 'react';
  import { useRouter } from 'next/router';
  import Layout from '../components/Layout';
  import fetch from 'isomorphic-unfetch';
  
  // Context setup for global state management
  const AppContext = createContext();
  
  export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  // Custom hook for fetching data
  const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await res.json();
          setData(json);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };
  
  // Initial global state
  const initialState = {
    user: null,
    posts: [],
    theme: 'light',
  };
  
  const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
  
    const toggleTheme = () => {
      setState((prevState) => ({
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      }));
    };