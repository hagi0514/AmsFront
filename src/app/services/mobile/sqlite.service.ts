import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private sqliteConnection!: SQLiteConnection;
  private dbConnection!: SQLiteDBConnection;

  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase() {
    try {
      const dbName = 'auction.db';

      // Check if connection exists, otherwise create one
      let connection: SQLiteDBConnection | undefined;

      try {
        connection = await this.sqliteConnection.retrieveConnection(dbName, false); // Added 'readonly' argument
      } catch {
        console.log(`Connection for "${dbName}" not found. Creating a new connection.`);
      }

      if (!connection) {
        connection = await this.sqliteConnection.createConnection(
          dbName,
          false, // encrypted
          'no-encryption', // mode
          1, // version
          false // readonly
        );
      }

      if (!connection) {
        throw new Error('Failed to retrieve or create a database connection.');
      }

      this.dbConnection = connection;

      // Open the database
      await this.dbConnection.open();
      console.log(`Database "${dbName}" initialized successfully.`);
    } catch (err) {
      console.error('Error initializing database:', err instanceof Error ? err.message : err);
    }
  }

  async createTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;
      await this.dbConnection.execute(query);
      console.log('Users table created successfully.');
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }

  async insertData(username: string, password: string) {
    try {
      const query = `INSERT INTO users (username, password) VALUES (?, ?);`;
      await this.dbConnection.run(query, [username, password]);
      console.log('User inserted successfully.');
    } catch (err) {
      console.error('Error inserting user:', err);
    }
  }

  async authenticateUser(username: string, password: string): Promise<string | null> {
    try {
      const query = `SELECT id FROM users WHERE username = ? AND password = ?;`;
      const result = await this.dbConnection.query(query, [username, password]);

      if (result.values && result.values.length > 0) {
        const userId = result.values[0].id;
        const token = this.generateToken(userId); // Generate a token
        this.storeToken(token); // Save the token
        return token;
      } else {
        console.error('Authentication failed: Invalid credentials.');
        return null;
      }
    } catch (err) {
      console.error('Error authenticating user:', err);
      return null;
    }
  }

  private generateToken(userId: number): string {
    // Generate a simple token (you can enhance this logic)
    return btoa(`${userId}:${new Date().toISOString()}`);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  async fetchData() {
    try {
      const query = `SELECT * FROM users;`;
      const result = await this.dbConnection.query(query);
      console.log('Users fetched:', result.values);
      return result.values;
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  }
}