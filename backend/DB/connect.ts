// connect to DB and sync table definition
import DB from './sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const connect = async () => {
  try {
    await DB.authenticate()
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error)
  }
}

export default connect

// save code snipet for db sync
// DB.sync({ force: true })
//   // eslint-disable-next-line no-console
//   .then((res) => console.log(res))
//   // eslint-disable-next-line no-console
//   .catch((res) => console.log(res))
