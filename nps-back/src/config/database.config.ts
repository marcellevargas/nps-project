export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nps-database',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
