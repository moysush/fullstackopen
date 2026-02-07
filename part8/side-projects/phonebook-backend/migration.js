require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/user') // Update path if needed
const Person = require('./models/person') // Update path if needed

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
    migrateData()
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const migrateData = async () => {
  try {
    console.log('--- Starting Migration ---')

    // 1. Reset: Clear all 'friendOf' arrays first to ensure a clean slate
    console.log('Clearing existing friendOf data...')
    await Person.updateMany({}, { $set: { friendOf: [] } })

    // 2. Fetch all Users (they hold the "truth" about friendships currently)
    const users = await User.find({})
    console.log(`Found ${users.length} users. processing relationships...`)

    // 3. Iterate through users and update their friends
    for (const user of users) {
      // For every person in this user's friends list...
      for (const personId of user.friends) {
        
        // ...find the Person and add this User's ID to their 'friendOf' list
        await Person.findByIdAndUpdate(
          personId,
          { $push: { friendOf: user._id } },
          { new: true } // Return updated document (optional)
        )
      }
    }

    console.log('--- Migration Completed Successfully ---')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    // 4. Close the connection
    mongoose.connection.close()
  }
}