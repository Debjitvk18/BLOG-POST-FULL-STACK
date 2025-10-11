export const mapPostToFrontend = (post) => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    imageUrl: post.image,
    userId: post.user_id,
    username: post.username,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  };
};

export const mapPostsToFrontend = (posts) => {
  return posts.map(mapPostToFrontend);
};
