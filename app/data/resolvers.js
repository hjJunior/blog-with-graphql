'use strict'

const resolvers = {
  Query: {
    async allUsers() {},
    async fetchUser(_, { id }) {},
    async allPosts() {},
    async fetchPost(_, { id }) {}
  },
  Mutation: {
    async login(_, { email, password }, { auth }) {},
    async createUser(_, { username, email, password }) {},
    async addPost(_, { title, content }, { auth }) {}
  }
}