import { Pool } from 'pg';

// Connection string provided by Vercel
const connectionString = "postgres://default:cu6EKkNGC0Xg@ep-divine-snowflake-a4q9tyo6.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"

// Create a pool
const pool = new Pool({
    connectionString: connectionString,
});

export default pool;
