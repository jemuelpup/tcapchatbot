-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2018 at 06:01 AM
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
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `conclusion`
--

CREATE TABLE IF NOT EXISTS `conclusion` (
`id` int(11) NOT NULL,
  `conclusion` varchar(300) NOT NULL,
  `subject_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `keyword_conclusion_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_conclusion_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `conclusion_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `keyword_tbl`
--

INSERT INTO `keyword_tbl` (`id`, `keyword`, `active`) VALUES
(1, 'best', 1),
(2, 'lens', 1),
(3, 'for', 1),
(4, 'portrait', 1);

-- --------------------------------------------------------

--
-- Table structure for table `leading_question_choice_tbl`
--

CREATE TABLE IF NOT EXISTS `leading_question_choice_tbl` (
`id` int(11) NOT NULL,
  `leading_question_fk` int(11) NOT NULL,
  `choice_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `leading_question_tbl`
--

CREATE TABLE IF NOT EXISTS `leading_question_tbl` (
`id` int(11) NOT NULL,
  `question` varchar(300) NOT NULL,
  `degree_of_importance` int(10) NOT NULL DEFAULT '5',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `question_keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_keyword_tbl`
--

INSERT INTO `question_keyword_tbl` (`id`, `keyword_fk`, `question_fk`, `active`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reserved_question_tbl`
--

INSERT INTO `reserved_question_tbl` (`id`, `question`, `subject_fk`, `active`, `answered`) VALUES
(1, 'What is the best lens for portrait?', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE IF NOT EXISTS `subject_tbl` (
`id` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`id`, `subject`, `active`) VALUES
(1, 'lens for portrait', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choice_tbl`
--
ALTER TABLE `choice_tbl`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conclusion`
--
ALTER TABLE `conclusion`
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
 ADD PRIMARY KEY (`id`);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `conclusion`
--
ALTER TABLE `conclusion`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `keyword_conclusion_tbl`
--
ALTER TABLE `keyword_conclusion_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `keyword_tbl`
--
ALTER TABLE `keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `leading_question_choice_tbl`
--
ALTER TABLE `leading_question_choice_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leading_question_tbl`
--
ALTER TABLE `leading_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question_keyword_tbl`
--
ALTER TABLE `question_keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `reserved_question_tbl`
--
ALTER TABLE `reserved_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
