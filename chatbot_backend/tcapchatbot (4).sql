-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2018 at 02:02 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `choice_tbl`
--

INSERT INTO `choice_tbl` (`id`, `choice`, `keyword_fk`, `active`) VALUES
(1, '$200', 4, 1),
(2, '$500', 5, 1),
(3, 'Any amount', 6, 1),
(4, 'Entry-level', 9, 1),
(5, 'Upper-entry', 10, 1),
(6, 'Mid-range', 11, 1),
(7, 'Advanced', 12, 1),
(8, 'High-end', 13, 1),
(9, 'Professional', 14, 1),
(10, 'Full-frame', 15, 1),
(11, 'Crop sensor(APS-C)', 16, 1),
(12, '45.7', 17, 1),
(13, '36.3', 18, 1),
(14, '24.2', 19, 1),
(15, '12.3', 20, 1),
(16, '153', 21, 1),
(17, '51', 22, 1),
(18, '39', 23, 1),
(19, '11', 24, 1),
(20, 'yes', 25, 1),
(21, 'no', 26, 1),
(22, '24.1', 27, 1);

-- --------------------------------------------------------

--
-- Table structure for table `conclusion_tbl`
--

CREATE TABLE IF NOT EXISTS `conclusion_tbl` (
`id` int(11) NOT NULL,
  `conclusion` varchar(2000) NOT NULL,
  `subject_fk` int(11) NOT NULL,
  `related_question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conclusion_tbl`
--

INSERT INTO `conclusion_tbl` (`id`, `conclusion`, `subject_fk`, `related_question_fk`, `active`) VALUES
(1, 'nikon 35mm 1.8gThe 35mm focal length is ideal for a classic â€œnaturalâ€ angle of view. With a fast f/1.8 aperture, you can focus sharply on your subjects in low light and create beautifully blurred backgrounds.', 1, 1, 1),
(2, 'Designed for use on Nikon''s FX-format D-SLR cameras, this updated medium telephoto f/1.8 lens is great for shooting stills or HD videos. The AF-S NIKKOR 85mm f/1.8G features Nikon''s Internal Focus (IF) system providing fast and quiet AF and produces sharp and clear images at all apertures. Its fast maximum aperture is ideal for taking stills or HD videos under ideal lighting, in low light, head and shoulder portraiture, weddings or concerts. When mounted on a DX-format D-SLR, the AF-S NIKKOR 85mm f/1.8G has an effective field of view of 127mm.', 1, 1, 1),
(3, 'A must-have for standard portraits and everyday use, the AF-S NIKKOR 50mm f/1.8G is a lens that will absolutely surprise you. The 50mm focal length (75mm equivalent on DX format cameras) with a fast f/1.8 aperture allows you to capture stunning images with a shallow depth-of-field, letting your subjects stand out from their backgrounds. The AF-S NIKKOR 50mm f/1.8G may soon become your new favorite lens.', 1, 1, 1),
(4, 'd5500', 2, 2, 1),
(5, 'Jemuel Elimanco', 3, 3, 1),
(6, 'jemuelpup@gmail.com', 4, 4, 1),
(7, 'Don''t let the D3200''s compact size and price fool youâ€”packed inside this easy to use HD-SLR is serious Nikon power: a 24.2 MP DX-format CMOS sensor that excels in any light, EXPEED 3 image-processing for fast operation and creative in-camera effects, Full HD (1080p) movie recording, in-camera tutorials and much more. What does this mean for you? Simply stunning photos and videos in any setting. And now, with Nikon''s optional Wireless Mobile Adapter, you can share those masterpieces instantly with your Smartphone or tablet!', 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `keyword_conclusion_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_conclusion_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `conclusion_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `keyword_conclusion_tbl`
--

INSERT INTO `keyword_conclusion_tbl` (`id`, `keyword_fk`, `conclusion_fk`, `active`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(4, 1, 2, 1),
(5, 2, 2, 1),
(6, 3, 2, 1),
(7, 5, 2, 1),
(8, 1, 3, 1),
(9, 2, 3, 1),
(10, 3, 3, 1),
(11, 4, 3, 1),
(12, 7, 4, 1),
(13, 8, 4, 1),
(14, 10, 4, 1),
(15, 16, 4, 1),
(16, 27, 4, 1),
(17, 23, 4, 1),
(18, 25, 4, 1),
(19, 28, 5, 1),
(20, 29, 5, 1),
(21, 30, 5, 1),
(22, 31, 5, 1),
(23, 32, 6, 1),
(24, 33, 6, 1),
(25, 7, 7, 1),
(26, 8, 7, 1),
(27, 9, 7, 1),
(28, 16, 7, 1),
(29, 20, 7, 1),
(30, 24, 7, 1),
(31, 26, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `keyword_tbl`
--

INSERT INTO `keyword_tbl` (`id`, `keyword`, `active`) VALUES
(1, 'lens', 1),
(2, 'for', 1),
(3, 'portrait', 1),
(4, '$200', 1),
(5, '$500', 1),
(6, 'Any amount', 1),
(7, 'DSLR', 1),
(8, 'camera', 1),
(9, 'Entry-level', 1),
(10, 'Upper-entry', 1),
(11, 'Mid-range', 1),
(12, 'Advanced', 1),
(13, 'High-end', 1),
(14, 'Professional', 1),
(15, 'Full-frame', 1),
(16, 'APS-C', 1),
(17, '45.7', 1),
(18, '36.3', 1),
(19, '24.2', 1),
(20, '12.3', 1),
(21, '153', 1),
(22, '51', 1),
(23, '39', 1),
(24, '11', 1),
(25, 'touch screen', 1),
(26, 'not touch screen', 1),
(27, '24.1', 1),
(28, 'develop', 1),
(29, 'design', 1),
(30, 'chatbot', 1),
(31, 'create', 1),
(32, 'email', 1),
(33, 'address', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leading_question_choice_tbl`
--

INSERT INTO `leading_question_choice_tbl` (`id`, `user_reserved_question_fk`, `leading_question_fk`, `choice_fk`, `active`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 2, 1),
(3, 1, 1, 3, 1),
(4, 2, 2, 4, 1),
(5, 2, 2, 5, 1),
(6, 2, 2, 6, 1),
(7, 2, 2, 7, 1),
(8, 2, 2, 8, 1),
(9, 2, 2, 9, 1),
(10, 2, 3, 10, 1),
(11, 2, 3, 11, 1),
(12, 2, 4, 12, 1),
(13, 2, 4, 13, 1),
(14, 2, 4, 14, 1),
(15, 2, 4, 15, 1),
(16, 2, 5, 16, 1),
(17, 2, 5, 17, 1),
(18, 2, 5, 18, 1),
(19, 2, 5, 19, 1),
(20, 2, 6, 20, 1),
(21, 2, 6, 21, 1),
(22, 2, 4, 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `leading_question_tbl`
--

CREATE TABLE IF NOT EXISTS `leading_question_tbl` (
`id` int(11) NOT NULL,
  `question` varchar(300) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leading_question_tbl`
--

INSERT INTO `leading_question_tbl` (`id`, `question`, `active`) VALUES
(1, 'What is your budget?', 1),
(2, 'What level of camera do you preffer', 1),
(3, 'What king of sensor?', 1),
(4, 'How many megapixel?', 1),
(5, 'how many focus points', 1),
(6, 'Touch screen?', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_keyword_tbl`
--

CREATE TABLE IF NOT EXISTS `question_keyword_tbl` (
`id` int(11) NOT NULL,
  `keyword_fk` int(11) NOT NULL,
  `question_fk` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_keyword_tbl`
--

INSERT INTO `question_keyword_tbl` (`id`, `keyword_fk`, `question_fk`, `active`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(4, 7, 2, 1),
(5, 8, 2, 1),
(6, 28, 3, 1),
(7, 29, 3, 1),
(8, 30, 3, 1),
(9, 31, 3, 1),
(10, 32, 4, 1),
(11, 33, 4, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reserved_leading_question`
--

INSERT INTO `reserved_leading_question` (`id`, `leading_question_fk`, `reserved_question_fk`, `active`, `degree_of_importance`) VALUES
(1, 1, 1, 1, 5),
(2, 2, 2, 1, 5),
(3, 3, 2, 1, 5),
(4, 4, 2, 1, 5),
(5, 5, 2, 1, 5),
(6, 6, 2, 1, 5);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reserved_question_tbl`
--

INSERT INTO `reserved_question_tbl` (`id`, `question`, `subject_fk`, `active`, `answered`) VALUES
(1, 'What lens do you recommend for portrait?', 1, 1, 0),
(2, 'What DSLR camera do you preffer?', 2, 1, 0),
(3, 'Who develop and design this chatbot?', 3, 1, 0),
(4, 'What is your email address', 4, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE IF NOT EXISTS `subject_tbl` (
`id` int(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`id`, `subject`, `active`) VALUES
(1, 'Portrait lens', 1),
(2, 'DSLR camera', 1),
(3, 'Chatbot developer', 1),
(4, 'developer email address', 1);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `conclusion_tbl`
--
ALTER TABLE `conclusion_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `keyword_conclusion_tbl`
--
ALTER TABLE `keyword_conclusion_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `keyword_tbl`
--
ALTER TABLE `keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `leading_question_choice_tbl`
--
ALTER TABLE `leading_question_choice_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `leading_question_tbl`
--
ALTER TABLE `leading_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `question_keyword_tbl`
--
ALTER TABLE `question_keyword_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `reserved_leading_question`
--
ALTER TABLE `reserved_leading_question`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `reserved_question_tbl`
--
ALTER TABLE `reserved_question_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
