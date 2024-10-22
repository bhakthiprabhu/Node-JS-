const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const oracledb = require('oracledb');

// Middleware to create table
exports.createTable = async (req, res, next) => {
  let connection;
  try {
    // Create a connection to the database
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING, // hostname, port, and service name or SID of the database
      privilege: oracledb.SYSDBA
    });

    console.log('Connected to the database');

    // Define the table name
    const tableName = process.env.DB_TABLE_NAME

    // Check if the table exists
    const checkTableQuery = `
      SELECT COUNT(*) AS count
      FROM user_tables
      WHERE table_name = :tableName
    `;

    const result = await connection.execute(checkTableQuery, { tableName: tableName.toUpperCase() });

    if (result.rows[0][0] === 0) {  // Adjusted to access the correct value in the result
      // Table does not exist, so create it
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id NUMBER GENERATED BY DEFAULT AS IDENTITY,
          name VARCHAR2(100),
          age NUMBER,
          PRIMARY KEY (id)
        )
      `;

      await connection.execute(createTableQuery);
      console.log(`Table ${tableName} created successfully`);
    } else {
      console.log(`Table ${tableName} already exists`);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (connection) {
      try {
        // Close the connection
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
  next();
};