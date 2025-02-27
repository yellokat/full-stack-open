// noinspection DuplicatedCode
_ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.map((blog) =>
    blog.likes
  ).reduce((a, b) => {
    return a + b
  })
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // helper function
  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }
    let max = arr[0];
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return maxIndex;
  }

  const likes = blogs.map((blog) =>
    blog.likes
  )
  const maxIdx = indexOfMax(likes)
  return blogs[maxIdx]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let mostBlogAuthor = _(blogs)
    .countBy(e => e.author)
    .toPairs()
    .maxBy(1)

  return {
    author: mostBlogAuthor[0],
    blogs: mostBlogAuthor[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let mostLikesAuthor = _(blogs)
    .groupBy(e => e.author)
    .toPairs()
    .map((e) => [e[0], _(e[1]).sumBy(e => e.likes)])
    .maxBy(1)

  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}