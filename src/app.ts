import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import account from './routers/account';

dotenv.config({ path: '.env' });
const app = express();

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json())

// Set up routers
app.use('/api/v1/account', account);


export default app;