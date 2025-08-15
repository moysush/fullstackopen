const countBy = require('lodash.countby')
const maxBy = require('lodash.maxby')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
}

const mostBlogs = (blogs) => {
    const count = countBy(blogs, 'author')
    const max = maxBy(Object.entries(count))
    return { author: max[0], blogs: max[1] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }