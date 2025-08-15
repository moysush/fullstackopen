const countBy = require('lodash.countby')
const maxBy = require('lodash.maxby')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
    // const count = countBy(blogs, 'author')
    // const max = maxBy(Object.entries(count))
    // return { author: max[0], blogs: max[1] }
    const count = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const author = Object.entries(count).reduce((most, current) => {
        return most[1] > current[1] ? most : current
    })
    return { author: author[0], blogs: author[1]}
}

const mostLikes = (blogs) => {
    const likes = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})
    return likes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }