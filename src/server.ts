import mongodb, { MongoClient, ServerApiVersion } from 'mongodb'

import app from './app'
import { DATABASE, MONGODB_URI } from './secret'
import winston from 'winston';
import { logger } from './logger';

const mongoUri = MONGODB_URI

const client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
});

async function start() {
  try {
    await client.connect();
    app.listen(app.get('port'), () => {
      logger.info(
        '  App is running at port ' + app.get('port')
        
      );
      logger.info('  Press CTRL-C to stop\n');
    });

  } catch(err: any) {
    logger.error(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
    process.exit(1);
  }
}

start();

export const db = client.db(DATABASE);