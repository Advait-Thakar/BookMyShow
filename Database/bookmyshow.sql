-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2024 at 11:22 AM
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
-- Database: `bookmyshow`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(13, 'Bangalore'),
(15, 'Chennai'),
(12, 'Delhi'),
(14, 'Kolkata'),
(11, 'Mumbai');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_venue` varchar(100) NOT NULL,
  `event_prices` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`event_prices`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_venue`, `event_prices`) VALUES
(1, 'Event Venue 1 Mumbai', '{\"Category A\": 20, \"Category B\": 15}'),
(2, 'Event Venue 2 Delhi', '{\"Category A\": 25, \"Category B\": 18}'),
(3, 'Event Venue 3 Bangalore', '{\"Category A\": 30, \"Category B\": 20}'),
(4, 'Event Venue 4 Kolkata', '{\"Category A\": 22, \"Category B\": 17}'),
(5, 'Event Venue 5 Chennai', '{\"Category A\": 28, \"Category B\": 22}');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(100) NOT NULL,
  `director` varchar(100) DEFAULT NULL,
  `actors` text DEFAULT NULL,
  `release_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `movie_name`, `director`, `actors`, `release_date`) VALUES
(1, '12th_Fail', 'Director 1', 'Actor A, Actor B, Actor C', '2024-01-01'),
(2, 'Animal', 'Director 2', 'Actor X, Actor Y, Actor Z', '2024-02-01'),
(3, 'Article_370', 'Director 3', 'Actor P, Actor Q, Actor R', '2024-03-01'),
(4, 'Dune_Part_2', 'Director 4', 'Actor M, Actor N, Actor O', '2024-04-01'),
(5, 'Kaagaz_2', 'Director 5', 'Actor J, Actor K, Actor L', '2024-05-01');

-- --------------------------------------------------------

--
-- Table structure for table `movies_show_timings`
--

CREATE TABLE `movies_show_timings` (
  `movie_id` int(11) NOT NULL,
  `theatre_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time_slots` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`time_slots`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies_show_timings`
--

INSERT INTO `movies_show_timings` (`movie_id`, `theatre_id`, `date`, `time_slots`) VALUES
(1, 11, '2024-04-05', '[\"10:00 AM\", \"1:00 PM\", \"4:00 PM\"]'),
(2, 12, '2024-04-06', '[\"11:00 AM\", \"2:00 PM\", \"5:00 PM\"]'),
(3, 13, '2024-04-07', '[\"12:00 PM\", \"3:00 PM\", \"6:00 PM\"]'),
(4, 14, '2024-04-08', '[\"1:00 PM\", \"4:00 PM\", \"7:00 PM\"]'),
(5, 15, '2024-04-09', '[\"2:00 PM\", \"5:00 PM\", \"8:00 PM\"]');

-- --------------------------------------------------------

--
-- Table structure for table `seatingarrangement`
--

CREATE TABLE `seatingarrangement` (
  `arrangement_id` int(11) NOT NULL,
  `show_id` int(11) DEFAULT NULL,
  `section` varchar(1) DEFAULT NULL,
  `total_seats` int(11) DEFAULT NULL,
  `available_seats` int(11) DEFAULT NULL,
  `sold_seats` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `show_data`
--

CREATE TABLE `show_data` (
  `show_id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `show_date` date DEFAULT NULL,
  `theatre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `theatres`
--

CREATE TABLE `theatres` (
  `theatre_id` int(11) NOT NULL,
  `theatre_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `currently_showing_movies` text DEFAULT NULL,
  `movies_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theatres`
--

INSERT INTO `theatres` (`theatre_id`, `theatre_name`, `location`, `currently_showing_movies`, `movies_id`) VALUES
(11, 'Theatre A Mumbai', 'Mumbai', '[{\"movie_id\": 1, \"movie_name\": \"12th_Fail\"}, {\"movie_id\": 2, \"movie_name\": \"Animal\"}]', 1),
(12, 'Theatre B Delhi', 'Delhi', '[{\"movie_id\": 2, \"movie_name\": \"Animal\"}, {\"movie_id\": 3, \"movie_name\": \"Article_370\"}]', 2),
(13, 'Theatre C Bangalore', 'Bangalore', '[{\"movie_id\": 3, \"movie_name\": \"Article_370\"}, {\"movie_id\": 4, \"movie_name\": \"Dune_Part_2\"}]', 3),
(14, 'Theatre D Kolkata', 'Kolkata', '[{\"movie_id\": 4, \"movie_name\": \"Dune_Part_2\"}, {\"movie_id\": 5, \"movie_name\": \"Kaagaz_2\"}]', 4),
(15, 'Theatre E Chennai', 'Chennai', '[{\"movie_id\": 5, \"movie_name\": \"Kaagaz_2\"}, {\"movie_id\": 1, \"movie_name\": \"12th_Fail\"}]', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `previous_booking` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD UNIQUE KEY `city_name` (`city_name`),
  ADD KEY `city_name_2` (`city_name`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `movies_show_timings`
--
ALTER TABLE `movies_show_timings`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `seatingarrangement`
--
ALTER TABLE `seatingarrangement`
  ADD PRIMARY KEY (`arrangement_id`),
  ADD KEY `show_id` (`show_id`);

--
-- Indexes for table `show_data`
--
ALTER TABLE `show_data`
  ADD PRIMARY KEY (`show_id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `theatres`
--
ALTER TABLE `theatres`
  ADD PRIMARY KEY (`theatre_id`),
  ADD KEY `theatre_name` (`theatre_name`,`location`),
  ADD KEY `movies_id` (`movies_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movies_show_timings`
--
ALTER TABLE `movies_show_timings`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `seatingarrangement`
--
ALTER TABLE `seatingarrangement`
  MODIFY `arrangement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `show_data`
--
ALTER TABLE `show_data`
  MODIFY `show_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theatres`
--
ALTER TABLE `theatres`
  MODIFY `theatre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movies_show_timings`
--
ALTER TABLE `movies_show_timings`
  ADD CONSTRAINT `movies_show_timings_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`);

--
-- Constraints for table `seatingarrangement`
--
ALTER TABLE `seatingarrangement`
  ADD CONSTRAINT `seatingarrangement_ibfk_1` FOREIGN KEY (`show_id`) REFERENCES `show_data` (`show_id`);

--
-- Constraints for table `show_data`
--
ALTER TABLE `show_data`
  ADD CONSTRAINT `show_data_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `show_data_ibfk_2` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`);

--
-- Constraints for table `theatres`
--
ALTER TABLE `theatres`
  ADD CONSTRAINT `theatres_ibfk_1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`movie_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
