const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let result = 0;
  blogs.forEach((blog) => {
    result += blog.likes;
  });
  return result;
};

const favoriteBlog = (blogs) => {
  let maxLikes = 0;
  let favorite = null;
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favorite = blog;
    }
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  const authors = {};

  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });

  let maxBlogs = 0;
  let resultAuthor = "";

  for (const author in authors) {
    if (authors[author] > maxBlogs) {
      maxBlogs = authors[author];
      resultAuthor = author;
    }
  }

  //console.log('Result', resultAuthor, maxBlogs)

  return {
    author: resultAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  const authors = {};

  blogs.forEach((blog) => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes;
    } else {
      authors[blog.author] = blog.likes;
    }
  });

  let maxLikes = 0;
  let resultAuthor = "";

  for (const author in authors) {
    if (authors[author] > maxLikes) {
      maxLikes = authors[author];
      resultAuthor = author;
    }
  }

  //console.log('Result', resultAuthor, maxLikes)

  return {
    author: resultAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
