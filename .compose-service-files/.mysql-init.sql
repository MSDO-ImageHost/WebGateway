USE mysql;
CREATE USER 'authuser'@'localhost' IDENTIFIED BY '1234';
CREATE USER 'likesuser'@'localhost' IDENTIFIED BY '1234';
CREATE USER 'tagsuser'@'localhost' IDENTIFIED BY '1234';
CREATE USER 'commentsuser'@'localhost' IDENTIFIED BY '1234';
GRANT ALL ON *.* TO 'authuser'@'*';
GRANT ALL ON *.* TO 'likesuser'@'*';
GRANT ALL ON *.* TO 'tagsuser'@'*';
GRANT ALL ON *.* TO 'commentsuser'@'*';
FLUSH PRIVILEGES;


CREATE DATABASE IF NOT EXISTS authentication;
USE authentication;
CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	role VARCHAR(255),
	flagged BOOLEAN DEFAULT False,
	banned_until TIMESTAMP,
	last_changed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS Likes;
USE Likes;
CREATE TABLE IF NOT EXISTS Likes (
	postID varchar(255) NOT NULL,
	userID varchar(255) NOT NULL,
	Liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS Tags;

CREATE DATABASE IF NOT EXISTS commentdb;

CREATE DATABASE IF NOT EXISTS imagestorage;