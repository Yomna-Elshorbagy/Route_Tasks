-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 12:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `linked_posts`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `tittle` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `tittle`, `description`, `user_id`) VALUES
(1, 'SQL', 'Database', 2),
(2, 'Mongo DB', 'Database', 3),
(3, 'Node.js', 'Back-end', 4),
(4, 'Nest.js', 'Back-end', 2),
(5, 'tittle', 'dec', 5),
(6, 'tittle1', 'dec1', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(2, 'ahmed', 'ahmed@gmail.com', '123456'),
(3, 'yomna 26', 'ahmed@gmail.com', '123456'),
(4, 'yara', 'yara@yahoo.com', '123456'),
(5, 'sara', 'sara@yahoo.com', '123456'),
(6, 'omar mohamed', 'amora@yahoo.com', '123456'),
(7, 'yomna 26', 'ahmed@gmail.com', '123456'),
(8, 'yamona', 'yamona@gmail.com', '123456'),
(9, 'yamonaaaaaaaaa', 'yamona123@gmail.com', '123456'),
(10, 'yamonaaaaaaaaa', 'yamona123@gmail.com', '123456'),
(11, 'yamonaaaa', 'yamonaaa3@gmail.com', '[object Promise]'),
(12, 'yamonaaaa', 'yamonaaa31@gmail.com', '$2b$08$Jnwcu/ams4c96/ZWu8PUsuNq6KjZrbJD3hBkgWlGP7HdKwb051u0e'),
(13, 'yamonaaaa', 'yamonaaa31111@gmail.com', '$2b$08$/M6Vt32Bv73jnW0CKC3CPers1OzEYxWfrkRFkHDWYoXomu9P7DfCe'),
(14, 'yamonaaaa', 'yamonaaa321@gmail.com', '$2b$08$314aSmAVHtMDhzNFowC62uQvXVMJHR284UNlpkRCY/AIPRfI9Qo46'),
(15, 'yamonaaaa', 'hamada@gmail.com', '$2b$08$5V4cvTd3HGvud7CN7hZ.tOh72c650ORwlrpt6j9rvFoXoRNm9UCmO'),
(16, 'dodo', 'ya@gmail.com', '$2b$08$fysXZ9RFC6v4vyhMryuk3O9MdEmyfiqaylnTUqBArY.5PLSBgFLt2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Relation` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `Relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
