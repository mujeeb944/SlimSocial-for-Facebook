export const generateRandomPosts = (count = 5) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      body: `This is the content for post ${i + 1}.`,
    }));
  };
  
  export const generateRandomUsers = (count = 3) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));
  };
  