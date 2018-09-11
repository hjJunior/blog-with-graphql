'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')

const resolvers = {
  Query: {
    async allUsers() {
      const users = await User.all()
      return users.toJSON()
    },
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    },
    async allPosts() {
      const posts = await Post.all()
      return posts.toJSON()
    },
    async fetchPost(_, { id }) {
      const post = await Post.find(id)
      return post.toJSON()
    }
  },
  Mutation: {
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)
      return token
    },
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password })
    },
    async addPost(_, { title, content }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check()

        // Get the authenticated user
        const user = await auth.getUser()

        // Add new post
        return await Post.create({
          user_id: user.id,
          title,
          slug: slugify(title, { lower: true }),
          content
        })
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error('Missing or invalid jwt token')
      }
    }
  }
}