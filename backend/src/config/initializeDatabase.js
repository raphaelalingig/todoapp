import { createConnection } from "mysql2/promise";

export async function initializeDatabase() {
  const configWithoutDb = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
  };

  try {
    const connection = await createConnection(configWithoutDb);

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS todo`);
    console.log("Database 'todo' checked/created");

    // Switch to the newly created database
    await connection.changeUser({ database: "todo" });

    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS tasks(
            task_id INT PRIMARY KEY AUTO_INCREMENT,
              user_id INT,
            title VARCHAR(255),
            description TEXT,
            due_date DATETIME,
            file_path VARCHAR(255),
            status VARCHAR(50),
          
             created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)`,
    ];

    for (const query of tables) {
      await connection.query(query);
    }

    console.log("All tables created successfully!");
    await connection.end();
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}
