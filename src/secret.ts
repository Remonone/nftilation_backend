import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

export const MONGODB_URI = process.env['MONGODB_URI'] as string
export const SALT = process.env['SALT'] as string
export const DATABASE = process.env['DATABASE'] as string