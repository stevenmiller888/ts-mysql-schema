--
-- Database.
--

DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
USE test;

--
-- Users.
--

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id      VARBINARY(24) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  enabled BOOLEAN DEFAULT TRUE,
  friends INT
);

-- 
-- Posts.
-- 

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id         VARBINARY(24) NOT NULL,
  visibility ENUM('public', 'private') NOT NULL
);

