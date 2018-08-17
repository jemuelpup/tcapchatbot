-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2018 at 11:46 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tcapchatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `choice_tbl`
--

CREATE TABLE IF NOT EXISTS `choice_tbl` (
`id` int(11) NOT NULL,
  `choice` varchar(200) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `choice_tbl`
--

INSERT INTO `choice_tbl` (`id`, `choice`, `keyword_fk`, `active`) VALUES
(1, '$100', 10, 1),
(3, '$200', 11, 1),
(4, '$300', 12, 1),
(5, '$1000', 15, 1),
(8, '$500', 16, 1),
(9, 'More than $500', 17, 1),
(10, 'stay in place', 18, 1),
(11, 'its ok to move', 19, 1),
(12, 'yes', 20, 1),
(13, 'no', 21, 1),
(14, 'Portrait', 2, 1),
(15, 'Landscape', 25, 1),
(16, 'Wildlife', 26, 1),
(17, 'Sports', 23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `conclusion_tbl`
--

CREATE TABLE IF NOT EXISTS `conclusion_tbl` (
`id` int(11) NOT NULL,
  `conclusion` varchar(300) NOT NULL,
  `subject_fk` int(11) NOT NULL,
  `related_question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conclusion_tbl`
--

INSERT INTO `conclusion_tbl` (`id`, `conclusion`, `subject_fk`, `related_question_fk`, `active`) VALUES
(1, '200mm 2.8g', 2, 2, 1),
(2, 'Nikon AF-S DX 10-24mm f/3.5-4.5G', 1, 1, 1),
(3, 'Jun', 3, 4, 1),
(4, 'Japanese outsourcing company', 4, 5, 1),
(5, 'jemuel', 3, 4, 1),
(6, '200mm 2.8g', 2, 2, 1),
(7, '200mm 2.8g', 2, 2, 1),
(8, '200mm 2.8g', 2, 2, 1),
(9, 'nikon 35mm 1.8g', 1, 1, 1),
(10, 'nikon 85mm 1.8g', 1, 1, 1),
(11, 'Nikkor 50mm 1.8g', 1, 1, 1),
(12, 'nikon 35mm 1.8g', 1, 1, 1),
(13, 'Nikkor 50mm 1.8g', 1, 1, 1),
(14, 'nikon 35mm 1.8g', 1, 1, 1),
(15, 'nikon 35mm 1.8g', 1, 1, 1),
(16, 'nikon 35mm 1.8g', 1, 1, 1),
(17, 'nikon 35mm 1.8g', 1, 1, 1),
(18, 'nikon 35mm 1.8g', 1, 1, 1),
(19, 'nikon 35mm 1.8g', 1, 1, 1),
(20, 'nikon 35mm 1.8g', 1, 1, 1),
(21, 'nikon 35mm 1.8g', 1, 1, 1),
(22, 'nikon 35mm 1.8g', 1, 1, 1),
(23, 'nikkor 50mm 1.8g', 1, 1, 1),
(24, 'nikon 85mm 1.8g', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `keyword_conclusion_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_conclusion_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `conclusion_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `keyword_conclusion_tbl`
--

INSERT INTO `keyword_conclusion_tbl` (`id`, `keyword_fk`, `conclusion_fk`, `active`) VALUES
(1, 1, 22, 1),
(2, 2, 22, 1),
(3, 1, 23, 1),
(4, 2, 23, 1),
(5, 11, 23, 1),
(6, 19, 23, 1),
(7, 20, 23, 1),
(8, 2, 23, 1),
(9, 1, 24, 1),
(10, 2, 24, 1),
(11, 16, 24, 1),
(12, 19, 24, 1),
(13, 20, 24, 1),
(14, 2, 24, 1);

-- --------------------------------------------------------

--
-- Table structure for table `keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `keyword_tbl`
--

INSERT INTO `keyword_tbl` (`id`, `keyword`, `active`) VALUES
(1, 'lens', 1),
(2, 'portrait', 1),
(3, 'far', 1),
(4, 'subject', 1),
(5, 'your', 1),
(6, 'name', 1),
(7, 'transcosmos', 1),
(8, 'asia', 1),
(9, 'philippines', 1),
(10, '$100', 1),
(11, '$200', 1),
(12, '$300', 1),
(13, '$400', 1),
(14, '', 1),
(15, '$1000', 1),
(16, '$500', 1),
(17, 'More than $500', 1),
(18, 'zoom', 1),
(19, 'prime', 1),
(20, 'autofocus', 1),
(21, 'manual', 1),
(22, 'for', 1),
(23, 'sports', 1),
(24, 'photography', 1),
(25, 'Landscape', 1),
(26, 'Wildlife', 1);

-- --------------------------------------------------------

--
-- Table structure for table `leading_question_choice_tbl`
--

CREATE TABLE IF NOT EXISTS `leading_question_choice_tbl` (
`id` int(11) NOT NULL,
  `user_reserved_question_fk` int(11) NOT NULL,
  `leading_question_fk` int(11) NOT NULL,
  `choice_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leading_question_choice_tbl`
--

INSERT INTO `leading_question_choice_tbl` (`id`, `user_reserved_question_fk`, `leading_question_fk`, `choice_fk`, `active`) VALUES
(1, 1, 1, 5, 1),
(2, 1, 1, 1, 1),
(3, 1, 1, 3, 1),
(8, 1, 1, 8, 1),
(9, 1, 1, 9, 1),
(12, 1, 2, 10, 1),
(13, 1, 2, 11, 1),
(14, 1, 1, 10, 0),
(15, 1, 1, 11, 0),
(16, 1, 3, 12, 1),
(17, 1, 3, 13, 1),
(18, 2, 3, 12, 1),
(19, 2, 3, 13, 1),
(20, 2, 1, 1, 1),
(21, 2, 1, 3, 1),
(22, 2, 1, 5, 1),
(23, 2, 1, 8, 1),
(24, 2, 1, 9, 1),
(25, 2, 1, 10, 0),
(26, 2, 1, 11, 0),
(27, 2, 4, 14, 1),
(28, 2, 4, 15, 1),
(29, 2, 4, 16, 1),
(30, 2, 4, 17, 1),
(32, 1, 4, 14, 1),
(33, 1, 4, 15, 1),
(34, 1, 4, 16, 1),
(35, 1, 4, 17, 1);

-- --------------------------------------------------------

--
-- Table structure for table `leading_question_tbl`
--

CREATE TABLE IF NOT EXISTS `leading_question_tbl` (
`id` int(11) NOT NULL,
  `question` varchar(300) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leading_question_tbl`
--

INSERT INTO `leading_question_tbl` (`id`, `question`, `active`) VALUES
(1, 'What is your budget?', 1),
(2, 'If you are shooting, do you want to stay in place or you want to move?', 1),
(3, 'Do you want autofocusing?', 1),
(4, 'What type of photography do you prefer?', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `question_keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_keyword_tbl`
--

INSERT INTO `question_keyword_tbl` (`id`, `keyword_fk`, `question_fk`, `active`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(5, 1, 2, 1),
(6, 3, 2, 1),
(7, 4, 2, 1),
(8, 5, 4, 1),
(9, 6, 4, 1),
(10, 7, 5, 1),
(11, 8, 5, 1),
(12, 9, 5, 1),
(16, 1, 6, 1),
(17, 22, 6, 1),
(18, 23, 6, 1),
(19, 24, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reserved_leading_question`
--

CREATE TABLE IF NOT EXISTS `reserved_leading_question` (
`id` int(11) NOT NULL,
  `leading_question_fk` int(11) NOT NULL,
  `reserved_question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `degree_of_importance` int(11) NOT NULL DEFAULT '5'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reserved_leading_question`
--

INSERT INTO `reserved_leading_question` (`id`, `leading_question_fk`, `reserved_question_fk`, `active`, `degree_of_importance`) VALUES
(1, 1, 1, 1, 5),
(2, 2, 1, 1, 5),
(3, 3, 1, 1, 5),
(4, 4, 1, 1, 5),
(5, 1, 2, 1, 5),
(7, 3, 2, 1, 5),
(10, 4, 2, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reserved_question_tbl`
--

CREATE TABLE IF NOT EXISTS `reserved_question_tbl` (
`id` int(11) NOT NULL,
  `question` varchar(300) DEFAULT NULL,
  `subject_fk` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `answered` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reserved_question_tbl`
--

INSERT INTO `reserved_question_tbl` (`id`, `question`, `subject_fk`, `active`, `answered`) VALUES
(1, 'What is the best lens for portrait?', 1, 1, 0),
(2, 'What is the best lens for far subject?', 2, 1, 0),
(4, 'What is your name?', 3, 1, 0),
(5, 'What is transcosmos asia philippines?', 4, 1, 0),
(6, 'What is the best lens for sports photography?', 6, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE IF NOT EXISTS `subject_tbl` (
`id` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`id`, `subject`, `active`) VALUES
(1, 'lens for portrait', 1),
(2, 'lens for far subjects', 1),
(3, 'chatbot name', 1),
(4, 'company', 1),
(5, 'lens', 1),
(6, 'lens for sports photography', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choice_tbl`
--
ALTER TABLE `choice_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_index` (`keyword_fk`,`choice`);

--
-- Indexes for table `conclusion_tbl`
--
ALTER TABLE `conclusion_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keyword_conclusion_tbl`
--
ALTER TABLE `keyword_conclusion_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keyword_tbl`
--
ALTER TABLE `keyword_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `keyword` (`keyword`);

--
-- Indexes for table `leading_question_choice_tbl`
--
ALTER TABLE `leading_question_choice_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_question` (`user_reserved_question_fk`,`leading_question_fk`,`choice_fk`);

--
-- Indexes for table `leading_question_tbl`
--
ALTER TABLE `leading_question_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_keyword_tbl`
--
ALTER TABLE `question_keyword_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_keyword_and_question` (`keyword_fk`,`question_fk`);

--
-- Indexes for table `reserved_leading_question`
--
ALTER TABLE `reserved_leading_question`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_index` (`leading_question_fk`,`reserved_question_fk`);

--
-- Indexes for table `reserved_question_tbl`
--
ALTER TABLE `reserved_question_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `question` (`question`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `subject` (`subject`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choice_tbl`
--
ALTER TABLE `choice_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `conclusion_tbl`
--
ALTER TABLE `conclusion_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `keyword_conclusion_tbl`
--
ALTER TABLE `keyword_conclusion_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `keyword_tbl`
--
ALTER TABLE `keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `leading_question_choice_tbl`
--
ALTER TABLE `leading_question_choice_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `leading_question_tbl`
--
ALTER TABLE `leading_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `question_keyword_tbl`
--
ALTER TABLE `question_keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `reserved_leading_question`
--
ALTER TABLE `reserved_leading_question`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `reserved_question_tbl`
--
ALTER TABLE `reserved_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
