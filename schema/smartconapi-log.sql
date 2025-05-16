-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 21, 2022 at 05:08 PM
-- Server version: 5.7.33-0ubuntu0.16.04.1
-- PHP Version: 5.6.40-50+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartcongen`
--

-- --------------------------------------------------------

--
-- Table structure for table `actual_costing_summary`
--

CREATE TABLE `actual_costing_summary` (
  `actual_costing_summary_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `description` text,
  `project_id` int(11) DEFAULT NULL,
  `costing_summary_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `actual_costing_summary`
--

INSERT INTO `actual_costing_summary` (`actual_costing_summary_id`, `title`, `date`, `amount`, `description`, `project_id`, `costing_summary_id`, `created_by`, `creation_date`, `modified_by`, `modification_date`) VALUES
(1, 'Ducting Cost', '2022-10-18', '12000000.00', '', 42, NULL, 'Super Admin', '2022-10-18 18:34:58', NULL, NULL),
(2, 'Ducting Cost', '2022-10-18', '2666.00', 'RENT', 43, NULL, 'Super Admin', '2022-10-18 19:57:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `actual_opportunity_costing_summary`
--

CREATE TABLE `actual_opportunity_costing_summary` (
  `actual_opportunity_costing_summary_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `description` text,
  `opportunity_id` int(11) DEFAULT NULL,
  `costing_summary_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `adjust_stock_log`
--

CREATE TABLE `adjust_stock_log` (
  `adjust_stock_log_id` int(11) NOT NULL,
  `inventory_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `adjust_stock` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `current_stock` decimal(10,2) DEFAULT NULL,
  `materials_used` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adjust_stock_log`
--

INSERT INTO `adjust_stock_log` (`adjust_stock_log_id`, `inventory_id`, `product_id`, `adjust_stock`, `creation_date`, `modification_date`, `modified_by`, `created_by`, `current_stock`, `materials_used`) VALUES
(1, NULL, 1, NULL, '2022-10-18 18:43:37', NULL, NULL, 'Super Admin', '0.00', '0.00'),
(2, 1, 2, NULL, '2022-10-18 18:46:52', NULL, NULL, 'Super Admin', '100.00', '10.00'),
(3, 2, 1, NULL, '2022-10-18 20:12:09', NULL, NULL, 'Super Admin', '3.00', '2.00'),
(4, NULL, 3, NULL, '2022-10-18 20:12:09', NULL, NULL, 'Super Admin', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `leave_time` time DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `notes` text,
  `record_date` date DEFAULT NULL,
  `on_leave` int(11) DEFAULT NULL,
  `time_in` time DEFAULT NULL,
  `over_time` int(11) DEFAULT NULL,
  `due_time` int(11) DEFAULT NULL,
  `description` text,
  `type_of_leave` varchar(255) DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `task` text,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `staff_id`, `leave_time`, `creation_date`, `modification_date`, `notes`, `record_date`, `on_leave`, `time_in`, `over_time`, `due_time`, `description`, `type_of_leave`, `created_by`, `modified_by`, `task`, `latitude`, `longitude`) VALUES
(1, 1, NULL, '2022-10-20 21:54:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `title_display` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `bank_id` int(11) NOT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_code` varchar(10) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `created_by` varchar(50) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bank_id`, `bank_name`, `bank_code`, `flag`, `created_by`, `modified_by`, `creation_date`, `modification_date`) VALUES
(1, 'DBS BANK LTD', '1', 0, NULL, NULL, NULL, NULL),
(2, 'UNITED OVERSEAS BANK LIMITED', '2', 0, NULL, NULL, NULL, NULL),
(3, 'OVERSEA-CHINESE BANKING CORPORATION LIMITED', '3', 0, NULL, NULL, NULL, NULL),
(4, 'OTHERS', '4', 0, NULL, NULL, NULL, NULL),
(5, 'CIMB BANK BERHAD', '5', 0, NULL, NULL, NULL, NULL),
(6, 'CITIBANK SINGAPORE LIMITED', '6', 0, NULL, NULL, NULL, NULL),
(7, 'THE HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED', '7', 0, NULL, NULL, NULL, NULL),
(8, 'MALAYAN BANKING BERHAD', '8', 0, NULL, NULL, NULL, NULL),
(9, 'STANDARD CHARTERED BANK', '9', 0, NULL, NULL, NULL, NULL),
(10, 'FAR EASTERN BANK LTD', 'A', 0, NULL, NULL, NULL, NULL),
(11, 'AUSTRALIA & NEW ZEALAND BANKING GROUP LIMITED', 'B', 0, NULL, NULL, NULL, NULL),
(12, 'BANGKOK BANK PUBLIC COMPANY LIMITED', 'C', 0, NULL, NULL, NULL, NULL),
(13, 'BANK OF AMERICA, NATIONAL ASSOCIATION', 'D', 0, NULL, NULL, NULL, NULL),
(14, 'BANK OF CHINA LIMITED', 'E', 0, NULL, NULL, NULL, NULL),
(15, 'BANK OF EAST ASIA LTD', 'F', 0, NULL, NULL, NULL, NULL),
(16, 'BANK OF INDIA', 'G', 0, NULL, NULL, NULL, NULL),
(17, 'BANK OF TOKYO-MITSUBISHI UFJ, LTD', 'H', 0, NULL, NULL, NULL, NULL),
(18, 'BNP PARIBAS', 'I', 0, NULL, NULL, NULL, NULL),
(19, 'CREDIT AGRICOLE CORPORATE AND INVESTMENT BANK', 'J', 0, NULL, NULL, NULL, NULL),
(20, 'HL BANK', 'K', 0, NULL, NULL, NULL, NULL),
(21, 'ICICI BANK LIMITED', 'L', 0, NULL, NULL, NULL, NULL),
(22, 'INDIAN BANK', 'M', 0, NULL, NULL, NULL, NULL),
(23, 'INDIAN OVERSEAS BANK', 'N', 0, NULL, NULL, NULL, NULL),
(24, 'INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED', 'O', 0, NULL, NULL, NULL, NULL),
(25, 'JPMORGAN CHASE BANK, N.A.', 'P', 0, NULL, NULL, NULL, NULL),
(26, 'MIZUHO CORPORATE BANK, LTD', 'Q', 0, NULL, NULL, NULL, NULL),
(27, 'PT BANK NEGARA INDONESIA (PERSERO) TBK', 'R', 0, NULL, NULL, NULL, NULL),
(28, 'RHB BANK BERHAD', 'S', 0, NULL, NULL, NULL, NULL),
(29, 'STATE BANK OF INDIA', 'T', 0, NULL, NULL, NULL, NULL),
(30, 'SUMITOMO MITSUI BANKING CORPORATION', 'U', 0, NULL, NULL, NULL, NULL),
(31, 'UCO BANK', 'V', 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `basket_id` int(10) UNSIGNED NOT NULL,
  `qty` mediumint(8) UNSIGNED NOT NULL DEFAULT '1',
  `unit_price` float(10,2) DEFAULT '0.00',
  `session_id` char(32) NOT NULL DEFAULT '',
  `module` varchar(50) NOT NULL DEFAULT '',
  `record_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `assign_time` time DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `gps_parameter` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `customer_id`, `employee_id`, `assign_time`, `creation_date`, `modification_date`, `modified_by`, `created_by`, `gps_parameter`, `status`, `booking_date`, `latitude`, `longitude`) VALUES
(1, 26, NULL, '00:00:00', '2022-10-18 18:42:08', '2022-10-18 18:42:30', 'Super Admin', 'Super Admin', NULL, 'Scheduled', '2022-10-18', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking_service`
--

CREATE TABLE `booking_service` (
  `booking_service_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `broadcast`
--

CREATE TABLE `broadcast` (
  `broadcast_id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `description` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `broadcast_date` datetime DEFAULT NULL,
  `chi_title` varchar(500) DEFAULT NULL,
  `chi_description` text,
  `from_name` varchar(100) DEFAULT NULL,
  `from_email` varchar(100) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `broadcast_contact`
--

CREATE TABLE `broadcast_contact` (
  `broadcast_contact_id` int(11) NOT NULL,
  `broadcast_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `send_tag` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `error_text` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `broadcast_test_recipient`
--

CREATE TABLE `broadcast_test_recipient` (
  `broadcast_test_recipient_id` int(11) NOT NULL,
  `broadcast_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `send_tag` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `error_text` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `call_registry`
--

CREATE TABLE `call_registry` (
  `call_registry_id` int(11) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `company_address` text,
  `industry` varchar(255) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `contact_date` date DEFAULT NULL,
  `contact_time` time DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `description` text,
  `staff_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `enquiry_type` varchar(155) DEFAULT NULL,
  `reminder` tinyint(1) DEFAULT NULL,
  `reffer` varchar(155) DEFAULT NULL,
  `requirements` text,
  `call_registry_code` varchar(20) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `other_industry` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `alternate_phone` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `chi_description` text,
  `display_type` varchar(50) DEFAULT NULL,
  `template` varchar(255) DEFAULT NULL,
  `category_type` varchar(50) DEFAULT NULL,
  `show_navigation_panel` int(1) DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `meta_title` text,
  `meta_keyword` text,
  `meta_description` text,
  `category_filter` varchar(25) DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `internal_link` varchar(255) DEFAULT NULL,
  `show_in_nav` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;

-- --------------------------------------------------------

--
-- Table structure for table `claim_line_items`
--

CREATE TABLE `claim_line_items` (
  `claim_line_items_id` int(11) NOT NULL,
  `project_claim_id` int(11) DEFAULT NULL,
  `title` text,
  `description` text,
  `amount` decimal(10,2) DEFAULT NULL,
  `amount_other` decimal(10,2) DEFAULT NULL,
  `item_type` varchar(200) DEFAULT NULL,
  `sort_order` int(10) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `quantity` varchar(200) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `remarks` text,
  `status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `claim_line_items`
--

INSERT INTO `claim_line_items` (`claim_line_items_id`, `project_claim_id`, `title`, `description`, `amount`, `amount_other`, `item_type`, `sort_order`, `creation_date`, `modification_date`, `quantity`, `project_id`, `created_by`, `modified_by`, `unit`, `remarks`, `status`) VALUES
(1, 2, 'test title', 'test desc', '50000.00', NULL, NULL, NULL, '2022-10-18 18:50:13', NULL, NULL, 44, 'Super Admin', NULL, NULL, '', 'In Progress'),
(2, 1, 'BREAKS', 'RAJA', '333333.00', NULL, NULL, NULL, '2022-10-18 19:56:15', '2022-10-18 20:18:52', NULL, 43, 'Super Admin', 'Super Admin', NULL, 'CLIM', 'In Progress');

-- --------------------------------------------------------

--
-- Table structure for table `claim_payment`
--

CREATE TABLE `claim_payment` (
  `claim_payment_id` int(11) NOT NULL,
  `project_claim_id` int(11) DEFAULT NULL,
  `claim_line_items_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `claim_seq` varchar(150) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `claim_amount` decimal(10,2) DEFAULT NULL,
  `description` text,
  `status` varchar(100) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `claim_payment`
--

INSERT INTO `claim_payment` (`claim_payment_id`, `project_claim_id`, `claim_line_items_id`, `date`, `claim_seq`, `amount`, `project_id`, `created_by`, `creation_date`, `modified_by`, `modification_date`, `claim_amount`, `description`, `status`, `gst`, `total_amount`) VALUES
(1, 2, 1, '2022-10-18', 'Progress Claim 01', '10000.00', 44, 'Super Admin', '2022-10-18 18:50:13', NULL, NULL, NULL, NULL, 'In Progress', '7.00', '700.00'),
(2, 1, 2, '2022-10-18', 'Progress Claim 01', '2599.00', 43, 'Super Admin', '2022-10-18 19:56:15', 'Super Admin', '2022-10-18 20:16:23', '333333.00', 'RAJA', 'In Progress', '7.00', '181.93'),
(3, 1, 2, '2022-10-18', 'Progress Claim 02', '2599.00', 43, 'Super Admin', '2022-10-18 20:18:52', NULL, NULL, NULL, NULL, 'In Progress', '7.00', '181.93');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `comments` text,
  `comment_date` datetime DEFAULT NULL,
  `notes` text,
  `subject` varchar(500) DEFAULT NULL,
  `room_name` varchar(50) DEFAULT NULL,
  `record_type` varchar(50) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `contact_module` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `comments`, `comment_date`, `notes`, `subject`, `room_name`, `record_type`, `contact_id`, `record_id`, `creation_date`, `modification_date`, `published`, `content_id`, `staff_id`, `contact_module`, `name`) VALUES
(1, 'sss,s,', '2022-10-18 18:26:15', NULL, NULL, 'enggCrm_opportunity', NULL, 1, 3, '2022-10-18 18:26:15', NULL, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` text,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `comment_by` text,
  `company_size` varchar(20) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `supplier_type` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `chi_company_name` varchar(255) DEFAULT NULL,
  `chi_company_address` text,
  `company_address_id` int(11) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `billing_address_flat` varchar(255) DEFAULT NULL,
  `billing_address_street` varchar(255) DEFAULT NULL,
  `billing_address_country` varchar(255) DEFAULT NULL,
  `billing_address_po_code` varchar(255) DEFAULT NULL,
  `client_code` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `retention` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `company_name`, `email`, `address_street`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `notes`, `creation_date`, `modification_date`, `mobile`, `flag`, `address_flat`, `status`, `website`, `category`, `comment_by`, `company_size`, `industry`, `source`, `group_name`, `supplier_type`, `created_by`, `modified_by`, `chi_company_name`, `chi_company_address`, `company_address_id`, `contact_person`, `billing_address_flat`, `billing_address_street`, `billing_address_country`, `billing_address_po_code`, `client_code`, `latitude`, `longitude`, `retention`) VALUES
(1, 'ABC New company Pte Ltd', 'manfred@kandenko.com.sg', 'The Adelphi', 'Singapore', '179803', 'SG', '6259 9911', '6259 7700', '6259 9911', NULL, '2020-11-02 11:41:18', '2021-01-04 19:08:56', NULL, NULL, '1 Coleman Street #10-05', 'Current', '', 'Client', NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, '', '', '', '', NULL, '', '', NULL),
(2, 'ABC Supplier', '', '', NULL, NULL, '', '', '', '', NULL, '2020-11-02 11:48:24', '2020-11-02 11:48:30', NULL, NULL, '', 'Current', '', 'Supplier', NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Philips Boon', NULL, '', 'HOWGANG', 'Singapore', '', NULL, '9234 8756', NULL, NULL, '2020-12-04 13:14:32', '2020-12-16 21:40:36', NULL, NULL, '2. buong Road', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(4, 'New Frame Tech Ltd', '', '', 'Simlim Tower', '674 523', NULL, NULL, '1234567890', '', NULL, '2020-12-12 16:36:05', '2020-12-22 21:17:48', NULL, NULL, '31, jalan Besar Rd', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Shahul App Dev', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(5, 'Kate Williams', NULL, 'SIM Lim Otwer', '', '675 232', NULL, NULL, '9862 3432', NULL, NULL, '2020-12-16 15:25:50', '2020-12-16 22:09:24', NULL, NULL, '5, Jalan Besar Road', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(6, 'Jing Shaw Pte Ltd', NULL, 'Sim LIm Tower', '', '623544', 'SG', NULL, '9235 3467', '', NULL, '2020-12-29 11:33:39', NULL, NULL, NULL, '1, Jalan Besar Road', NULL, '', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Universal Software Solutions Pte Ltd', NULL, '#15-02A Sim Lim Tower', '', '208787', 'SG', NULL, '63967554', '63967554', NULL, '2020-12-31 11:25:15', NULL, NULL, NULL, '10 Jalan Besar', NULL, 'www.cubosale.com', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'ZAp Pte Ltd', '', 'Address 2', NULL, '600122', 'SG', '1265', '', '', NULL, '2020-12-31 20:52:26', '2021-01-01 13:50:01', NULL, NULL, 'New Street', NULL, 'usoftsolutions.com', 'Client', NULL, 'Small', 'Creative', 'Agency', NULL, '3rd middle man', 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(9, 'Quak Pta LTd', NULL, '# 13–37 Mandalay Towers', NULL, '308215', 'SG', NULL, '6246 3345', '6246 3345', NULL, '2021-01-01 12:27:48', NULL, NULL, NULL, 'Blk 35 Mandalay Road ', NULL, '', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'DK Pte Ltd', '', 'E #03-2036', NULL, '489978', 'SG', '', '62342356', '', NULL, '2021-01-01 12:30:39', '2021-01-01 13:17:57', NULL, NULL, '3012 Bedok Industrial Park', NULL, '', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(11, 'Unison International Singapore Pte Ltd', NULL, 'Boat Quay', NULL, '524178', 'SG', NULL, '6385744', '6385745', NULL, '2021-01-01 18:28:04', NULL, NULL, NULL, '80 Raffles Place', NULL, 'www.unison.sg', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Apple SIngapore Pte Ltd', NULL, '#01-01', NULL, NULL, 'SG', '205784', '63254147', '63541478', NULL, '2021-01-02 10:11:01', NULL, NULL, NULL, '80 Marina bay crescent', NULL, 'www.apple.com.sg', 'Client', NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Marina Bay', NULL, '#07-16 Oxley bizhub', NULL, NULL, 'SG', '408731', '', '', NULL, '2021-01-13 15:26:35', NULL, NULL, NULL, '69 Ubi road', NULL, '', 'Client', NULL, '', '', '', NULL, '', 'DHANDAPANI SENTHIL KUMAR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'AB&C Inc', '', 'Robinson Road', NULL, NULL, 'SG', '900001', '62820462', '', NULL, '2021-01-29 20:04:34', '2022-01-24 19:24:26', NULL, NULL, 'Asia Tower 1', NULL, '', NULL, NULL, 'Medium', 'Jewellery', 'Direct', NULL, 'Wholesaler', 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(15, 'New bright trading Pte Ltd', NULL, '', NULL, NULL, 'SG', '560298', '', '', NULL, '2022-02-08 18:05:37', NULL, NULL, NULL, '10 Jalan Besar', NULL, '', NULL, NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'JA Associates', NULL, '', NULL, NULL, 'SG', '63423234', '', '', NULL, '2022-02-17 13:35:48', NULL, NULL, NULL, '1', NULL, '', NULL, NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Hope Engineering and Construction', NULL, '#15-02', NULL, NULL, 'SG', '208787', '63967554', '63967558', NULL, '2022-04-29 12:12:41', NULL, NULL, NULL, '10 Jalan Besar', NULL, 'www.hope.sg', NULL, NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'test', NULL, 'address 2', NULL, NULL, 'SG', '123456', '', '', NULL, '2022-04-29 18:15:56', NULL, NULL, NULL, 'address 1', NULL, '', NULL, NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Sulfiya Beauty Parlour', NULL, 'PalayamKottai - Tirunelveli, Tamilnadu ', NULL, NULL, 'IN', '6342342', '23234234234', '234234534534', NULL, '2022-08-19 13:33:08', NULL, NULL, NULL, '1, Balaji Nagar, 3rd Street', NULL, 'www.sulfiyabeauty.com', NULL, NULL, 'Large', 'Creative', 'Agency', NULL, '2nd middle man', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'abc constructions and building', 'abc@gmail.com', '13/110n sripuram', NULL, NULL, 'IN', '376436', '56565767', '767689899', NULL, '2022-08-19 18:32:25', '2022-08-19 22:23:30', NULL, NULL, '12/108b palayangottai', NULL, 'www.abc.com', NULL, NULL, 'Medium', 'Others', 'Referral', NULL, 'Wholesaler', 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40', '50', NULL),
(21, 'A M N CONSTRUCTION COMPANY PVT', '', 'tamil nadu', NULL, NULL, 'IN', '627001', '0987654321', '1234567890', NULL, '2022-08-19 18:34:26', '2022-08-22 02:53:10', NULL, NULL, '57, ram nager, tirunelveli town', NULL, 'www,amnconstructioncompany.com', NULL, NULL, '', '', '', NULL, '', 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(22, 'marzu constructin', NULL, 'dffdfjdfjhd', NULL, NULL, 'IN', '5765576', '4534845854', '4454453458', NULL, '2022-08-22 02:47:59', NULL, NULL, NULL, 'jhdfjhfhfhfh', NULL, 'www.abc.com', NULL, NULL, 'Medium', 'Others', 'Referral', NULL, 'Wholesaler', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'NAMEER', NULL, '', '', '', NULL, NULL, '4474', NULL, NULL, '2022-08-22 04:27:35', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL),
(24, 'DFFFFFF', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-22 04:30:15', NULL, NULL, NULL, NULL, NULL, NULL, 'Client', NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'fffuuf', NULL, '', NULL, NULL, 'AG', 'ewesd', '', '', NULL, '2022-08-27 15:41:26', NULL, NULL, NULL, 'ddds', NULL, '', NULL, NULL, '', '', '', NULL, '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'witler', NULL, '', '', '', NULL, NULL, '84562178', NULL, NULL, '2022-10-18 18:42:05', NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company_address`
--

CREATE TABLE `company_address` (
  `company_address_id` int(11) NOT NULL,
  `address_street` text,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` varchar(255) DEFAULT NULL,
  `address_area` varchar(100) DEFAULT NULL,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `protected` int(11) DEFAULT NULL,
  `pass_word` varchar(25) DEFAULT NULL,
  `subscribe` int(1) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `known_as_name` varchar(255) DEFAULT NULL,
  `address_street1` varchar(255) DEFAULT NULL,
  `address_town1` varchar(255) DEFAULT NULL,
  `address_country1` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `random_no` bigint(50) DEFAULT NULL,
  `member_status` varchar(20) DEFAULT NULL,
  `direct_tel` varchar(200) DEFAULT NULL,
  `member_type` varchar(50) DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `phone_direct` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `salutation` varchar(5) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `company_address_street` text,
  `company_address_flat` text,
  `company_address_town` text,
  `company_address_state` varchar(255) DEFAULT NULL,
  `company_address_country` varchar(255) DEFAULT NULL,
  `company_address_id` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `user_group_id` int(3) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `notes` text,
  `user_name` varchar(25) DEFAULT NULL,
  `address` text,
  `login_count` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `company_name`, `position`, `email`, `address_street`, `address_area`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `sort_order`, `published`, `creation_date`, `modification_date`, `protected`, `pass_word`, `subscribe`, `first_name`, `last_name`, `mobile`, `religion`, `relationship`, `known_as_name`, `address_street1`, `address_town1`, `address_country1`, `flag`, `sex`, `date_of_birth`, `random_no`, `member_status`, `direct_tel`, `member_type`, `address_flat`, `phone_direct`, `company_id`, `salutation`, `department`, `created_by`, `modified_by`, `published_test`, `company_address_street`, `company_address_flat`, `company_address_town`, `company_address_state`, `company_address_country`, `company_address_id`, `category`, `status`, `user_group_id`, `name`, `notes`, `user_name`, `address`, `login_count`) VALUES
(1, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, '2022-10-06 22:55:00', NULL, NULL, NULL, NULL, 'John', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 21, 'Mr', '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Current', NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, '', 'a@GMAIL.COM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, '2022-10-18 18:11:31', NULL, NULL, NULL, NULL, 'rafi', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 1, 'Mr', '099876557', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Current', NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, '2022-10-18 18:36:50', NULL, NULL, NULL, NULL, 'rafi', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 21, 'Mr', '', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Current', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `content_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `show_title` int(1) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `description_short` text,
  `description` text,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `member_only` int(1) DEFAULT NULL,
  `latest` int(1) DEFAULT NULL,
  `favourite` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `content_date` date DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `chi_description` text,
  `content_type` varchar(50) DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `meta_title` text,
  `meta_keyword` text,
  `meta_description` text,
  `flag` int(1) DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `email_alert_required` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `comment_alert` int(11) DEFAULT NULL,
  `internal_link` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `costing_summary`
--

CREATE TABLE `costing_summary` (
  `costing_summary_id` int(11) NOT NULL,
  `po_code` varchar(100) DEFAULT NULL,
  `invoice_code` varchar(100) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `no_of_worker_used` varchar(100) DEFAULT NULL,
  `no_of_days_worked` varchar(100) DEFAULT NULL,
  `labour_rates_per_day` decimal(10,2) DEFAULT NULL,
  `po_price` decimal(10,2) DEFAULT NULL,
  `po_price_with_gst` decimal(10,2) DEFAULT NULL,
  `invoiced_price` decimal(10,2) DEFAULT NULL,
  `invoiced_price_with_gst` decimal(10,2) DEFAULT NULL,
  `profit_percentage` decimal(10,2) DEFAULT NULL,
  `profit` decimal(10,2) DEFAULT NULL,
  `total_material_price` decimal(10,2) DEFAULT NULL,
  `transport_charges` decimal(10,2) DEFAULT NULL,
  `total_labour_charges` decimal(10,2) DEFAULT NULL,
  `salesman_commission` decimal(10,2) DEFAULT NULL,
  `finance_charges` decimal(10,2) DEFAULT NULL,
  `office_overheads` decimal(10,2) DEFAULT NULL,
  `other_charges` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `total_cost` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `salesman_commission_percentage` decimal(10,2) DEFAULT NULL,
  `finance_charges_percentage` decimal(10,2) DEFAULT NULL,
  `office_overheads_percentage` decimal(10,2) DEFAULT NULL,
  `transport_charges_percentage` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `costing_summary`
--

INSERT INTO `costing_summary` (`costing_summary_id`, `po_code`, `invoice_code`, `delivery_date`, `no_of_worker_used`, `no_of_days_worked`, `labour_rates_per_day`, `po_price`, `po_price_with_gst`, `invoiced_price`, `invoiced_price_with_gst`, `profit_percentage`, `profit`, `total_material_price`, `transport_charges`, `total_labour_charges`, `salesman_commission`, `finance_charges`, `office_overheads`, `other_charges`, `created_by`, `creation_date`, `modified_by`, `modification_date`, `total_cost`, `project_id`, `salesman_commission_percentage`, `finance_charges_percentage`, `office_overheads_percentage`, `transport_charges_percentage`) VALUES
(1, '', '', NULL, '100', '100', '12.00', '50000.00', '53500.00', '50000.00', '53500.00', '-172.20', '-86100.00', '0.00', '100.00', '120000.00', '4000.00', '5000.00', '4000.00', '3000.00', 'Super Admin', '2022-10-06 22:56:28', NULL, NULL, '136100.00', 6, '0.00', '0.00', '0.00', '0.00'),
(2, '', '', NULL, '100', '100', '800.00', '30000000.00', '32100000.00', '30000000.00', '32100000.00', '72.98', '21895000.00', '0.00', '25000.00', '8000000.00', '10000.00', '50000.00', '15000.00', '5000.00', 'Super Admin', '2022-10-18 18:36:33', NULL, NULL, '8105000.00', 43, '0.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `costing_summary_history`
--

CREATE TABLE `costing_summary_history` (
  `costing_summary_history_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `sub_con_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `sketch` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `costing_summary_id` int(11) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cpf_calculator`
--

CREATE TABLE `cpf_calculator` (
  `cpf_calculator_id` int(11) NOT NULL,
  `from_age` varchar(10) DEFAULT NULL,
  `to_age` varchar(10) DEFAULT NULL,
  `by_employer` decimal(10,2) DEFAULT NULL,
  `by_employee` decimal(10,2) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `from_salary` decimal(10,2) DEFAULT NULL,
  `to_salary` decimal(10,2) DEFAULT NULL,
  `cap_amount_employer` decimal(10,2) DEFAULT NULL,
  `cap_amount_employee` decimal(10,2) DEFAULT NULL,
  `spr_year` varchar(100) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cpf_calculator`
--

INSERT INTO `cpf_calculator` (`cpf_calculator_id`, `from_age`, `to_age`, `by_employer`, `by_employee`, `year`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `flag`, `from_salary`, `to_salary`, `cap_amount_employer`, `cap_amount_employee`, `spr_year`, `site_id`) VALUES
(1, '0', '55', '17.00', '20.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '750.00', '10000.00', '1020.00', '1200.00', '3', NULL),
(2, '56', '60', '13.00', '13.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '780.00', '780.00', '3', NULL),
(3, '61', '65', '9.00', '7.50', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '540.00', '450.00', '3', NULL),
(4, '66', '200', '7.50', '5.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '450.00', '300.00', '3', NULL),
(5, '0', '55', '0.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '0.00', '50.00', '0.00', '0.00', '3', NULL),
(6, '0', '55', '17.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '51.00', '500.00', '0.00', '0.00', '3', NULL),
(7, '0', '55', '17.00', '0.60', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '501.00', '749.00', '0.00', '0.00', '3', NULL),
(8, '56', '60', '0.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '3', NULL),
(9, '56', '60', '13.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '3', NULL),
(10, '56', '60', '13.00', '0.39', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '3', NULL),
(11, '61', '65', '0.00', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '3', NULL),
(12, '61', '65', '9.00', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '3', NULL),
(13, '61', '65', '9.00', '0.23', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '3', NULL),
(14, '66', '200', '0.00', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '3', NULL),
(15, '66', '200', '7.50', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '3', NULL),
(16, '66', '200', '7.50', '0.15', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '3', NULL),
(17, '0', '55', '0.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '0.00', '50.00', '0.00', '0.00', '1', NULL),
(18, '0', '55', '4.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '51.00', '500.00', '0.00', '0.00', '1', NULL),
(19, '0', '55', '3.85', '0.15', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '501.00', '749.00', '0.00', '0.00', '1', NULL),
(20, '0', '55', '4.00', '5.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '750.00', '10000.00', '240.00', '300.00', '1', NULL),
(21, '56', '60', '0.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '1', NULL),
(22, '56', '60', '4.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '1', NULL),
(23, '56', '60', '3.85', '0.15', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '1', NULL),
(24, '56', '60', '4.00', '5.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '240.00', '300.00', '1', NULL),
(25, '61', '65', '0.00', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '1', NULL),
(26, '61', '65', '3.50', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '1', NULL),
(27, '61', '65', '3.35', '0.15', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '1', NULL),
(28, '61', '65', '3.50', '5.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '210.00', '300.00', '1', NULL),
(29, '66', '200', '0.00', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '1', NULL),
(30, '66', '200', '3.50', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '1', NULL),
(31, '66', '200', '3.35', '0.15', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '1', NULL),
(32, '66', '200', '3.50', '5.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '210.00', '300.00', '1', NULL),
(33, '0', '55', '0.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '0.00', '50.00', '0.00', '0.00', '2', NULL),
(34, '0', '55', '9.00', '0.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '51.00', '500.00', '0.00', '0.00', '2', NULL),
(35, '0', '55', '8.55', '0.45', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '501.00', '749.00', '0.00', '0.00', '2', NULL),
(36, '0', '55', '9.00', '15.00', 2020, '2016-03-14 18:56:36', '2016-05-04 17:51:19', 'Arif Khan', 'Moinudeen R', 0, '750.00', '10000.00', '540.00', '900.00', '2', NULL),
(37, '56', '60', '0.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '2', NULL),
(38, '56', '60', '6.00', '0.00', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '2', NULL),
(39, '56', '60', '5.63', '0.38', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '2', NULL),
(40, '56', '60', '6.00', '12.50', 2020, '2016-03-14 18:57:13', '2016-05-04 17:52:14', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '360.00', '750.00', '2', NULL),
(41, '61', '65', '0.00', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '2', NULL),
(42, '61', '65', '3.50', '0.00', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '2', NULL),
(43, '61', '65', '3.28', '0.23', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '2', NULL),
(44, '61', '65', '3.50', '7.50', 2020, '2016-03-14 18:57:34', '2016-05-04 17:53:03', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '210.00', '450.00', '2', NULL),
(45, '66', '200', '0.00', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '0.00', '50.00', '0.00', '0.00', '2', NULL),
(46, '66', '200', '3.50', '0.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '51.00', '500.00', '0.00', '0.00', '2', NULL),
(47, '66', '200', '3.35', '0.15', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '501.00', '749.00', '0.00', '0.00', '2', NULL),
(48, '66', '200', '3.50', '5.00', 2020, '2016-03-14 18:57:57', '2016-05-04 17:53:24', 'Arif Khan', 'Moinudeen R', NULL, '750.00', '10000.00', '210.00', '300.00', '2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `credit_note`
--

CREATE TABLE `credit_note` (
  `credit_note_id` int(11) NOT NULL,
  `credit_note_code` varchar(55) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `gst_amount` decimal(10,2) DEFAULT NULL,
  `remarks` text,
  `date` date DEFAULT NULL,
  `flag` tinyint(4) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `credit_note_status` varchar(100) NOT NULL,
  `site_id` int(11) NOT NULL,
  `gst_percentage` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_order`
--

CREATE TABLE `delivery_order` (
  `delivery_order_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `purchase_order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `delivery_order`
--

INSERT INTO `delivery_order` (`delivery_order_id`, `project_id`, `company_id`, `date`, `created_by`, `creation_date`, `modified_by`, `modification_date`, `purchase_order_id`) VALUES
(1, 44, 21, '2022-10-18', 'Super Admin', '2022-10-18 18:45:39', NULL, NULL, NULL),
(2, 43, 1, '2022-10-18', 'Super Admin', '2022-10-18 20:09:17', NULL, NULL, NULL),
(3, 43, 1, '2022-10-18', 'Super Admin', '2022-10-18 20:09:54', NULL, NULL, NULL),
(4, 44, 21, '2022-10-21', 'Super Admin', '2022-10-21 13:58:13', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_order_history`
--

CREATE TABLE `delivery_order_history` (
  `delivery_order_history_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `delivery_order_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `remarks` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `delivery_order_history`
--

INSERT INTO `delivery_order_history` (`delivery_order_history_id`, `product_id`, `purchase_order_id`, `delivery_order_id`, `status`, `quantity`, `creation_date`, `modification_date`, `remarks`) VALUES
(1, 1, 2, 1, 'In Progress', 1000, '2022-10-18 18:45:39', NULL, NULL),
(2, 1, 1, 2, 'In Progress', 3, '2022-10-18 20:09:17', NULL, NULL),
(3, 1, 3, 3, 'Delivered', 50, '2022-10-18 20:09:54', '2022-10-18 20:13:37', ''),
(4, 4, 3, 3, 'Delivered', 20, '2022-10-18 20:09:54', '2022-10-18 20:13:37', ''),
(5, 3, 3, 3, 'Delivered', 150, '2022-10-18 20:09:54', '2022-10-18 20:13:37', ''),
(6, 1, 2, 4, 'In Progress', 1000, '2022-10-21 13:58:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dormitory`
--

CREATE TABLE `dormitory` (
  `dormitory_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `fax` varchar(25) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `country` varchar(25) DEFAULT NULL,
  `postal_code` varchar(6) DEFAULT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` varchar(255) DEFAULT NULL,
  `address_area` varchar(100) DEFAULT NULL,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `protected` int(11) DEFAULT NULL,
  `pass_word` varchar(25) DEFAULT NULL,
  `subscribe` int(1) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `known_as_name` varchar(255) DEFAULT NULL,
  `address_street1` varchar(255) DEFAULT NULL,
  `address_town1` varchar(255) DEFAULT NULL,
  `address_country1` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `random_no` bigint(50) DEFAULT NULL,
  `member_status` varchar(20) DEFAULT NULL,
  `direct_tel` varchar(200) DEFAULT NULL,
  `member_type` varchar(50) DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `phone_direct` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `salutation` varchar(5) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `company_address_street` text,
  `company_address_flat` text,
  `company_address_town` text,
  `company_address_state` varchar(255) DEFAULT NULL,
  `company_address_country` varchar(255) DEFAULT NULL,
  `company_address_id` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `user_group_id` int(3) DEFAULT NULL,
  `employee_name` varchar(500) DEFAULT NULL,
  `notes` text,
  `user_name` varchar(25) DEFAULT NULL,
  `address` text,
  `login_count` int(11) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `nric_no` varchar(255) DEFAULT NULL,
  `employee_work_type` varchar(255) DEFAULT NULL,
  `add_hourly_rate` decimal(10,2) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `spass_no` varchar(25) DEFAULT NULL,
  `date_of_expiry` date DEFAULT NULL,
  `day_rate` decimal(10,2) DEFAULT NULL,
  `overtime_rate` decimal(10,2) DEFAULT NULL,
  `emp_code` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `relegion` varchar(50) DEFAULT NULL,
  `nationality` varchar(20) DEFAULT NULL,
  `foreign_addrs_street` varchar(200) DEFAULT NULL,
  `foreign_addrs_area` varchar(50) DEFAULT NULL,
  `foreign_addrs_city` varchar(25) DEFAULT NULL,
  `foreign_addrs_postal_code` varchar(10) DEFAULT NULL,
  `foreign_addrs_country` varchar(30) DEFAULT NULL,
  `emergency_contact_name` varchar(25) DEFAULT NULL,
  `emergency_contact_phone` varchar(25) DEFAULT NULL,
  `emergency_contact_phone2` varchar(25) DEFAULT NULL,
  `emergency_contact_address` text,
  `degree1` varchar(150) DEFAULT NULL,
  `educational_qualitifcation1` varchar(100) DEFAULT NULL,
  `year_of_completion1` date DEFAULT NULL,
  `degree2` varchar(150) DEFAULT NULL,
  `educational_qualitifcation2` varchar(100) DEFAULT NULL,
  `year_of_completion2` date DEFAULT NULL,
  `degree3` varchar(150) DEFAULT NULL,
  `educational_qualitifcation3` varchar(100) DEFAULT NULL,
  `year_of_completion3` date DEFAULT NULL,
  `fin_no` varchar(20) DEFAULT NULL,
  `marital_status` varchar(10) DEFAULT NULL,
  `is_citizen` int(11) DEFAULT NULL,
  `race` varchar(255) DEFAULT NULL,
  `employee_group` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `foreign_mobile` varchar(25) DEFAULT NULL,
  `foreign_email` varchar(50) DEFAULT NULL,
  `spr_year` varchar(100) DEFAULT NULL,
  `citizen` varchar(100) DEFAULT NULL,
  `date_of_issue` date DEFAULT NULL,
  `work_permit` varchar(100) DEFAULT NULL,
  `fin_no_expiry_date` date DEFAULT NULL,
  `work_permit_expiry_date` date DEFAULT NULL,
  `ir21_filed` tinyint(1) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `room_no` varchar(50) DEFAULT NULL,
  `dormitory_id` int(11) DEFAULT NULL,
  `employee_type` varchar(50) DEFAULT NULL,
  `project_designation` varchar(255) DEFAULT NULL,
  `team` varchar(255) DEFAULT NULL,
  `project_manager` tinyint(4) DEFAULT NULL,
  `admin_staff` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `company_name`, `position`, `email`, `address_street`, `address_area`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `sort_order`, `published`, `creation_date`, `modification_date`, `protected`, `pass_word`, `subscribe`, `mobile`, `religion`, `relationship`, `known_as_name`, `address_street1`, `address_town1`, `address_country1`, `flag`, `sex`, `date_of_birth`, `random_no`, `member_status`, `direct_tel`, `member_type`, `address_flat`, `phone_direct`, `company_id`, `salutation`, `department`, `created_by`, `modified_by`, `published_test`, `company_address_street`, `company_address_flat`, `company_address_town`, `company_address_state`, `company_address_country`, `company_address_id`, `category`, `status`, `user_group_id`, `employee_name`, `notes`, `user_name`, `address`, `login_count`, `passport`, `nric_no`, `employee_work_type`, `add_hourly_rate`, `salary`, `spass_no`, `date_of_expiry`, `day_rate`, `overtime_rate`, `emp_code`, `gender`, `relegion`, `nationality`, `foreign_addrs_street`, `foreign_addrs_area`, `foreign_addrs_city`, `foreign_addrs_postal_code`, `foreign_addrs_country`, `emergency_contact_name`, `emergency_contact_phone`, `emergency_contact_phone2`, `emergency_contact_address`, `degree1`, `educational_qualitifcation1`, `year_of_completion1`, `degree2`, `educational_qualitifcation2`, `year_of_completion2`, `degree3`, `educational_qualitifcation3`, `year_of_completion3`, `fin_no`, `marital_status`, `is_citizen`, `race`, `employee_group`, `first_name`, `last_name`, `foreign_mobile`, `foreign_email`, `spr_year`, `citizen`, `date_of_issue`, `work_permit`, `fin_no_expiry_date`, `work_permit_expiry_date`, `ir21_filed`, `site_id`, `room_no`, `dormitory_id`, `employee_type`, `project_designation`, `team`, `project_manager`, `admin_staff`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'SG', NULL, NULL, NULL, NULL, NULL, '2022-10-21 14:46:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Archive', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1099', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123654', NULL, NULL, NULL, NULL, 'Laybon', NULL, NULL, NULL, NULL, 'SP', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, '', '', '', NULL, NULL, 'SG', '', '', NULL, NULL, NULL, '2022-10-21 15:06:23', '2022-10-21 15:06:57', NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1985-10-12', NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Current', NULL, NULL, NULL, NULL, NULL, NULL, '', '136548', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1100', '', NULL, 'FRENCH SOUTHERN TERR', '', '', NULL, '', NULL, '', '', '', '', '', '', NULL, '', '', NULL, '', '', NULL, '', '', NULL, '', NULL, 'laymonn', NULL, '', '', '', 'Citizen', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_category`
--

CREATE TABLE `employee_category` (
  `employee_category_id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee_timesheet`
--

CREATE TABLE `employee_timesheet` (
  `employee_timesheet_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `employee_hours` float(10,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `hourly_rate` float(10,2) DEFAULT NULL,
  `month` int(4) DEFAULT NULL,
  `year` int(6) DEFAULT NULL,
  `description` text,
  `employee_ot_hours` float(10,2) DEFAULT NULL,
  `employee_ph_hours` float(10,2) DEFAULT NULL,
  `ot_hourly_rate` float(10,2) DEFAULT NULL,
  `ph_hourly_rate` float(10,2) DEFAULT NULL,
  `admin_charges` float(10,2) DEFAULT NULL,
  `transport_charges` float(10,2) DEFAULT NULL,
  `sign_staff_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `employee_timesheet_finance`
--

CREATE TABLE `employee_timesheet_finance` (
  `employee_timesheet_finance_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `employee_hours` float(10,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `hourly_rate` float(10,2) DEFAULT NULL,
  `month` int(4) DEFAULT NULL,
  `year` int(6) DEFAULT NULL,
  `description` text,
  `order_id` int(11) DEFAULT NULL,
  `employee_timesheet_id` int(11) DEFAULT NULL,
  `employee_ot_hours` float(10,2) DEFAULT NULL,
  `employee_ph_hours` float(10,2) DEFAULT NULL,
  `ot_hourly_rate` float(10,2) DEFAULT NULL,
  `ph_hourly_rate` float(10,2) DEFAULT NULL,
  `admin_charges` float(10,2) DEFAULT NULL,
  `transport_charges` float(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `enquiry_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `comments` text,
  `address_country` varchar(255) DEFAULT NULL,
  `enquiry_date` date DEFAULT '0000-00-00',
  `position` varchar(255) DEFAULT NULL,
  `notes` text,
  `subject` varchar(500) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` text,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `expense_id` int(11) NOT NULL,
  `group` varchar(255) DEFAULT NULL,
  `sub_group` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT '0.00',
  `gst_amount` decimal(10,2) DEFAULT NULL,
  `service_charge` decimal(10,2) DEFAULT NULL,
  `description` text,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `gst` tinyint(4) DEFAULT NULL,
  `gst_percentage` decimal(5,2) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `invoice_code` varchar(100) DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `received_date` date DEFAULT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `mode_of_payment` varchar(25) DEFAULT NULL,
  `po_code` varchar(100) DEFAULT NULL,
  `po_date` date DEFAULT NULL,
  `cheque_no` varchar(100) DEFAULT NULL,
  `issued_date` date DEFAULT NULL,
  `payment_cleared_date` date DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `supplier_gst` varchar(25) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_gst` varchar(25) DEFAULT NULL,
  `new_company` int(1) DEFAULT NULL,
  `from_purchase_order` int(11) DEFAULT NULL,
  `payment_ref_no` varchar(100) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `job_id` varchar(100) DEFAULT NULL,
  `remarks` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `expense_group`
--

CREATE TABLE `expense_group` (
  `expense_group_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `expense_sub_group`
--

CREATE TABLE `expense_sub_group` (
  `expense_sub_group_id` int(11) NOT NULL,
  `expense_group_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `geo_country`
--

CREATE TABLE `geo_country` (
  `geo_country_id` int(11) NOT NULL,
  `country_code` varchar(2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  `published` tinyint(4) NOT NULL DEFAULT '0',
  `flag` tinyint(4) NOT NULL DEFAULT '0',
  `chi_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `geo_country`
--

INSERT INTO `geo_country` (`geo_country_id`, `country_code`, `name`, `latitude`, `longitude`, `published`, `flag`, `chi_name`) VALUES
(1, 'A1', 'Anonymous Proxy', NULL, NULL, 1, 0, NULL),
(2, 'A2', 'Satellite Provider', NULL, NULL, 1, 0, NULL),
(3, 'AD', 'Andorra', '42.5000', '1.5000', 1, 0, NULL),
(4, 'AE', 'United Arab Emirates', '24.0000', '54.0000', 1, 0, NULL),
(5, 'AF', 'Afghanistan', '33.0000', '65.0000', 1, 0, NULL),
(6, 'AG', 'Antigua and Barbuda', '17.0500', '-61.8000', 1, 0, NULL),
(7, 'AI', 'Anguilla', '18.2500', '-63.1667', 1, 0, NULL),
(8, 'AL', 'Albania', '41.0000', '20.0000', 1, 0, NULL),
(9, 'AM', 'Armenia', '40.0000', '45.0000', 1, 0, NULL),
(10, 'AN', 'Netherlands Antilles', '12.2500', '-68.7500', 1, 0, NULL),
(11, 'AO', 'Angola', '-12.5000', '18.5000', 1, 0, NULL),
(12, 'AP', 'Asia/Pacific Region', '35.0000', '105.0000', 1, 0, NULL),
(13, 'AQ', 'Antarctica', '-90.0000', '0.0000', 1, 0, NULL),
(14, 'AR', 'Argentina', '-34.0000', '-64.0000', 1, 0, NULL),
(15, 'AS', 'American Samoa', '-14.3333', '-170.0000', 1, 0, NULL),
(16, 'AT', 'Austria', '47.3333', '13.3333', 1, 0, NULL),
(17, 'AU', 'Australia', '-27.0000', '133.0000', 1, 0, NULL),
(18, 'AW', 'Aruba', '12.5000', '-69.9667', 1, 0, NULL),
(19, 'AX', 'Aland Islands', NULL, NULL, 1, 0, NULL),
(20, 'AZ', 'Azerbaijan', '40.5000', '47.5000', 1, 0, NULL),
(21, 'BA', 'Bosnia and Herzegovina', '44.0000', '18.0000', 1, 0, NULL),
(22, 'BB', 'Barbados', '13.1667', '-59.5333', 1, 0, NULL),
(23, 'BD', 'Bangladesh', '24.0000', '90.0000', 1, 0, NULL),
(24, 'BE', 'Belgium', '50.8333', '4.0000', 1, 0, NULL),
(25, 'BF', 'Burkina Faso', '13.0000', '-2.0000', 1, 0, NULL),
(26, 'BG', 'Bulgaria', '43.0000', '25.0000', 1, 0, NULL),
(27, 'BH', 'Bahrain', '26.0000', '50.5500', 1, 0, NULL),
(28, 'BI', 'Burundi', '-3.5000', '30.0000', 1, 0, NULL),
(29, 'BJ', 'Benin', '9.5000', '2.2500', 1, 0, NULL),
(30, 'BM', 'Bermuda', '32.3333', '-64.7500', 1, 0, NULL),
(31, 'BN', 'Brunei Darussalam', '4.5000', '114.6667', 1, 0, NULL),
(32, 'BO', 'Bolivia', '-17.0000', '-65.0000', 1, 0, NULL),
(33, 'BR', 'Brazil', '-10.0000', '-55.0000', 1, 0, NULL),
(34, 'BS', 'Bahamas', '24.2500', '-76.0000', 1, 0, NULL),
(35, 'BT', 'Bhutan', '27.5000', '90.5000', 1, 0, NULL),
(36, 'BV', 'Bouvet Island', '-54.4333', '3.4000', 1, 0, NULL),
(37, 'BW', 'Botswana', '-22.0000', '24.0000', 1, 0, NULL),
(38, 'BY', 'Belarus', '53.0000', '28.0000', 1, 0, NULL),
(39, 'BZ', 'Belize', '17.2500', '-88.7500', 1, 0, NULL),
(40, 'CA', 'Canada', '60.0000', '-95.0000', 1, 0, NULL),
(41, 'CC', 'Cocos (Keeling) Islands', '-12.5000', '96.8333', 1, 0, NULL),
(42, 'CD', 'Congo, The Democratic Republic of the', '0.0000', '25.0000', 1, 0, NULL),
(43, 'CF', 'Central African Republic', '7.0000', '21.0000', 1, 0, NULL),
(44, 'CG', 'Congo', '-1.0000', '15.0000', 1, 0, NULL),
(45, 'CH', 'Switzerland', '47.0000', '8.0000', 1, 0, NULL),
(46, 'CI', 'Cote d\'Ivoire', '8.0000', '-5.0000', 1, 0, NULL),
(47, 'CK', 'Cook Islands', '-21.2333', '-159.7667', 1, 0, NULL),
(48, 'CL', 'Chile', '-30.0000', '-71.0000', 1, 0, NULL),
(49, 'CM', 'Cameroon', '6.0000', '12.0000', 1, 0, NULL),
(50, 'CN', 'China', '35.0000', '105.0000', 1, 0, NULL),
(51, 'CO', 'Colombia', '4.0000', '-72.0000', 1, 0, NULL),
(52, 'CR', 'Costa Rica', '10.0000', '-84.0000', 1, 0, NULL),
(53, 'CU', 'Cuba', '21.5000', '-80.0000', 1, 0, NULL),
(54, 'CV', 'Cape Verde', '16.0000', '-24.0000', 1, 0, NULL),
(55, 'CX', 'Christmas Island', '-10.5000', '105.6667', 1, 0, NULL),
(56, 'CY', 'Cyprus', '35.0000', '33.0000', 1, 0, NULL),
(57, 'CZ', 'Czech Republic', '49.7500', '15.5000', 1, 0, NULL),
(58, 'DE', 'Germany', '51.0000', '9.0000', 1, 0, NULL),
(59, 'DJ', 'Djibouti', '11.5000', '43.0000', 1, 0, NULL),
(60, 'DK', 'Denmark', '56.0000', '10.0000', 1, 0, NULL),
(61, 'DM', 'Dominica', '15.4167', '-61.3333', 1, 0, NULL),
(62, 'DO', 'Dominican Republic', '19.0000', '-70.6667', 1, 0, NULL),
(63, 'DZ', 'Algeria', '28.0000', '3.0000', 1, 0, NULL),
(64, 'EC', 'Ecuador', '-2.0000', '-77.5000', 1, 0, NULL),
(65, 'EE', 'Estonia', '59.0000', '26.0000', 1, 0, NULL),
(66, 'EG', 'Egypt', '27.0000', '30.0000', 1, 0, NULL),
(67, 'EH', 'Western Sahara', '24.5000', '-13.0000', 1, 0, NULL),
(68, 'ER', 'Eritrea', '15.0000', '39.0000', 1, 0, NULL),
(69, 'ES', 'Spain', '40.0000', '-4.0000', 1, 0, NULL),
(70, 'ET', 'Ethiopia', '8.0000', '38.0000', 1, 0, NULL),
(71, 'EU', 'Europe', '47.0000', '8.0000', 1, 0, NULL),
(72, 'FI', 'Finland', '64.0000', '26.0000', 1, 0, NULL),
(73, 'FJ', 'Fiji', '-18.0000', '175.0000', 1, 0, NULL),
(74, 'FK', 'Falkland Islands (Malvinas)', '-51.7500', '-59.0000', 1, 0, NULL),
(75, 'FM', 'Micronesia, Federated States of', '6.9167', '158.2500', 1, 0, NULL),
(76, 'FO', 'Faroe Islands', '62.0000', '-7.0000', 1, 0, NULL),
(77, 'FR', 'France', '46.0000', '2.0000', 1, 0, NULL),
(78, 'GA', 'Gabon', '-1.0000', '11.7500', 1, 0, NULL),
(79, 'GB', 'United Kingdom', '54.0000', '-2.0000', 1, 0, NULL),
(80, 'GD', 'Grenada', '12.1167', '-61.6667', 1, 0, NULL),
(81, 'GE', 'Georgia', '42.0000', '43.5000', 1, 0, NULL),
(82, 'GF', 'French Guiana', '4.0000', '-53.0000', 1, 0, NULL),
(83, 'GG', 'Guernsey', NULL, NULL, 1, 0, NULL),
(84, 'GH', 'Ghana', '8.0000', '-2.0000', 1, 0, NULL),
(85, 'GI', 'Gibraltar', '36.1833', '-5.3667', 1, 0, NULL),
(86, 'GL', 'Greenland', '72.0000', '-40.0000', 1, 0, NULL),
(87, 'GM', 'Gambia', '13.4667', '-16.5667', 1, 0, NULL),
(88, 'GN', 'Guinea', '11.0000', '-10.0000', 1, 0, NULL),
(89, 'GP', 'Guadeloupe', '16.2500', '-61.5833', 1, 0, NULL),
(90, 'GQ', 'Equatorial Guinea', '2.0000', '10.0000', 1, 0, NULL),
(91, 'GR', 'Greece', '39.0000', '22.0000', 1, 0, NULL),
(92, 'GS', 'South Georgia and the South Sandwich Islands', '-54.5000', '-37.0000', 1, 0, NULL),
(93, 'GT', 'Guatemala', '15.5000', '-90.2500', 1, 0, NULL),
(94, 'GU', 'Guam', '13.4667', '144.7833', 1, 0, NULL),
(95, 'GW', 'Guinea-Bissau', '12.0000', '-15.0000', 1, 0, NULL),
(96, 'GY', 'Guyana', '5.0000', '-59.0000', 1, 0, NULL),
(97, 'HK', 'Hong Kong', '22.2500', '114.1667', 1, 0, NULL),
(98, 'HM', 'Heard Island and McDonald Islands', '-53.1000', '72.5167', 1, 0, NULL),
(99, 'HN', 'Honduras', '15.0000', '-86.5000', 1, 0, NULL),
(100, 'HR', 'Croatia', '45.1667', '15.5000', 1, 0, NULL),
(101, 'HT', 'Haiti', '19.0000', '-72.4167', 1, 0, NULL),
(102, 'HU', 'Hungary', '47.0000', '20.0000', 1, 0, NULL),
(103, 'ID', 'Indonesia', '-5.0000', '120.0000', 1, 0, NULL),
(104, 'IE', 'Ireland', '53.0000', '-8.0000', 1, 0, NULL),
(105, 'IL', 'Israel', '31.5000', '34.7500', 1, 0, NULL),
(106, 'IM', 'Isle of Man', NULL, NULL, 1, 0, NULL),
(107, 'IN', 'India', '20.0000', '77.0000', 1, 0, NULL),
(108, 'IO', 'British Indian Ocean Territory', '-6.0000', '71.5000', 1, 0, NULL),
(109, 'IQ', 'Iraq', '33.0000', '44.0000', 1, 0, NULL),
(110, 'IR', 'Iran, Islamic Republic of', '32.0000', '53.0000', 1, 0, NULL),
(111, 'IS', 'Iceland', '65.0000', '-18.0000', 1, 0, NULL),
(112, 'IT', 'Italy', '42.8333', '12.8333', 1, 0, NULL),
(113, 'JE', 'Jersey', NULL, NULL, 1, 0, NULL),
(114, 'JM', 'Jamaica', '18.2500', '-77.5000', 1, 0, NULL),
(115, 'JO', 'Jordan', '31.0000', '36.0000', 1, 0, NULL),
(116, 'JP', 'Japan', '36.0000', '138.0000', 1, 0, NULL),
(117, 'KE', 'Kenya', '1.0000', '38.0000', 1, 0, NULL),
(118, 'KG', 'Kyrgyzstan', '41.0000', '75.0000', 1, 0, NULL),
(119, 'KH', 'Cambodia', '13.0000', '105.0000', 1, 0, NULL),
(120, 'KI', 'Kiribati', '1.4167', '173.0000', 1, 0, NULL),
(121, 'KM', 'Comoros', '-12.1667', '44.2500', 1, 0, NULL),
(122, 'KN', 'Saint Kitts and Nevis', '17.3333', '-62.7500', 1, 0, NULL),
(123, 'KP', 'Korea, Democratic People\'s Republic of', '40.0000', '127.0000', 1, 0, NULL),
(124, 'KR', 'Korea, Republic of', '37.0000', '127.5000', 1, 0, NULL),
(125, 'KW', 'Kuwait', '29.3375', '47.6581', 1, 0, NULL),
(126, 'KY', 'Cayman Islands', '19.5000', '-80.5000', 1, 0, NULL),
(127, 'KZ', 'Kazakhstan', '48.0000', '68.0000', 1, 0, NULL),
(128, 'LA', 'Lao People\'s Democratic Republic', '18.0000', '105.0000', 1, 0, NULL),
(129, 'LB', 'Lebanon', '33.8333', '35.8333', 1, 0, NULL),
(130, 'LC', 'Saint Lucia', '13.8833', '-61.1333', 1, 0, NULL),
(131, 'LI', 'Liechtenstein', '47.1667', '9.5333', 1, 0, NULL),
(132, 'LK', 'Sri Lanka', '7.0000', '81.0000', 1, 0, NULL),
(133, 'LR', 'Liberia', '6.5000', '-9.5000', 1, 0, NULL),
(134, 'LS', 'Lesotho', '-29.5000', '28.5000', 1, 0, NULL),
(135, 'LT', 'Lithuania', '56.0000', '24.0000', 1, 0, NULL),
(136, 'LU', 'Luxembourg', '49.7500', '6.1667', 1, 0, NULL),
(137, 'LV', 'Latvia', '57.0000', '25.0000', 1, 0, NULL),
(138, 'LY', 'Libyan Arab Jamahiriya', '25.0000', '17.0000', 1, 0, NULL),
(139, 'MA', 'Morocco', '32.0000', '-5.0000', 1, 0, NULL),
(140, 'MC', 'Monaco', '43.7333', '7.4000', 1, 0, NULL),
(141, 'MD', 'Moldova, Republic of', '47.0000', '29.0000', 1, 0, NULL),
(142, 'ME', 'Montenegro', '42.0000', '19.0000', 1, 0, NULL),
(143, 'MG', 'Madagascar', '-20.0000', '47.0000', 1, 0, NULL),
(144, 'MH', 'Marshall Islands', '9.0000', '168.0000', 1, 0, NULL),
(145, 'MK', 'Macedonia', '41.8333', '22.0000', 1, 0, NULL),
(146, 'ML', 'Mali', '17.0000', '-4.0000', 1, 0, NULL),
(147, 'MM', 'Myanmar', '22.0000', '98.0000', 1, 0, NULL),
(148, 'MN', 'Mongolia', '46.0000', '105.0000', 1, 0, NULL),
(149, 'MO', 'Macao', '22.1667', '113.5500', 1, 0, NULL),
(150, 'MP', 'Northern Mariana Islands', '15.2000', '145.7500', 1, 0, NULL),
(151, 'MQ', 'Martinique', '14.6667', '-61.0000', 1, 0, NULL),
(152, 'MR', 'Mauritania', '20.0000', '-12.0000', 1, 0, NULL),
(153, 'MS', 'Montserrat', '16.7500', '-62.2000', 1, 0, NULL),
(154, 'MT', 'Malta', '35.8333', '14.5833', 1, 0, NULL),
(155, 'MU', 'Mauritius', '-20.2833', '57.5500', 1, 0, NULL),
(156, 'MV', 'Maldives', '3.2500', '73.0000', 1, 0, NULL),
(157, 'MW', 'Malawi', '-13.5000', '34.0000', 1, 0, NULL),
(158, 'MX', 'Mexico', '23.0000', '-102.0000', 1, 0, NULL),
(159, 'MY', 'Malaysia', '2.5000', '112.5000', 1, 0, NULL),
(160, 'MZ', 'Mozambique', '-18.2500', '35.0000', 1, 0, NULL),
(161, 'NA', 'Namibia', '-22.0000', '17.0000', 1, 0, NULL),
(162, 'NC', 'New Caledonia', '-21.5000', '165.5000', 1, 0, NULL),
(163, 'NE', 'Niger', '16.0000', '8.0000', 1, 0, NULL),
(164, 'NF', 'Norfolk Island', '-29.0333', '167.9500', 1, 0, NULL),
(165, 'NG', 'Nigeria', '10.0000', '8.0000', 1, 0, NULL),
(166, 'NI', 'Nicaragua', '13.0000', '-85.0000', 1, 0, NULL),
(167, 'NL', 'Netherlands', '52.5000', '5.7500', 1, 0, NULL),
(168, 'NO', 'Norway', '62.0000', '10.0000', 1, 0, NULL),
(169, 'NP', 'Nepal', '28.0000', '84.0000', 1, 0, NULL),
(170, 'NR', 'Nauru', '-0.5333', '166.9167', 1, 0, NULL),
(171, 'NU', 'Niue', '-19.0333', '-169.8667', 1, 0, NULL),
(172, 'NZ', 'New Zealand', '-41.0000', '174.0000', 1, 0, NULL),
(173, 'OM', 'Oman', '21.0000', '57.0000', 1, 0, NULL),
(174, 'PA', 'Panama', '9.0000', '-80.0000', 1, 0, NULL),
(175, 'PE', 'Peru', '-10.0000', '-76.0000', 1, 0, NULL),
(176, 'PF', 'French Polynesia', '-15.0000', '-140.0000', 1, 0, NULL),
(177, 'PG', 'Papua New Guinea', '-6.0000', '147.0000', 1, 0, NULL),
(178, 'PH', 'Philippines', '13.0000', '122.0000', 1, 0, NULL),
(179, 'PK', 'Pakistan', '30.0000', '70.0000', 1, 0, NULL),
(180, 'PL', 'Poland', '52.0000', '20.0000', 1, 0, NULL),
(181, 'PM', 'Saint Pierre and Miquelon', '46.8333', '-56.3333', 1, 0, NULL),
(182, 'PN', 'Pitcairn', NULL, NULL, 1, 0, NULL),
(183, 'PR', 'Puerto Rico', '18.2500', '-66.5000', 1, 0, NULL),
(184, 'PS', 'Palestinian Territory', '32.0000', '35.2500', 1, 0, NULL),
(185, 'PT', 'Portugal', '39.5000', '-8.0000', 1, 0, NULL),
(186, 'PW', 'Palau', '7.5000', '134.5000', 1, 0, NULL),
(187, 'PY', 'Paraguay', '-23.0000', '-58.0000', 1, 0, NULL),
(188, 'QA', 'Qatar', '25.5000', '51.2500', 1, 0, NULL),
(189, 'RE', 'Reunion', '-21.1000', '55.6000', 1, 0, NULL),
(190, 'RO', 'Romania', '46.0000', '25.0000', 1, 0, NULL),
(191, 'RS', 'Serbia', '44.0000', '21.0000', 1, 0, NULL),
(192, 'RU', 'Russian Federation', '60.0000', '100.0000', 1, 0, NULL),
(193, 'RW', 'Rwanda', '-2.0000', '30.0000', 1, 0, NULL),
(194, 'SA', 'Saudi Arabia', '25.0000', '45.0000', 1, 0, NULL),
(195, 'SB', 'Solomon Islands', '-8.0000', '159.0000', 1, 0, NULL),
(196, 'SC', 'Seychelles', '-4.5833', '55.6667', 1, 0, NULL),
(197, 'SD', 'Sudan', '15.0000', '30.0000', 1, 0, NULL),
(198, 'SE', 'Sweden', '62.0000', '15.0000', 1, 0, NULL),
(199, 'SG', 'Singapore', '1.3667', '103.8000', 1, 0, NULL),
(200, 'SH', 'Saint Helena', '-15.9333', '-5.7000', 1, 0, NULL),
(201, 'SI', 'Slovenia', '46.0000', '15.0000', 1, 0, NULL),
(202, 'SJ', 'Svalbard and Jan Mayen', '78.0000', '20.0000', 1, 0, NULL),
(203, 'SK', 'Slovakia', '48.6667', '19.5000', 1, 0, NULL),
(204, 'SL', 'Sierra Leone', '8.5000', '-11.5000', 1, 0, NULL),
(205, 'SM', 'San Marino', '43.7667', '12.4167', 1, 0, NULL),
(206, 'SN', 'Senegal', '14.0000', '-14.0000', 1, 0, NULL),
(207, 'SO', 'Somalia', '10.0000', '49.0000', 1, 0, NULL),
(208, 'SR', 'Suriname', '4.0000', '-56.0000', 1, 0, NULL),
(209, 'ST', 'Sao Tome and Principe', '1.0000', '7.0000', 1, 0, NULL),
(210, 'SV', 'El Salvador', '13.8333', '-88.9167', 1, 0, NULL),
(211, 'SY', 'Syrian Arab Republic', '35.0000', '38.0000', 1, 0, NULL),
(212, 'SZ', 'Swaziland', '-26.5000', '31.5000', 1, 0, NULL),
(213, 'TC', 'Turks and Caicos Islands', '21.7500', '-71.5833', 1, 0, NULL),
(214, 'TD', 'Chad', '15.0000', '19.0000', 1, 0, NULL),
(215, 'TF', 'French Southern Territories', '-43.0000', '67.0000', 1, 0, NULL),
(216, 'TG', 'Togo', '8.0000', '1.1667', 1, 0, NULL),
(217, 'TH', 'Thailand', '15.0000', '100.0000', 1, 0, NULL),
(218, 'TJ', 'Tajikistan', '39.0000', '71.0000', 1, 0, NULL),
(219, 'TK', 'Tokelau', '-9.0000', '-172.0000', 1, 0, NULL),
(220, 'TL', 'Timor-Leste', NULL, NULL, 1, 0, NULL),
(221, 'TM', 'Turkmenistan', '40.0000', '60.0000', 1, 0, NULL),
(222, 'TN', 'Tunisia', '34.0000', '9.0000', 1, 0, NULL),
(223, 'TO', 'Tonga', '-20.0000', '-175.0000', 1, 0, NULL),
(224, 'TR', 'Turkey', '39.0000', '35.0000', 1, 0, NULL),
(225, 'TT', 'Trinidad and Tobago', '11.0000', '-61.0000', 1, 0, NULL),
(226, 'TV', 'Tuvalu', '-8.0000', '178.0000', 1, 0, NULL),
(227, 'TW', 'Taiwan', '23.5000', '121.0000', 1, 0, NULL),
(228, 'TZ', 'Tanzania, United Republic of', '-6.0000', '35.0000', 1, 0, NULL),
(229, 'UA', 'Ukraine', '49.0000', '32.0000', 1, 0, NULL),
(230, 'UG', 'Uganda', '1.0000', '32.0000', 1, 0, NULL),
(231, 'UM', 'United States Minor Outlying Islands', '19.2833', '166.6000', 1, 0, NULL),
(232, 'US', 'United States', '38.0000', '-97.0000', 1, 0, NULL),
(233, 'UY', 'Uruguay', '-33.0000', '-56.0000', 1, 0, NULL),
(234, 'UZ', 'Uzbekistan', '41.0000', '64.0000', 1, 0, NULL),
(235, 'VA', 'Holy See (Vatican City State)', '41.9000', '12.4500', 1, 0, NULL),
(236, 'VC', 'Saint Vincent and the Grenadines', '13.2500', '-61.2000', 1, 0, NULL),
(237, 'VE', 'Venezuela', '8.0000', '-66.0000', 1, 0, NULL),
(238, 'VG', 'Virgin Islands, British', '18.5000', '-64.5000', 1, 0, NULL),
(239, 'VI', 'Virgin Islands, U.S.', '18.3333', '-64.8333', 1, 0, NULL),
(240, 'VN', 'Vietnam', '16.0000', '106.0000', 1, 0, NULL),
(241, 'VU', 'Vanuatu', '-16.0000', '167.0000', 1, 0, NULL),
(242, 'WF', 'Wallis and Futuna', '-13.3000', '-176.2000', 1, 0, NULL),
(243, 'WS', 'Samoa', '-13.5833', '-172.3333', 1, 0, NULL),
(244, 'YE', 'Yemen', '15.0000', '48.0000', 1, 0, NULL),
(245, 'YT', 'Mayotte', '-12.8333', '45.1667', 1, 0, NULL),
(246, 'ZA', 'South Africa', '-29.0000', '24.0000', 1, 0, NULL),
(247, 'ZM', 'Zambia', '-15.0000', '30.0000', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `income_group`
--

CREATE TABLE `income_group` (
  `income_group_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `income_sub_group`
--

CREATE TABLE `income_sub_group` (
  `income_sub_group_id` int(11) NOT NULL,
  `expense_group_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `income_group_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE `interest` (
  `interest_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;

-- --------------------------------------------------------

--
-- Table structure for table `interest_contact`
--

CREATE TABLE `interest_contact` (
  `interest_contact_id` int(11) NOT NULL,
  `interest_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `minimum_order_level` int(11) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `actual_stock` decimal(10,2) DEFAULT NULL,
  `inventory_code` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `changed_stock` varchar(50) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `product_id`, `creation_date`, `modification_date`, `flag`, `minimum_order_level`, `site_id`, `actual_stock`, `inventory_code`, `color`, `size`, `code`, `model`, `changed_stock`, `notes`, `created_by`, `modified_by`) VALUES
(1, 2, '2022-10-18 18:45:43', NULL, 0, NULL, 0, '90.00', '1012', NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL),
(2, 1, '2022-10-18 20:11:10', NULL, 0, NULL, 0, '2.00', '1013', NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `invoice_code` varchar(50) DEFAULT NULL,
  `invoice_amount` decimal(10,2) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `mode_of_payment` varchar(50) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `invoice_type` varchar(200) DEFAULT NULL,
  `invoice_due_date` date DEFAULT NULL,
  `invoice_terms` text,
  `notes` text,
  `cst` int(1) DEFAULT NULL,
  `vat` int(1) DEFAULT NULL,
  `cst_value` decimal(10,2) DEFAULT NULL,
  `vat_value` decimal(10,2) DEFAULT NULL,
  `frieght` int(11) DEFAULT NULL,
  `p_f` int(11) DEFAULT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `invoice_code_vat` int(50) DEFAULT NULL,
  `invoice_used` int(1) DEFAULT NULL,
  `invoice_code_vat_quote` int(50) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `manual_invoice_seq` int(1) DEFAULT NULL,
  `apply_general_vat` int(1) DEFAULT NULL,
  `selling_company` varchar(50) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `invoice_paid_date` date DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `invoice_sent_out` tinyint(1) NOT NULL DEFAULT '0',
  `gst_percentage` tinyint(4) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `rate_text` varchar(255) DEFAULT NULL,
  `qty_text` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `reference_no` varchar(50) DEFAULT NULL,
  `CBF_Ref_No` varchar(50) DEFAULT NULL,
  `invoice_code_user` varchar(255) DEFAULT NULL,
  `invoice_sent_out_date` date DEFAULT NULL,
  `payment_terms` text,
  `po_number` varchar(255) DEFAULT NULL,
  `project_location` varchar(255) DEFAULT NULL,
  `project_reference` varchar(255) DEFAULT NULL,
  `quote_code` varchar(50) DEFAULT NULL,
  `invoice_manual_code` varchar(150) DEFAULT NULL,
  `so_ref_no` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `site_code` varchar(100) DEFAULT NULL,
  `attention` varchar(100) DEFAULT NULL,
  `reference` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_code`, `invoice_amount`, `invoice_date`, `mode_of_payment`, `status`, `order_id`, `staff_id`, `creation_date`, `modification_date`, `flag`, `created_by`, `purchase_order_id`, `invoice_type`, `invoice_due_date`, `invoice_terms`, `notes`, `cst`, `vat`, `cst_value`, `vat_value`, `frieght`, `p_f`, `discount`, `invoice_code_vat`, `invoice_used`, `invoice_code_vat_quote`, `site_id`, `manual_invoice_seq`, `apply_general_vat`, `selling_company`, `project_id`, `invoice_paid_date`, `modified_by`, `invoice_sent_out`, `gst_percentage`, `title`, `rate_text`, `qty_text`, `start_date`, `end_date`, `reference_no`, `CBF_Ref_No`, `invoice_code_user`, `invoice_sent_out_date`, `payment_terms`, `po_number`, `project_location`, `project_reference`, `quote_code`, `invoice_manual_code`, `so_ref_no`, `code`, `site_code`, `attention`, `reference`) VALUES
(1, 'INV_ME_596', '4875.00', '2022-10-18', NULL, 'Paid', 1, NULL, '2022-10-18 18:51:45', '2022-10-18 18:51:58', NULL, 'Super Admin', NULL, '', '2022-11-17', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 0, 7, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>1.The above rates are in Singapore Dollars.</p>\n\n<p>2. Payment Terms 30 days from the date of Invoice</p>\n\n<p>3.Payment should be made in favor of &quot; CUBOSALE ENGINEERING PTE LTD &quot;</p>\n\n<p>4.Any discrepancies please write to us within 3 days from the date of invoice</p>\n\n<p>&nbsp;</p>\n\n<p>5. <u>For Account transfer</u></p>\n\n<p><strong>UNITED OVERSEAS BANK</strong></p>\n\n<p><strong>ACCT NAME: CUBOSALE ENGINEERING PTE LTD</strong></p>\n\n<p><strong>ACCT NO.:- 3923023427</strong></p>\n\n<p><strong>Paynow By UEN : 201222688M</strong></p>\n', '3456', 'Factory', 'Test reference', '1234', NULL, '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_credit_note_history`
--

CREATE TABLE `invoice_credit_note_history` (
  `invoice_credit_note_history_id` int(11) NOT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `credit_note_id` int(11) DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `item_title` varchar(100) DEFAULT NULL,
  `description` text,
  `gst_percentage` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

CREATE TABLE `invoice_item` (
  `invoice_item_id` int(10) NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `record_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `qty` decimal(10,2) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT '0.00',
  `item_title` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `cost_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `order_item_id` int(11) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `vat` decimal(10,2) DEFAULT NULL,
  `discount_percentage` decimal(10,2) DEFAULT NULL,
  `discount_type` varchar(100) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `item_code_backup` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `description` text,
  `remarks` text,
  `modification_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `month` int(4) DEFAULT NULL,
  `year` int(6) DEFAULT NULL,
  `total_cost` float(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `s_no` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoice_item`
--

INSERT INTO `invoice_item` (`invoice_item_id`, `invoice_id`, `record_id`, `qty`, `unit_price`, `item_title`, `model`, `module`, `supplier_id`, `cost_price`, `order_item_id`, `item_code`, `vat`, `discount_percentage`, `discount_type`, `site_id`, `item_code_backup`, `unit`, `description`, `remarks`, `modification_date`, `modified_by`, `month`, `year`, `total_cost`, `amount`, `s_no`) VALUES
(1, 1, 0, '75.00', '65.00', 'Test Item 12', NULL, NULL, NULL, '0.00', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'pcs', 'Test Desc 12', NULL, NULL, NULL, NULL, NULL, NULL, '4875.00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_receipt_history`
--

CREATE TABLE `invoice_receipt_history` (
  `invoice_receipt_history_id` int(11) NOT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `receipt_id` int(11) DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoice_receipt_history`
--

INSERT INTO `invoice_receipt_history` (`invoice_receipt_history_id`, `invoice_id`, `receipt_id`, `published`, `flag`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `amount`, `site_id`) VALUES
(1, 1, 1, NULL, 0, '2022-10-18 18:51:58', NULL, 'Super Admin', NULL, '5216.25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `job_information`
--

CREATE TABLE `job_information` (
  `job_information_id` int(11) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `probationary` int(3) DEFAULT NULL,
  `emp_type` varchar(20) DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `act_join_date` date DEFAULT NULL,
  `termination_date` date DEFAULT NULL,
  `termination_reason` text,
  `department` varchar(100) DEFAULT NULL,
  `basic_pay` decimal(10,2) DEFAULT NULL,
  `levy_amount` decimal(10,0) DEFAULT NULL,
  `working_days` decimal(10,1) DEFAULT NULL,
  `payment_type` varchar(15) DEFAULT NULL,
  `overtime` int(1) DEFAULT NULL,
  `overtime_pay_rate` decimal(10,2) DEFAULT NULL,
  `cpf_applicable` int(1) DEFAULT NULL,
  `income_tax_id` varchar(50) DEFAULT NULL,
  `pay_cdac` decimal(10,2) DEFAULT NULL,
  `pay_sinda` decimal(10,2) DEFAULT NULL,
  `pay_mbmf` decimal(10,2) DEFAULT NULL,
  `cpf_account_no` varchar(50) DEFAULT NULL,
  `pay_eucf` decimal(10,2) DEFAULT NULL,
  `mode_of_payment` varchar(50) DEFAULT NULL,
  `account_no` varchar(25) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `bank_code` varchar(25) DEFAULT NULL,
  `branch_code` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `allowance1` decimal(10,2) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `income_tax_amount` decimal(10,2) DEFAULT NULL,
  `allowance2` decimal(10,2) DEFAULT NULL,
  `allowance3` decimal(10,2) DEFAULT NULL,
  `deduction1` decimal(10,2) DEFAULT NULL,
  `deduction2` decimal(10,2) DEFAULT NULL,
  `deduction3` decimal(10,2) DEFAULT NULL,
  `deduction4` decimal(10,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `govt_donation` varchar(50) DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `resignation_notice_date` date DEFAULT NULL,
  `work_hour_details` text,
  `duty_responsibility` varchar(100) DEFAULT NULL,
  `rest_day_per_week` varchar(155) DEFAULT NULL,
  `probation_start_date` date DEFAULT NULL,
  `probation_end_date` date DEFAULT NULL,
  `length_of_probation` text,
  `notice_period_for_termination` text,
  `duration_of_employment` varchar(155) DEFAULT NULL,
  `place_of_work` varchar(155) DEFAULT NULL,
  `salary_payment_dates` varchar(155) DEFAULT NULL,
  `overtime_payment_dates` varchar(155) DEFAULT NULL,
  `paid_annual_leave_per_year` varchar(10) DEFAULT NULL,
  `paid_outpatient_sick_leave_per_year` varchar(10) DEFAULT NULL,
  `paid_hospitalisation_leave_per_year` varchar(10) DEFAULT NULL,
  `other_type_of_leave` text,
  `paid_medical_examination_fee` tinyint(1) DEFAULT NULL,
  `other_medical_benefits` text,
  `allowance4` decimal(10,2) DEFAULT NULL,
  `allowance5` decimal(10,2) DEFAULT NULL,
  `allowance6` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `over_time_rate` decimal(10,1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE `leave` (
  `leave_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `leave_type` varchar(100) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `reason` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `no_of_days` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `no_of_days_next_month` int(11) DEFAULT NULL,
  `went_overseas` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `leave_policy`
--

CREATE TABLE `leave_policy` (
  `leave_policy_id` int(11) NOT NULL,
  `type_of_leave` varchar(100) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `leave_policy_employee_type`
--

CREATE TABLE `leave_policy_employee_type` (
  `leave_policy_employee_type_id` int(11) NOT NULL,
  `leave_policy_id` int(11) DEFAULT NULL,
  `employee_group` varchar(20) DEFAULT NULL,
  `no_of_days` decimal(10,2) DEFAULT NULL,
  `year` int(10) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `loan_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `no_of_months` int(11) DEFAULT NULL,
  `deduction` decimal(10,2) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `loan_closing_date` date DEFAULT NULL,
  `month_amount` decimal(10,2) DEFAULT NULL,
  `loan_start_date` date DEFAULT NULL,
  `notes` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loan_repayment_history`
--

CREATE TABLE `loan_repayment_history` (
  `loan_repayment_history_id` int(11) NOT NULL,
  `payroll_management_id` int(11) DEFAULT NULL,
  `loan_id` int(11) DEFAULT NULL,
  `remarks` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `loan_repayment_amount_per_month` decimal(10,2) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `generated_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `materials_request`
--

CREATE TABLE `materials_request` (
  `materials_request_id` int(11) NOT NULL,
  `mr_code` varchar(15) DEFAULT NULL,
  `company_id_supplier` int(11) DEFAULT NULL,
  `contact_id_supplier` int(11) DEFAULT '0',
  `delivery_terms` text,
  `status` varchar(25) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `supplier_reference_no` varchar(100) DEFAULT NULL,
  `our_reference_no` varchar(100) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `payment_terms` text,
  `delivery_date` date DEFAULT NULL,
  `mr_date` date DEFAULT NULL,
  `shipping_address_flat` varchar(255) DEFAULT NULL,
  `shipping_address_street` varchar(255) DEFAULT NULL,
  `shipping_address_country` varchar(100) DEFAULT NULL,
  `shipping_address_po_code` varchar(10) DEFAULT NULL,
  `expense_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `materials_request_date` date DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `priority` varchar(100) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `notes` text,
  `supplier_inv_code` varchar(100) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `gst_percentage` decimal(10,2) DEFAULT NULL,
  `project_name` varchar(200) DEFAULT NULL,
  `site_reference` varchar(200) DEFAULT NULL,
  `request_by` varchar(200) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `approved_by` varchar(200) DEFAULT NULL,
  `approved_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `materials_request_line_items`
--

CREATE TABLE `materials_request_line_items` (
  `materials_request_line_items_id` int(11) NOT NULL,
  `materials_request_id` int(11) DEFAULT NULL,
  `item_title` varchar(255) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `description` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `selling_price` decimal(10,2) DEFAULT NULL,
  `qty_requested` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `damage_qty` int(11) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `materials_returned`
--

CREATE TABLE `materials_returned` (
  `materials_returned_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `project_materials_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materials_returned`
--

INSERT INTO `materials_returned` (`materials_returned_id`, `product_id`, `project_materials_id`, `quantity`, `amount`, `creation_date`, `modification_date`, `created_by`, `modified_by`) VALUES
(1, 1, 3, '1.00', NULL, '2022-10-18 20:12:38', NULL, 'Super Admin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `media_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `media_type` varchar(100) DEFAULT NULL,
  `actual_file_name` varchar(255) DEFAULT NULL,
  `display_title` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `media_size` int(11) DEFAULT NULL,
  `room_name` varchar(50) DEFAULT NULL,
  `record_type` varchar(50) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `alt_tag_data` varchar(255) DEFAULT NULL,
  `broadcast_id` int(11) DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `staff_id` varchar(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `timesheet_id` int(11) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `uploaded` int(1) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `description` text,
  `internal_link` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mod_acc_other_action`
--

CREATE TABLE `mod_acc_other_action` (
  `other_action_id` int(11) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `has_new` int(11) DEFAULT NULL,
  `has_find` int(11) DEFAULT NULL,
  `is_global` int(11) DEFAULT NULL,
  `has_detail` int(11) DEFAULT NULL,
  `has_list` int(11) DEFAULT NULL,
  `action_type` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `has_modify` int(11) DEFAULT NULL,
  `action_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `is_hideable` int(11) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mod_acc_room`
--

CREATE TABLE `mod_acc_room` (
  `room_id` int(11) NOT NULL,
  `list` int(1) DEFAULT NULL,
  `detail` int(1) DEFAULT NULL,
  `new` int(1) DEFAULT NULL,
  `edit` int(1) DEFAULT NULL,
  `delete` int(1) DEFAULT NULL,
  `duplicate` int(1) DEFAULT NULL,
  `search` int(1) DEFAULT NULL,
  `print` int(1) DEFAULT NULL,
  `publish` int(1) DEFAULT NULL,
  `unpublish` int(1) DEFAULT NULL,
  `room_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `import` tinyint(4) NOT NULL DEFAULT '0',
  `export` tinyint(4) NOT NULL DEFAULT '0',
  `modification_date` datetime DEFAULT NULL,
  `room_type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mod_acc_room`
--

INSERT INTO `mod_acc_room` (`room_id`, `list`, `detail`, `new`, `edit`, `delete`, `duplicate`, `search`, `print`, `publish`, `unpublish`, `room_name`, `title`, `creation_date`, `import`, `export`, `modification_date`, `room_type`) VALUES
(1, 1, 1, 0, 1, 1, NULL, NULL, 0, 0, 0, 'enggCrm_home', 'Home', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, 0, 'common_dashboard', 'Dashboard', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(3, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'enggCrm_opportunity', 'Opportunity', '2021-01-11 21:02:06', 0, 1, '2022-08-09 14:41:19', 'module'),
(4, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, 0, 'enggCrm_project', 'Project', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(5, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'enggCrm_company', 'Client', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(6, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'tradingsg_booking', 'Booking', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(7, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'enggCrm_attendance', 'Timesheet', '2021-01-11 21:02:06', 0, 1, '2022-08-09 14:41:19', 'module'),
(8, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'tradingsg_product', 'Product', '2021-01-11 21:02:06', 1, 1, '2022-08-09 14:41:19', 'module'),
(9, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'tradingsg_supplier', 'Supplier', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(10, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'tradingsg_subCon', 'Sub Con', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(11, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, 0, 'enggCrm_order', 'Finance', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(12, 1, 1, 0, 0, 1, NULL, NULL, 0, 0, 0, 'enggCrm_invoice', 'Invoice', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(13, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, 0, 'tradingin_inventory', 'Inventory', '2021-01-11 21:02:06', 1, 1, '2022-08-09 14:41:19', 'module'),
(14, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'tradingsg_purchaseOrder', 'Purchase Order', '2021-01-11 21:02:06', 1, 1, '2022-08-09 14:41:19', 'module'),
(15, 1, 1, 0, 1, 1, NULL, NULL, 0, 0, 0, 'enggCrm_reports', 'Reports', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(16, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_leave', 'Leave', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(17, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_loan', 'Loan', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(18, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'payroll_training', 'Training', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(19, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_employee', 'Employee', '2021-01-11 21:02:06', 1, 0, '2022-08-09 14:41:19', 'module'),
(20, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, 0, 'payroll_jobInformation', 'Job Information', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(21, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, 0, 'payroll_payrollManagement', 'Payroll Management', '2021-01-11 21:02:06', 1, 0, '2022-08-09 14:41:19', 'module'),
(22, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_cPFCalculator', 'CPF Calculator', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(23, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'core_staff', 'Staff', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(24, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'core_valuelist', 'Valuelist', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(25, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'core_setting', 'Setting', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'module'),
(67, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'core_userGroup', 'User Group', '2022-08-02 15:57:49', 0, 0, '2022-08-09 14:41:19', 'module'),
(27, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'project_projectSummary', 'Project Summary', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(28, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'project_invoiceSummary', 'Invoice Summary', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(29, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'project_invoiceSummaryChart', 'Invoice Summary Chart', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(30, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'project_opportunity', 'Opportunity Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(31, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_invoiceByMonthReports', 'Invoice By Month', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(32, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_invoiceByYearReports', 'Invoice by Year', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(33, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_employeeReport', 'Employee Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(34, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectReport', 'Project Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(35, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_statementofAccountsReport', 'Statement of Accounts Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(36, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_ageingReport', 'Ageing Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(37, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_employeePayslipGeneratedReport', 'Payslip Generated Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(38, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_employeeSalaryReport', 'Employee Salary Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(39, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_cPFSummaryReport', 'CPF Summary Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(40, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_ir8aReport', 'IR8A Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(41, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_employeeTrainingExpiryReport', 'Employee Training Expiry Report', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(42, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_overallSalesSummary', 'Overall Sales Summary', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(43, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'project_projectCostingSummary', 'Project Costing Summary Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(44, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectQuote', 'Project Quote Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(45, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectMaterialsUsed', 'Project Materials Used Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(46, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectPurchaseOrder', 'Project Purchase Order Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(47, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectWorkOrder', 'Project Work Order Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(48, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectClaim', 'Project Claim Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectMaterialTransferred', 'Project Materials Transferred Tab', '2021-01-11 21:02:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectFinance', 'Project Finance Tab', '2021-01-15 17:10:25', 0, 0, '2022-08-09 14:41:19', 'widget'),
(51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectDeliveryOrder', 'Project Delivery Order Tab', '2021-01-15 17:10:25', 0, 0, '2022-08-09 14:41:19', 'widget'),
(65, 1, 1, 0, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_expense', 'Accounts', '2022-07-23 16:08:16', 0, 0, '2022-08-09 14:41:19', 'module'),
(53, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_opportunityCostingSummary', 'Opportunity Costing Summary Tab', '2021-01-29 13:25:55', 0, 0, '2022-08-09 14:41:19', 'widget'),
(54, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_invoiceChartByMonth', 'Invoice Chart By Month', '2021-02-06 18:11:03', 0, 0, '2022-08-09 14:41:19', 'widget'),
(55, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_tenderSummary', 'Tender Summary Widget', '2021-02-06 18:11:03', 0, 0, '2022-08-09 14:41:19', 'widget'),
(56, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_taskFromAdmin', 'Task From Admin', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(57, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_dashboardTopPanel', 'Dashboard Top Panel', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(58, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_projectDuctDelivery', 'Project Duct Delivery Tab', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(59, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_passportExpiry', 'Passport Expiry in Dashboard', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(60, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_workpermitExpiry', 'Work Permit Expiry in Dashboard', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(61, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_employeeSummary', 'Employee Summary in Dashboard', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(62, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'payroll_sDLReport', 'SDL Report', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(63, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_materialRequestedList', 'Material Requested List', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(64, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_materialDelivered', 'Material Delivered', '2022-01-17 22:16:06', 0, 0, '2022-08-09 14:41:19', 'widget'),
(66, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, 0, 'payroll_expenseHead', 'Expense Head', '2022-07-23 16:08:16', 0, 0, '2022-08-09 14:41:19', 'module'),
(68, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enggCrm_purchaseReport', 'Purchase GST Report', '2022-08-09 14:41:19', 0, 0, NULL, 'widget');

-- --------------------------------------------------------

--
-- Table structure for table `mod_acc_room_user_group`
--

CREATE TABLE `mod_acc_room_user_group` (
  `room_user_group_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `list` int(1) DEFAULT NULL,
  `detail` int(1) DEFAULT NULL,
  `new` int(1) DEFAULT NULL,
  `edit` int(1) DEFAULT NULL,
  `delete` int(1) DEFAULT NULL,
  `duplicate` int(1) DEFAULT NULL,
  `print` int(1) DEFAULT NULL,
  `publish` int(1) DEFAULT NULL,
  `unpublish` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `user_group_id` int(11) DEFAULT NULL,
  `room_title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `import` tinyint(4) NOT NULL DEFAULT '0',
  `export` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mod_acc_room_user_group`
--

INSERT INTO `mod_acc_room_user_group` (`room_user_group_id`, `room_id`, `list`, `detail`, `new`, `edit`, `delete`, `duplicate`, `print`, `publish`, `unpublish`, `creation_date`, `user_group_id`, `room_title`, `modification_date`, `import`, `export`) VALUES
(1, 1, 1, 1, 0, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(2, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(3, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(4, 2, 1, 0, 0, 0, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(5, 2, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(6, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(7, 3, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 1),
(8, 3, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(9, 3, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(10, 4, 1, 1, 0, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(11, 4, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(12, 4, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(13, 5, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(14, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(15, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(16, 6, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(17, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(18, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(19, 7, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 1),
(20, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(21, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(22, 8, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 1, 1),
(23, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(24, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(25, 9, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(26, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(27, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(28, 10, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(29, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(30, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(31, 11, 1, 1, 0, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(32, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(33, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(34, 12, 1, 1, 0, 0, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(35, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(36, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(37, 13, 1, 1, 0, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 1, 1),
(38, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(39, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(40, 14, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 1, 1),
(41, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(42, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(43, 15, 1, 1, 0, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(44, 15, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(45, 15, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(46, 16, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(47, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(48, 16, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(49, 17, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(50, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(51, 17, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(52, 18, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(53, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(54, 18, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(55, 19, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 1, 0),
(56, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(57, 19, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(58, 20, 1, 1, 1, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(59, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(60, 20, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(61, 21, 1, 1, 0, 1, 0, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 1, 0),
(62, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(63, 21, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(64, 22, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(65, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(66, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(67, 23, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(68, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(69, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(70, 24, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(71, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(72, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(73, 25, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(74, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(75, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(601, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(600, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(599, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(79, 27, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(80, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(81, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(82, 28, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(83, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(84, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(85, 29, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(86, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(87, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(88, 30, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(89, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(90, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(91, 31, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(92, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(93, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(94, 32, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(95, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(96, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(97, 33, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(98, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(99, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(100, 34, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(101, 34, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(102, 34, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(103, 35, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(104, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(105, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(106, 36, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(107, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(108, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(109, 37, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(110, 37, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(111, 37, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(112, 38, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(113, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(114, 38, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(115, 39, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(116, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(117, 39, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(118, 40, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(119, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(120, 40, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(121, 41, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(122, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(123, 41, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(124, 42, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(125, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(126, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(127, 43, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(128, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(129, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(130, 44, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(131, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(132, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(133, 45, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(134, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(135, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(136, 46, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(137, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(138, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(139, 47, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(140, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(141, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(142, 48, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(143, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(144, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(145, 49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11 21:02:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(146, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(147, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-11 21:02:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(148, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(149, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(150, 3, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(151, 4, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(152, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(153, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(154, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(155, 8, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(156, 9, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(157, 10, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(158, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(159, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(160, 13, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(161, 14, 1, 1, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(162, 15, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(163, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(164, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(165, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(166, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(167, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(168, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(169, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(170, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(171, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(172, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(598, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(174, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(175, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(176, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(177, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(178, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(179, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(180, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(181, 34, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(182, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(183, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(184, 37, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(185, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(186, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(187, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(188, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(189, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(190, 43, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(191, 44, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(192, 45, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(193, 46, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(194, 47, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(195, 48, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(196, 49, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:15:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(197, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(198, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(199, 3, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(200, 4, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(201, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(202, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(203, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(204, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(205, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(206, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(207, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(208, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(209, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(210, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(211, 15, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(212, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(213, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(214, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(215, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(216, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(217, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(218, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(219, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(220, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(221, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(597, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(223, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(224, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(225, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(226, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(227, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(228, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(229, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(230, 34, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(231, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(232, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(233, 37, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(234, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(235, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(236, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(237, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(238, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(239, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(240, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(241, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(242, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(243, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(244, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(245, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:19:14', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(246, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(247, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(248, 3, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(249, 4, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(250, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(251, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(252, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(253, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(254, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(255, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(256, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(257, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(258, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(259, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(260, 15, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(261, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(262, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(263, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(264, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(265, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(266, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(267, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(268, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(269, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(270, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(596, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(272, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(273, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(274, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(275, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(276, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(277, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(278, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(279, 34, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(280, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(281, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(282, 37, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(283, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(284, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(285, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(286, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(287, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(288, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(289, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(290, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(291, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(292, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(293, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(294, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:21:46', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(295, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(296, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(297, 3, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(298, 4, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(299, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(300, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(301, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(302, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(303, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(304, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(305, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(306, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(307, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(308, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(309, 15, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(310, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(311, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(312, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(313, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(314, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(315, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(316, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(317, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(318, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(319, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(321, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(322, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(323, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(324, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(325, 31, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(326, 32, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(327, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(328, 34, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(329, 35, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(330, 36, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(331, 37, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(332, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(333, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(334, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(335, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(336, 42, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(337, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(338, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(339, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(340, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(341, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(342, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(343, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 10:23:33', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(344, 1, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(345, 2, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(346, 3, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(347, 4, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(348, 5, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(349, 6, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(350, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(351, 8, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(352, 9, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(353, 10, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(354, 11, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(355, 12, 1, 1, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(356, 13, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(357, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(358, 15, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(359, 16, 1, 0, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(360, 17, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(361, 18, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(362, 19, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(363, 20, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(364, 21, 1, 1, 0, 1, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(365, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(366, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(367, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(368, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(595, 67, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2022-08-02 15:57:49', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(370, 27, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(371, 28, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(372, 29, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(373, 30, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(374, 31, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(375, 32, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(376, 33, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(377, 34, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(378, 35, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(379, 36, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(380, 37, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(381, 38, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(382, 39, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(383, 40, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(384, 41, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(385, 42, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(386, 43, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(387, 44, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(388, 45, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(389, 46, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(390, 47, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(391, 48, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(392, 49, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-13 18:14:52', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(393, 50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(394, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(395, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(396, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(397, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(398, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(399, 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(400, 50, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-15 17:10:26', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(401, 51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(402, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(403, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(404, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(405, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(406, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(407, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-15 17:10:26', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(408, 51, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-15 17:10:26', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(409, 1, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(410, 2, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(411, 3, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(412, 4, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(413, 5, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(414, 6, 1, 1, 1, 1, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(415, 7, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(416, 8, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(417, 9, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(418, 10, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(419, 11, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(420, 12, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(421, 13, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(422, 14, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(423, 15, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(424, 16, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(425, 17, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(426, 18, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(427, 19, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(428, 20, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(429, 21, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(430, 22, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(431, 23, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(432, 24, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(433, 25, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(435, 27, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(436, 28, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(437, 29, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(438, 30, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(439, 31, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(440, 32, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(441, 33, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(442, 34, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(443, 35, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(444, 36, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(445, 37, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(446, 38, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(447, 39, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(448, 40, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(449, 41, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(450, 42, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(451, 43, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(452, 44, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(453, 45, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(454, 46, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(455, 47, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(456, 48, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(457, 49, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(458, 50, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(459, 51, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-16 19:19:36', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(584, 65, 1, 1, 0, 1, 1, NULL, NULL, 0, 0, '2022-07-23 16:08:17', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(583, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(582, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(581, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(580, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(579, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(578, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(577, 65, 1, 1, 0, 1, 1, NULL, 0, 0, 0, '2022-07-23 16:08:17', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(469, 53, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(470, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(471, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(472, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(473, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(474, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(475, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(476, 53, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-01-29 13:25:55', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(477, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-29 13:25:55', 9, NULL, '2022-08-09 14:41:19', 0, 0);
INSERT INTO `mod_acc_room_user_group` (`room_user_group_id`, `room_id`, `list`, `detail`, `new`, `edit`, `delete`, `duplicate`, `print`, `publish`, `unpublish`, `creation_date`, `user_group_id`, `room_title`, `modification_date`, `import`, `export`) VALUES
(478, 54, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(479, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(480, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(481, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(482, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(483, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(484, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(485, 54, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-02-06 18:11:04', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(486, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(487, 55, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(488, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(489, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(490, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(491, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(492, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(493, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(494, 55, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2021-02-06 18:11:04', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(495, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-02-06 18:11:04', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(496, 56, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(497, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(498, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(499, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(500, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(501, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(502, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(503, 56, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(504, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(505, 57, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(506, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(507, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(508, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(509, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(510, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(511, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(512, 57, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(513, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(514, 58, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(515, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(516, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(517, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(518, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(519, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(520, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(521, 58, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(522, 58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(523, 59, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(524, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(525, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(526, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(527, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(528, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(529, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(530, 59, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(531, 59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(532, 60, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(533, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(534, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(535, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(536, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(537, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(538, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(539, 60, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(540, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(541, 61, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(542, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(543, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(544, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(545, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(546, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(547, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(548, 61, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(549, 61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(550, 62, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(551, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(552, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(553, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(554, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(555, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(556, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(557, 62, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(558, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(559, 63, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(560, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(561, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(562, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(563, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(564, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(565, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(566, 63, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:06', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(567, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(568, 64, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(569, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(570, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(571, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(572, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(573, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(574, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:06', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(575, 64, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-01-17 22:16:07', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(576, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-17 22:16:07', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(585, 65, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(586, 66, 1, 1, 1, 1, 1, NULL, 0, 0, 0, '2022-07-23 16:08:17', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(587, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(588, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(589, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(590, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(591, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(592, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(593, 66, 1, 1, 1, 1, 1, NULL, NULL, 0, 0, '2022-07-23 16:08:17', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(594, 66, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-23 16:08:17', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(602, 67, 0, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-08-02 15:57:49', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(603, 67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-02 15:57:49', 9, NULL, '2022-08-09 14:41:19', 0, 0),
(604, 68, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 1, NULL, '2022-08-09 14:41:19', 0, 0),
(605, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 2, NULL, '2022-08-09 14:41:19', 0, 0),
(606, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 3, NULL, '2022-08-09 14:41:19', 0, 0),
(607, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 4, NULL, '2022-08-09 14:41:19', 0, 0),
(608, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 5, NULL, '2022-08-09 14:41:19', 0, 0),
(609, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 6, NULL, '2022-08-09 14:41:19', 0, 0),
(610, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 7, NULL, '2022-08-09 14:41:19', 0, 0),
(611, 68, 1, 0, 0, 0, 0, NULL, NULL, 0, 0, '2022-08-09 14:41:19', 8, NULL, '2022-08-10 20:16:31', 0, 0),
(612, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-09 14:41:19', 9, NULL, '2022-08-09 14:41:19', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `mod_acc_user_group_other_action`
--

CREATE TABLE `mod_acc_user_group_other_action` (
  `user_group_other_action_id` int(11) NOT NULL,
  `other_action_id` int(11) DEFAULT NULL,
  `user_group_id` int(11) DEFAULT NULL,
  `has_access` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nationality`
--

CREATE TABLE `nationality` (
  `nationality_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `nationality_code` varchar(10) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `created_by` varchar(50) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nationality`
--

INSERT INTO `nationality` (`nationality_id`, `title`, `nationality_code`, `flag`, `created_by`, `modified_by`, `creation_date`, `modification_date`) VALUES
(1, 'AFGHAN', '351', 0, NULL, NULL, NULL, NULL),
(2, 'ALBANIAN', '201', 0, NULL, NULL, NULL, NULL),
(3, 'ALGERIAN', '401', 0, NULL, NULL, NULL, NULL),
(4, 'AMERICAN', '503', 0, NULL, NULL, NULL, NULL),
(5, 'AMERICAN SAMOA', '721', 0, NULL, NULL, NULL, NULL),
(6, 'ANDORRAN', '153', 0, NULL, NULL, NULL, NULL),
(7, 'ANGOLAN', '451', 0, NULL, NULL, NULL, NULL),
(8, 'ANGUILLA', '670', 0, NULL, NULL, NULL, NULL),
(9, 'ANTARCTICA', '673', 0, NULL, NULL, NULL, NULL),
(10, 'ANTIGUA', '641', 0, NULL, NULL, NULL, NULL),
(11, 'ARGENTINIAN', '601', 0, NULL, NULL, NULL, NULL),
(12, 'ARMENIAN', '217', 0, NULL, NULL, NULL, NULL),
(13, 'ARUBA', '625', 0, NULL, NULL, NULL, NULL),
(14, 'AUSTRALIAN', '701', 0, NULL, NULL, NULL, NULL),
(15, 'AUSTRIAN', '131', 0, NULL, NULL, NULL, NULL),
(16, 'AZERBAIJANI', '218', 0, NULL, NULL, NULL, NULL),
(17, 'BAHAMAS', '642', 0, NULL, NULL, NULL, NULL),
(18, 'BAHRAINI', '371', 0, NULL, NULL, NULL, NULL),
(19, 'BANGLADESHI', '352', 0, NULL, NULL, NULL, NULL),
(20, 'BARBADOS', '643', 0, NULL, NULL, NULL, NULL),
(21, 'BELARUSSIAN', '211', 0, NULL, NULL, NULL, NULL),
(22, 'BELGIAN', '101', 0, NULL, NULL, NULL, NULL),
(23, 'BELIZE', '644', 0, NULL, NULL, NULL, NULL),
(24, 'BENIN', '452', 0, NULL, NULL, NULL, NULL),
(25, 'BERMUDAN', '645', 0, NULL, NULL, NULL, NULL),
(26, 'BHUTAN', '353', 0, NULL, NULL, NULL, NULL),
(27, 'BOLIVIAN', '646', 0, NULL, NULL, NULL, NULL),
(28, 'BOSNIAN', '994', 0, NULL, NULL, NULL, NULL),
(29, 'BOTSWANA', '453', 0, NULL, NULL, NULL, NULL),
(30, 'BOUVET ISLAND', '139', 0, NULL, NULL, NULL, NULL),
(31, 'BR NAT. OVERSEAS', '738', 0, NULL, NULL, NULL, NULL),
(32, 'BR OVERSEAS CIT.', '995', 0, NULL, NULL, NULL, NULL),
(33, 'BR PROTECTED PERS.', '996', 0, NULL, NULL, NULL, NULL),
(34, 'BRAZILIAN', '602', 0, NULL, NULL, NULL, NULL),
(35, 'BRITISH', '110', 0, NULL, NULL, NULL, NULL),
(36, 'BRITISH DEPENDENT TERR CITIZEN', '675', 0, NULL, NULL, NULL, NULL),
(37, 'BRITISH INDIAN OCEAN', '708', 0, NULL, NULL, NULL, NULL),
(38, 'BRITISH SUBJECT', '886', 0, NULL, NULL, NULL, NULL),
(39, 'BRITISH VIRGIN ISLND', '671', 0, NULL, NULL, NULL, NULL),
(40, 'BRUNEIAN', '302', 0, NULL, NULL, NULL, NULL),
(41, 'BULGARIAN', '202', 0, NULL, NULL, NULL, NULL),
(42, 'BURKINA FASO', '454', 0, NULL, NULL, NULL, NULL),
(43, 'BURUNDI', '455', 0, NULL, NULL, NULL, NULL),
(44, 'CAMBODIAN', '312', 0, NULL, NULL, NULL, NULL),
(45, 'CAMEROON', '456', 0, NULL, NULL, NULL, NULL),
(46, 'CANADIAN', '501', 0, NULL, NULL, NULL, NULL),
(47, 'CAPE VERDE', '457', 0, NULL, NULL, NULL, NULL),
(48, 'CAYMANESE', '647', 0, NULL, NULL, NULL, NULL),
(49, 'CENTRAL AFRICAN REP', '458', 0, NULL, NULL, NULL, NULL),
(50, 'CHADIAN', '459', 0, NULL, NULL, NULL, NULL),
(51, 'CHILEAN', '603', 0, NULL, NULL, NULL, NULL),
(52, 'CHINESE', '336', 0, NULL, NULL, NULL, NULL),
(53, 'CHRISTMAS ISLANDS', '709', 0, NULL, NULL, NULL, NULL),
(54, 'COCOS KEELING ISLAND', '710', 0, NULL, NULL, NULL, NULL),
(55, 'COLOMBIAN', '604', 0, NULL, NULL, NULL, NULL),
(56, 'COMOROS', '460', 0, NULL, NULL, NULL, NULL),
(57, 'CONGO', '461', 0, NULL, NULL, NULL, NULL),
(58, 'COOK ISLANDS', '722', 0, NULL, NULL, NULL, NULL),
(59, 'COSTA RICAN', '648', 0, NULL, NULL, NULL, NULL),
(60, 'CROATIAN', '232', 0, NULL, NULL, NULL, NULL),
(61, 'CUBAN', '621', 0, NULL, NULL, NULL, NULL),
(62, 'CYPRIOT', '372', 0, NULL, NULL, NULL, NULL),
(63, 'CZECH', '234', 0, NULL, NULL, NULL, NULL),
(64, 'CZECHOSLOVAK', '203', 0, NULL, NULL, NULL, NULL),
(65, 'DANISH', '102', 0, NULL, NULL, NULL, NULL),
(66, 'DEMOCRATIC REP OF THE CONGO', '674', 0, NULL, NULL, NULL, NULL),
(67, 'DJIBOUTI', '407', 0, NULL, NULL, NULL, NULL),
(68, 'DOMINICA', '649', 0, NULL, NULL, NULL, NULL),
(69, 'DOMINICAN REPUBLIC', '622', 0, NULL, NULL, NULL, NULL),
(70, 'DUTCH', '991', 0, NULL, NULL, NULL, NULL),
(71, 'EAST TIMORESE', '887', 0, NULL, NULL, NULL, NULL),
(72, 'ECUADORIAN', '605', 0, NULL, NULL, NULL, NULL),
(73, 'EGYPTIAN', '402', 0, NULL, NULL, NULL, NULL),
(74, 'EQUATORIAL GUINEA', '462', 0, NULL, NULL, NULL, NULL),
(75, 'ERITREA', '410', 0, NULL, NULL, NULL, NULL),
(76, 'ESTONIAN', '213', 0, NULL, NULL, NULL, NULL),
(77, 'ETHIOPIAN', '408', 0, NULL, NULL, NULL, NULL),
(78, 'FAEROE ISLANDS', '141', 0, NULL, NULL, NULL, NULL),
(79, 'FALKLAND IS', '651', 0, NULL, NULL, NULL, NULL),
(80, 'FIJIAN', '702', 0, NULL, NULL, NULL, NULL),
(81, 'FILIPINO', '305', 0, NULL, NULL, NULL, NULL),
(82, 'FINNISH', '132', 0, NULL, NULL, NULL, NULL),
(83, 'FRENCH', '103', 0, NULL, NULL, NULL, NULL),
(84, 'FRENCH GUIANA', '652', 0, NULL, NULL, NULL, NULL),
(85, 'FRENCH POLYNESIA', '723', 0, NULL, NULL, NULL, NULL),
(86, 'FRENCH SOUTHERN TERR', '711', 0, NULL, NULL, NULL, NULL),
(87, 'GABON', '463', 0, NULL, NULL, NULL, NULL),
(88, 'GAMBIAN', '464', 0, NULL, NULL, NULL, NULL),
(89, 'GEORGIA', '216', 0, NULL, NULL, NULL, NULL),
(90, 'GERMAN', '104', 0, NULL, NULL, NULL, NULL),
(91, 'GHANAIAN', '421', 0, NULL, NULL, NULL, NULL),
(92, 'GIBRALTAR', '154', 0, NULL, NULL, NULL, NULL),
(93, 'GREEK', '105', 0, NULL, NULL, NULL, NULL),
(94, 'GREENLAND', '142', 0, NULL, NULL, NULL, NULL),
(95, 'GRENADIAN', '653', 0, NULL, NULL, NULL, NULL),
(96, 'GUADELOUPE', '654', 0, NULL, NULL, NULL, NULL),
(97, 'GUAM', '724', 0, NULL, NULL, NULL, NULL),
(98, 'GUATEMALA', '655', 0, NULL, NULL, NULL, NULL),
(99, 'GUINEA', '465', 0, NULL, NULL, NULL, NULL),
(100, 'GUINES BISSAU', '466', 0, NULL, NULL, NULL, NULL),
(101, 'GUYANA', '656', 0, NULL, NULL, NULL, NULL),
(102, 'HAITIAN', '657', 0, NULL, NULL, NULL, NULL),
(103, 'HEARD MCDONALD ISLND', '712', 0, NULL, NULL, NULL, NULL),
(104, 'HONDURAN', '658', 0, NULL, NULL, NULL, NULL),
(105, 'HONG KONG', '332', 0, NULL, NULL, NULL, NULL),
(106, 'HUNGARIAN', '205', 0, NULL, NULL, NULL, NULL),
(107, 'ICELAND', '133', 0, NULL, NULL, NULL, NULL),
(108, 'INDIAN', '354', 0, NULL, NULL, NULL, NULL),
(109, 'INDONESIAN', '303', 0, NULL, NULL, NULL, NULL),
(110, 'IRANIAN', '373', 0, NULL, NULL, NULL, NULL),
(111, 'IRAQI', '374', 0, NULL, NULL, NULL, NULL),
(112, 'IRISH', '106', 0, NULL, NULL, NULL, NULL),
(113, 'ISLE OF MAN', '672', 0, NULL, NULL, NULL, NULL),
(114, 'ISRAELI', '375', 0, NULL, NULL, NULL, NULL),
(115, 'ITALIAN', '107', 0, NULL, NULL, NULL, NULL),
(116, 'IVORY COAST', '422', 0, NULL, NULL, NULL, NULL),
(117, 'JAMAICAN', '659', 0, NULL, NULL, NULL, NULL),
(118, 'JAPANESE', '331', 0, NULL, NULL, NULL, NULL),
(119, 'JORDANIAN', '376', 0, NULL, NULL, NULL, NULL),
(120, 'KAMPUCHEAN', '676', 0, NULL, NULL, NULL, NULL),
(121, 'KAZAKH', '221', 0, NULL, NULL, NULL, NULL),
(122, 'KENYAN', '423', 0, NULL, NULL, NULL, NULL),
(123, 'KIRGHIZ', '219', 0, NULL, NULL, NULL, NULL),
(124, 'KIRIBATI', '725', 0, NULL, NULL, NULL, NULL),
(125, 'KOREAN, NORTH', '337', 0, NULL, NULL, NULL, NULL),
(126, 'KOREAN, SOUTH', '333', 0, NULL, NULL, NULL, NULL),
(127, 'KOSOVAR', '677', 0, NULL, NULL, NULL, NULL),
(128, 'KUWAITI', '377', 0, NULL, NULL, NULL, NULL),
(129, 'KYRGHIS', '990', 0, NULL, NULL, NULL, NULL),
(130, 'KYRGYZSTAN', '894', 0, NULL, NULL, NULL, NULL),
(131, 'LAOTIAN', '313', 0, NULL, NULL, NULL, NULL),
(132, 'LATVIAN', '214', 0, NULL, NULL, NULL, NULL),
(133, 'LEBANESE', '378', 0, NULL, NULL, NULL, NULL),
(134, 'LESOTHO', '467', 0, NULL, NULL, NULL, NULL),
(135, 'LIBERIAN', '424', 0, NULL, NULL, NULL, NULL),
(136, 'LIBYAN', '403', 0, NULL, NULL, NULL, NULL),
(137, 'LIECHTENSTEIN', '138', 0, NULL, NULL, NULL, NULL),
(138, 'LITHUANIA', '215', 0, NULL, NULL, NULL, NULL),
(139, 'LUXEMBOURG', '108', 0, NULL, NULL, NULL, NULL),
(140, 'MACAO', '335', 0, NULL, NULL, NULL, NULL),
(141, 'MACEDONIA', '210', 0, NULL, NULL, NULL, NULL),
(142, 'MADAGASCAR', '425', 0, NULL, NULL, NULL, NULL),
(143, 'MALAWI', '468', 0, NULL, NULL, NULL, NULL),
(144, 'MALAYSIAN', '304', 0, NULL, NULL, NULL, NULL),
(145, 'MALDIVIAN', '355', 0, NULL, NULL, NULL, NULL),
(146, 'MALI', '469', 0, NULL, NULL, NULL, NULL),
(147, 'MALTESE', '155', 0, NULL, NULL, NULL, NULL),
(148, 'MARSHELLES', '735', 0, NULL, NULL, NULL, NULL),
(149, 'MARTINIQUE', '661', 0, NULL, NULL, NULL, NULL),
(150, 'MAURITANEAN', '470', 0, NULL, NULL, NULL, NULL),
(151, 'MAURITIAN', '426', 0, NULL, NULL, NULL, NULL),
(152, 'MEXICAN', '606', 0, NULL, NULL, NULL, NULL),
(153, 'MICRONESIAN', '736', 0, NULL, NULL, NULL, NULL),
(154, 'MOLDOVIAN', '222', 0, NULL, NULL, NULL, NULL),
(155, 'MONACO', '143', 0, NULL, NULL, NULL, NULL),
(156, 'MONGOLIAN', '338', 0, NULL, NULL, NULL, NULL),
(157, 'MONTENEGRIN', '678', 0, NULL, NULL, NULL, NULL),
(158, 'MONTSERRAT', '662', 0, NULL, NULL, NULL, NULL),
(159, 'MOROCCAN', '404', 0, NULL, NULL, NULL, NULL),
(160, 'MOZAMBIQUE', '427', 0, NULL, NULL, NULL, NULL),
(161, 'MYANMAR', '311', 0, NULL, NULL, NULL, NULL),
(162, 'NAMIBIA', '471', 0, NULL, NULL, NULL, NULL),
(163, 'NAURUAN', '703', 0, NULL, NULL, NULL, NULL),
(164, 'NEPALESE', '356', 0, NULL, NULL, NULL, NULL),
(165, 'NETHERLANDS', '109', 0, NULL, NULL, NULL, NULL),
(166, 'NETHERLANDS ANTIL.', '623', 0, NULL, NULL, NULL, NULL),
(167, 'NEW CALEDONIA', '704', 0, NULL, NULL, NULL, NULL),
(168, 'NEW ZEALANDER', '705', 0, NULL, NULL, NULL, NULL),
(169, 'NICARAGUAN', '660', 0, NULL, NULL, NULL, NULL),
(170, 'NIGER', '472', 0, NULL, NULL, NULL, NULL),
(171, 'NIGERIAN', '428', 0, NULL, NULL, NULL, NULL),
(172, 'NIUE ISLAND', '726', 0, NULL, NULL, NULL, NULL),
(173, 'NORFOLK ISLAND', '713', 0, NULL, NULL, NULL, NULL),
(174, 'NORTHERN MARIANA ISL', '734', 0, NULL, NULL, NULL, NULL),
(175, 'NORWEGIAN', '134', 0, NULL, NULL, NULL, NULL),
(176, 'OC CTRL STH AMERICA', '699', 0, NULL, NULL, NULL, NULL),
(177, 'OC IN OTHER AFRICA', '499', 0, NULL, NULL, NULL, NULL),
(178, 'OC IN S E ASIA', '319', 0, NULL, NULL, NULL, NULL),
(179, 'OC NORTH AMERICA', '509', 0, NULL, NULL, NULL, NULL),
(180, 'OC OCEANIA', '799', 0, NULL, NULL, NULL, NULL),
(181, 'OMAN', '379', 0, NULL, NULL, NULL, NULL),
(182, 'OTHERS', '999', 0, NULL, NULL, NULL, NULL),
(183, 'PACIFIC IS TRUST T', '998', 0, NULL, NULL, NULL, NULL),
(184, 'PAKISTANI', '357', 0, NULL, NULL, NULL, NULL),
(185, 'PALAU', '737', 0, NULL, NULL, NULL, NULL),
(186, 'PALESTINIAN', '386', 0, NULL, NULL, NULL, NULL),
(187, 'PANAMANIAN', '624', 0, NULL, NULL, NULL, NULL),
(188, 'PAPUA NEW GUINEA', '706', 0, NULL, NULL, NULL, NULL),
(189, 'PARAGUAY', '607', 0, NULL, NULL, NULL, NULL),
(190, 'PERUVIAN', '608', 0, NULL, NULL, NULL, NULL),
(191, 'PITCAIRN', '727', 0, NULL, NULL, NULL, NULL),
(192, 'POLISH', '206', 0, NULL, NULL, NULL, NULL),
(193, 'PORTUGUESE', '111', 0, NULL, NULL, NULL, NULL),
(194, 'PUERTO RICAN', '502', 0, NULL, NULL, NULL, NULL),
(195, 'QATAR', '380', 0, NULL, NULL, NULL, NULL),
(196, 'REUNION', '429', 0, NULL, NULL, NULL, NULL),
(197, 'ROMANIAN', '207', 0, NULL, NULL, NULL, NULL),
(198, 'RUSSIAN', '223', 0, NULL, NULL, NULL, NULL),
(199, 'RWANDA', '473', 0, NULL, NULL, NULL, NULL),
(200, 'SAINT KITTS NEVIS', '663', 0, NULL, NULL, NULL, NULL),
(201, 'SALVADORAN', '650', 0, NULL, NULL, NULL, NULL),
(202, 'SAMOAN', '707', 0, NULL, NULL, NULL, NULL),
(203, 'SAN MARINO', '144', 0, NULL, NULL, NULL, NULL),
(204, 'SAO TOME PRINCI', '474', 0, NULL, NULL, NULL, NULL),
(205, 'SAUDI ARABIAN', '381', 0, NULL, NULL, NULL, NULL),
(206, 'SENEGALESE', '475', 0, NULL, NULL, NULL, NULL),
(207, 'SERBIAN', '679', 0, NULL, NULL, NULL, NULL),
(208, 'SEYCHELLES', '476', 0, NULL, NULL, NULL, NULL),
(209, 'SIERRA LEONE', '477', 0, NULL, NULL, NULL, NULL),
(210, 'SINGAPORE CITIZEN', '301', 0, NULL, NULL, NULL, NULL),
(211, 'SLOVAK', '235', 0, NULL, NULL, NULL, NULL),
(212, 'SLOVENIAN', '233', 0, NULL, NULL, NULL, NULL),
(213, 'SOLOMON ISLANDS', '728', 0, NULL, NULL, NULL, NULL),
(214, 'SOMALI', '409', 0, NULL, NULL, NULL, NULL),
(215, 'SOUTH AFRICAN', '478', 0, NULL, NULL, NULL, NULL),
(216, 'SPANISH', '112', 0, NULL, NULL, NULL, NULL),
(217, 'SRI LANKAN', '358', 0, NULL, NULL, NULL, NULL),
(218, 'ST HELENA', '484', 0, NULL, NULL, NULL, NULL),
(219, 'ST LUCIA', '664', 0, NULL, NULL, NULL, NULL),
(220, 'ST PIERRE MIQUELON', '505', 0, NULL, NULL, NULL, NULL),
(221, 'ST VINCENT', '665', 0, NULL, NULL, NULL, NULL),
(222, 'SUDANESE', '405', 0, NULL, NULL, NULL, NULL),
(223, 'SURINAME', '666', 0, NULL, NULL, NULL, NULL),
(224, 'SVALBARD JAN MAYEN', '135', 0, NULL, NULL, NULL, NULL),
(225, 'SWAZI', '480', 0, NULL, NULL, NULL, NULL),
(226, 'SWEDISH', '136', 0, NULL, NULL, NULL, NULL),
(227, 'SWISS', '137', 0, NULL, NULL, NULL, NULL),
(228, 'SYRIAN', '382', 0, NULL, NULL, NULL, NULL),
(229, 'TADZHIK', '224', 0, NULL, NULL, NULL, NULL),
(230, 'TAIWANESE', '334', 0, NULL, NULL, NULL, NULL),
(231, 'TAJIKISTANI', '992', 0, NULL, NULL, NULL, NULL),
(232, 'TANZANIAN', '430', 0, NULL, NULL, NULL, NULL),
(233, 'THAI', '306', 0, NULL, NULL, NULL, NULL),
(234, 'TIMORENSE', '307', 0, NULL, NULL, NULL, NULL),
(235, 'TOGO', '481', 0, NULL, NULL, NULL, NULL),
(236, 'TOKELAU ISLANDS', '729', 0, NULL, NULL, NULL, NULL),
(237, 'TONGA', '730', 0, NULL, NULL, NULL, NULL),
(238, 'TRINIDAD AND TOBAGO', '667', 0, NULL, NULL, NULL, NULL),
(239, 'TUNISIA', '406', 0, NULL, NULL, NULL, NULL),
(240, 'TURK', '152', 0, NULL, NULL, NULL, NULL),
(241, 'TURKMEN', '225', 0, NULL, NULL, NULL, NULL),
(242, 'TURKS AND CAICOS IS', '668', 0, NULL, NULL, NULL, NULL),
(243, 'TUVALU', '731', 0, NULL, NULL, NULL, NULL),
(244, 'U S MINOR ISLANDS', '504', 0, NULL, NULL, NULL, NULL),
(245, 'UGANDIAN', '431', 0, NULL, NULL, NULL, NULL),
(246, 'UKRAINIAN', '212', 0, NULL, NULL, NULL, NULL),
(247, 'UNITED ARAB EM.', '383', 0, NULL, NULL, NULL, NULL),
(248, 'UNKNOWN', '889', 0, NULL, NULL, NULL, NULL),
(249, 'UPPER VOLTA', '993', 0, NULL, NULL, NULL, NULL),
(250, 'URUGUAY', '609', 0, NULL, NULL, NULL, NULL),
(251, 'UZBEK', '226', 0, NULL, NULL, NULL, NULL),
(252, 'VANUATU', '732', 0, NULL, NULL, NULL, NULL),
(253, 'VATICAN CITY STATE', '145', 0, NULL, NULL, NULL, NULL),
(254, 'VENEZUELAN', '610', 0, NULL, NULL, NULL, NULL),
(255, 'VIETNAMESE', '314', 0, NULL, NULL, NULL, NULL),
(256, 'VIRGIN ISLANDS US', '669', 0, NULL, NULL, NULL, NULL),
(257, 'WALLIS AND FUTUNA', '733', 0, NULL, NULL, NULL, NULL),
(258, 'WESTERN SAHARA', '479', 0, NULL, NULL, NULL, NULL),
(259, 'YEMEN ARAB REP', '388', 0, NULL, NULL, NULL, NULL),
(260, 'YEMEN, SOUTH', '387', 0, NULL, NULL, NULL, NULL),
(261, 'YEMENI', '384', 0, NULL, NULL, NULL, NULL),
(262, 'YUGOSLAV', '209', 0, NULL, NULL, NULL, NULL),
(263, 'ZAIRAN', '482', 0, NULL, NULL, NULL, NULL),
(264, 'ZAMBIAN', '432', 0, NULL, NULL, NULL, NULL),
(265, 'ZIMBABWEAN', '483', 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `opportunity`
--

CREATE TABLE `opportunity` (
  `opportunity_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `published` int(1) DEFAULT NULL,
  `member_only` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `content_date` date DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `enquiry_date` date DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `estimated_start_date` date DEFAULT NULL,
  `estimated_value` decimal(10,2) DEFAULT NULL,
  `chance` varchar(10) DEFAULT NULL,
  `notes` text,
  `opportunity_code` varchar(10) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `project_manager_id` int(11) DEFAULT NULL,
  `opportunity_cost` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `quote_ref` varchar(20) DEFAULT NULL,
  `other_cost` int(11) DEFAULT NULL,
  `follow_up_needed` int(11) DEFAULT NULL,
  `difficulty` varchar(11) DEFAULT NULL,
  `client_type` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `confirmed_quote_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `estimated_value_base` int(11) DEFAULT NULL,
  `referrer_contact_id` int(11) DEFAULT NULL,
  `source_channel` varchar(255) DEFAULT NULL,
  `rating_1` varchar(100) DEFAULT NULL,
  `rating_2` varchar(100) DEFAULT NULL,
  `rating_3` varchar(100) DEFAULT NULL,
  `rating_4` varchar(100) DEFAULT NULL,
  `call_registry_id` int(11) DEFAULT NULL,
  `office_ref_no` varchar(150) DEFAULT NULL,
  `itq_ref_no` varchar(150) DEFAULT NULL,
  `mode_of_submission` varchar(150) DEFAULT NULL,
  `services` varchar(150) DEFAULT NULL,
  `site_show_date` date DEFAULT NULL,
  `site_show_time` time DEFAULT NULL,
  `site_show_attendee` int(11) DEFAULT NULL,
  `actual_closing` date DEFAULT NULL,
  `actual_submission_date` date DEFAULT NULL,
  `pricing_done_by_acmv` int(11) DEFAULT NULL,
  `pricing_done_by_elec` int(11) DEFAULT NULL,
  `me_consultants` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `actual_closing_time` time DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `project_end_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `opportunity`
--

INSERT INTO `opportunity` (`opportunity_id`, `section_id`, `category_id`, `sub_category_id`, `title`, `description`, `published`, `member_only`, `creation_date`, `modification_date`, `content_date`, `external_link`, `service_id`, `contact_id`, `task_id`, `enquiry_date`, `follow_up_date`, `estimated_start_date`, `estimated_value`, `chance`, `notes`, `opportunity_code`, `status`, `staff_id`, `company_id`, `project_manager_id`, `opportunity_cost`, `category`, `quote_ref`, `other_cost`, `follow_up_needed`, `difficulty`, `client_type`, `created_by`, `modified_by`, `flag`, `confirmed_quote_id`, `project_id`, `currency`, `branch_id`, `estimated_value_base`, `referrer_contact_id`, `source_channel`, `rating_1`, `rating_2`, `rating_3`, `rating_4`, `call_registry_id`, `office_ref_no`, `itq_ref_no`, `mode_of_submission`, `services`, `site_show_date`, `site_show_time`, `site_show_attendee`, `actual_closing`, `actual_submission_date`, `pricing_done_by_acmv`, `pricing_done_by_elec`, `me_consultants`, `email`, `price`, `actual_closing_time`, `employee_id`, `project_end_date`) VALUES
(1, NULL, NULL, NULL, 'Construction work', NULL, NULL, NULL, '2022-10-06 22:55:05', '2022-10-06 22:58:12', NULL, NULL, NULL, 1, NULL, '2022-10-06', NULL, NULL, NULL, NULL, NULL, 'O-1068', 'Awarded', NULL, 21, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, 0, NULL, 'SG$', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, 'test', NULL, NULL, NULL, '2022-10-07 15:00:25', NULL, NULL, NULL, NULL, NULL, NULL, '2022-10-07', NULL, NULL, NULL, NULL, NULL, 'O-1069', 'Awarded', NULL, 14, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, 0, NULL, 'SG$', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, 'BUILDING', NULL, NULL, NULL, '2022-10-07 15:01:24', '2022-10-18 18:39:02', NULL, NULL, NULL, 1, NULL, '2022-10-07', NULL, NULL, NULL, NULL, NULL, 'O-1070', 'Waiting for Approval', NULL, 21, NULL, NULL, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', 0, 0, NULL, 'SG$', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23', NULL, 'building', 'buiding', '2022-10-26', NULL, NULL, NULL, '2022-10-28', NULL, NULL, NULL, 'a@GMAIL.COM', '30000000.00', NULL, NULL, '2023-01-26'),
(4, NULL, NULL, NULL, 'New Check 18 10', NULL, NULL, NULL, '2022-10-18 18:38:48', '2022-10-18 18:43:52', NULL, NULL, NULL, 1, NULL, '2022-10-18', NULL, NULL, NULL, NULL, NULL, 'O-1071', 'Converted to Project', NULL, 21, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, 0, NULL, 'SG$', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1234', NULL, '', '', '2022-10-19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '0.00', NULL, NULL, NULL),
(5, NULL, NULL, NULL, 'mr', NULL, NULL, NULL, '2022-10-21 15:21:22', NULL, NULL, NULL, NULL, 1, NULL, '2022-10-21', NULL, NULL, NULL, NULL, NULL, 'O-1072', 'Enquiry', NULL, 21, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, 0, NULL, 'SG$', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `opportunity_costing_summary`
--

CREATE TABLE `opportunity_costing_summary` (
  `opportunity_costing_summary_id` int(11) NOT NULL,
  `po_code` varchar(100) DEFAULT NULL,
  `invoice_code` varchar(100) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `no_of_worker_used` varchar(100) DEFAULT NULL,
  `no_of_days_worked` varchar(100) DEFAULT NULL,
  `labour_rates_per_day` decimal(10,2) DEFAULT NULL,
  `po_price` decimal(10,2) DEFAULT NULL,
  `po_price_with_gst` decimal(10,2) DEFAULT NULL,
  `invoiced_price` decimal(10,2) DEFAULT NULL,
  `invoiced_price_with_gst` decimal(10,2) DEFAULT NULL,
  `profit_percentage` decimal(10,2) DEFAULT NULL,
  `profit` decimal(10,2) DEFAULT NULL,
  `total_material_price` decimal(10,2) DEFAULT NULL,
  `transport_charges` decimal(10,2) DEFAULT NULL,
  `total_labour_charges` decimal(10,2) DEFAULT NULL,
  `salesman_commission` decimal(10,2) DEFAULT NULL,
  `finance_charges` decimal(10,2) DEFAULT NULL,
  `office_overheads` decimal(10,2) DEFAULT NULL,
  `other_charges` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `total_cost` decimal(10,2) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `salesman_commission_percentage` decimal(10,2) DEFAULT NULL,
  `finance_charges_percentage` decimal(10,2) DEFAULT NULL,
  `office_overheads_percentage` decimal(10,2) DEFAULT NULL,
  `transport_charges_percentage` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `opportunity_costing_summary`
--

INSERT INTO `opportunity_costing_summary` (`opportunity_costing_summary_id`, `po_code`, `invoice_code`, `delivery_date`, `no_of_worker_used`, `no_of_days_worked`, `labour_rates_per_day`, `po_price`, `po_price_with_gst`, `invoiced_price`, `invoiced_price_with_gst`, `profit_percentage`, `profit`, `total_material_price`, `transport_charges`, `total_labour_charges`, `salesman_commission`, `finance_charges`, `office_overheads`, `other_charges`, `created_by`, `creation_date`, `modified_by`, `modification_date`, `total_cost`, `opportunity_id`, `salesman_commission_percentage`, `finance_charges_percentage`, `office_overheads_percentage`, `transport_charges_percentage`) VALUES
(1, '', '', NULL, '100', '100', '12.00', '50000.00', '53500.00', '50000.00', '53500.00', '-172.20', '-86100.00', '0.00', '100.00', '120000.00', '4000.00', '5000.00', '4000.00', '3000.00', 'Super Admin', '2022-10-06 22:56:28', NULL, NULL, '136100.00', 1, '0.00', '0.00', '0.00', '0.00'),
(2, '', '', NULL, '100', '100', '800.00', '30000000.00', '32100000.00', '30000000.00', '32100000.00', '72.98', '21895000.00', '0.00', '25000.00', '8000000.00', '10000.00', '50000.00', '15000.00', '5000.00', 'Super Admin', '2022-10-18 18:15:43', NULL, NULL, '8105000.00', 3, '0.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `opportunity_costing_summary_history`
--

CREATE TABLE `opportunity_costing_summary_history` (
  `opportunity_costing_summary_history_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `sub_con_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `sketch` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `opportunity_costing_summary_id` int(11) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `opportunity_employee`
--

CREATE TABLE `opportunity_employee` (
  `opportunity_employee_id` int(11) NOT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `category_type` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `active_in_project` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `opportunity_project_history`
--

CREATE TABLE `opportunity_project_history` (
  `opportunity_project_history_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `staff_ids` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `alert_status` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `emp_task_status` int(1) DEFAULT NULL,
  `staff_id_created` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `opportunity_staff`
--

CREATE TABLE `opportunity_staff` (
  `opportunity_staff_id` int(11) NOT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_status` varchar(25) DEFAULT NULL,
  `payment_method` varchar(25) DEFAULT NULL,
  `shipping_first_name` varchar(100) DEFAULT NULL,
  `shipping_last_name` varchar(100) DEFAULT NULL,
  `shipping_email` varchar(100) DEFAULT NULL,
  `shipping_address1` varchar(100) DEFAULT NULL,
  `shipping_address2` varchar(100) DEFAULT NULL,
  `shipping_address_city` varchar(100) DEFAULT NULL,
  `shipping_address_area` varchar(100) DEFAULT NULL,
  `shipping_address_state` varchar(100) DEFAULT NULL,
  `shipping_address_country_code` varchar(2) DEFAULT NULL,
  `shipping_address_po_code` varchar(15) DEFAULT NULL,
  `shipping_phone` varchar(25) DEFAULT NULL,
  `cust_first_name` varchar(100) DEFAULT NULL,
  `cust_last_name` varchar(100) DEFAULT NULL,
  `cust_email` varchar(100) DEFAULT NULL,
  `cust_address1` varchar(100) DEFAULT NULL,
  `cust_address2` varchar(100) DEFAULT NULL,
  `cust_address_city` varchar(100) DEFAULT NULL,
  `cust_address_area` varchar(100) DEFAULT NULL,
  `cust_address_state` varchar(100) DEFAULT NULL,
  `cust_address_country` varchar(100) DEFAULT NULL,
  `cust_address_po_code` varchar(15) DEFAULT NULL,
  `cust_phone` varchar(25) DEFAULT NULL,
  `memo` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `flag` tinyint(1) DEFAULT NULL,
  `record_type` varchar(25) NOT NULL DEFAULT 'Product',
  `module` varchar(50) DEFAULT NULL,
  `currency` char(3) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_code` varchar(15) DEFAULT NULL,
  `shipping_charge` float(10,2) DEFAULT '0.00',
  `quote_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `add_gst_to_total` tinyint(4) DEFAULT NULL,
  `invoice_terms` text,
  `notes` text,
  `shipping_address_country` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `delivery_to_text` varchar(255) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `name_of_company` varchar(100) DEFAULT NULL,
  `vat` int(1) DEFAULT NULL,
  `cust_company_name` varchar(100) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `manual_invoice` int(1) DEFAULT NULL,
  `apply_general_vat` int(1) DEFAULT NULL,
  `link_stock` int(1) DEFAULT NULL,
  `selling_company` varchar(50) DEFAULT NULL,
  `link_account` int(1) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `auto_create_invoice` tinyint(1) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_terms` text,
  `quote_title` varchar(255) DEFAULT NULL,
  `project_type` varchar(50) DEFAULT NULL,
  `cust_fax` varchar(25) DEFAULT NULL,
  `shipping_fax` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_status`, `payment_method`, `shipping_first_name`, `shipping_last_name`, `shipping_email`, `shipping_address1`, `shipping_address2`, `shipping_address_city`, `shipping_address_area`, `shipping_address_state`, `shipping_address_country_code`, `shipping_address_po_code`, `shipping_phone`, `cust_first_name`, `cust_last_name`, `cust_email`, `cust_address1`, `cust_address2`, `cust_address_city`, `cust_address_area`, `cust_address_state`, `cust_address_country`, `cust_address_po_code`, `cust_phone`, `memo`, `creation_date`, `modification_date`, `flag`, `record_type`, `module`, `currency`, `contact_id`, `order_date`, `order_code`, `shipping_charge`, `quote_id`, `company_id`, `add_gst_to_total`, `invoice_terms`, `notes`, `shipping_address_country`, `address_country`, `delivery_to_text`, `created_by`, `modified_by`, `discount`, `name_of_company`, `vat`, `cust_company_name`, `site_id`, `manual_invoice`, `apply_general_vat`, `link_stock`, `selling_company`, `link_account`, `project_id`, `start_date`, `end_date`, `auto_create_invoice`, `delivery_date`, `delivery_terms`, `quote_title`, `project_type`, `cust_fax`, `shipping_fax`) VALUES
(1, 'New', NULL, 'A M N CONSTRUCTION COMPANY PVT', NULL, '', '57, ram nager, tirunelveli town', 'tamil nadu', NULL, NULL, NULL, NULL, '627001', '0987654321', NULL, NULL, '', '57, ram nager, tirunelveli town', 'tamil nadu', NULL, NULL, NULL, 'IN', '627001', '0987654321', NULL, '2022-10-18 18:50:44', NULL, NULL, 'Project', NULL, NULL, 1, '2022-10-18', NULL, 0.00, 4, 21, NULL, NULL, NULL, 'IN', NULL, NULL, 'Super Admin', NULL, '0.00', NULL, NULL, 'A M N CONSTRUCTION COMPANY PVT', 0, NULL, NULL, NULL, NULL, NULL, 44, NULL, NULL, NULL, NULL, NULL, '', 'Project', '1234567890', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` int(10) NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `record_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `qty` decimal(10,2) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT '0.00',
  `item_title` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT '0.00',
  `discount_percentage` float(10,2) NOT NULL DEFAULT '0.00',
  `mark_up` varchar(155) DEFAULT NULL,
  `qty_for_invoice` int(10) NOT NULL DEFAULT '0',
  `mark_up_type` varchar(100) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `price_from_supplier` decimal(10,2) DEFAULT NULL,
  `ref_code` varchar(255) DEFAULT NULL,
  `discount_type` varchar(100) DEFAULT NULL,
  `vat` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `item_code_backup` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `description` text,
  `remarks` text,
  `month` int(4) DEFAULT NULL,
  `year` int(6) DEFAULT NULL,
  `ot_hourly_rate` float(10,2) DEFAULT NULL,
  `ph_hourly_rate` float(10,2) DEFAULT NULL,
  `employee_ot_hours` float(10,2) DEFAULT NULL,
  `employee_ph_hours` float(10,2) DEFAULT NULL,
  `part_no` varchar(255) DEFAULT NULL,
  `admin_charges` float(10,2) DEFAULT NULL,
  `transport_charges` float(10,2) DEFAULT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `drawing_number` varchar(255) DEFAULT NULL,
  `drawing_title` text,
  `drawing_revision` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`order_item_id`, `order_id`, `record_id`, `qty`, `unit_price`, `item_title`, `model`, `module`, `supplier_id`, `invoice_id`, `cost_price`, `discount_percentage`, `mark_up`, `qty_for_invoice`, `mark_up_type`, `item_code`, `price_from_supplier`, `ref_code`, `discount_type`, `vat`, `site_id`, `item_code_backup`, `unit`, `description`, `remarks`, `month`, `year`, `ot_hourly_rate`, `ph_hourly_rate`, `employee_ot_hours`, `employee_ph_hours`, `part_no`, `admin_charges`, `transport_charges`, `quote_id`, `drawing_number`, `drawing_title`, `drawing_revision`) VALUES
(1, 1, 8, '20.00', '1000.00', 'test item 1', NULL, NULL, NULL, NULL, '0.00', 0.00, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'kg', 'test desc 1', 'test', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 4, '', '', ''),
(2, 1, 9, '15.00', '600.00', '', NULL, NULL, NULL, NULL, '0.00', 0.00, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'pcs', 'test desc 2', 'test 1', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, 4, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `other_comp_emp`
--

CREATE TABLE `other_comp_emp` (
  `other_comp_emp_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `hrs` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `remarks` text,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_code` varchar(55) DEFAULT NULL,
  `amount` float(10,2) DEFAULT '0.00',
  `mode_of_payment` varchar(25) DEFAULT NULL,
  `remarks` text,
  `date` date DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `cheque_date` date DEFAULT NULL,
  `bank_name` varchar(500) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `cheque_no` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_management`
--

CREATE TABLE `payroll_management` (
  `payroll_management_id` int(11) NOT NULL,
  `employee_id` int(10) DEFAULT NULL,
  `payroll_month` varchar(20) DEFAULT NULL,
  `payroll_year` int(5) DEFAULT NULL,
  `ot_hours` decimal(10,2) DEFAULT NULL,
  `additional_wages` decimal(10,2) DEFAULT NULL,
  `cpf_deduction` decimal(10,2) DEFAULT NULL,
  `statutary_deduction` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `net_total` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `income_tax_amount` decimal(10,2) DEFAULT NULL,
  `loan_amount` decimal(10,2) DEFAULT NULL,
  `loan_description` text,
  `commission` decimal(10,2) DEFAULT NULL,
  `sdl` decimal(10,2) DEFAULT NULL,
  `ot_amount` decimal(10,2) DEFAULT NULL,
  `basic_pay` decimal(10,2) DEFAULT NULL,
  `overtime_pay_rate` decimal(10,2) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `cpf_account_no` varchar(50) DEFAULT NULL,
  `pay_cdac` decimal(10,2) DEFAULT NULL,
  `pay_sinda` decimal(10,2) DEFAULT NULL,
  `pay_mbmf` decimal(10,2) DEFAULT NULL,
  `pay_eucf` decimal(10,2) DEFAULT NULL,
  `allowance1` decimal(10,2) DEFAULT NULL,
  `allowance2` decimal(10,2) DEFAULT NULL,
  `allowance3` decimal(10,2) DEFAULT NULL,
  `paid_date` date DEFAULT NULL,
  `generated_date` date DEFAULT NULL,
  `deduction1` decimal(10,2) DEFAULT NULL,
  `deduction2` decimal(10,2) DEFAULT NULL,
  `deduction3` decimal(10,2) DEFAULT NULL,
  `deduction4` decimal(10,2) DEFAULT NULL,
  `cpf_employee` decimal(10,2) DEFAULT NULL,
  `cpf_employer` decimal(10,2) DEFAULT NULL,
  `loan_deduction` decimal(10,2) DEFAULT NULL,
  `govt_donation` varchar(50) DEFAULT NULL,
  `total_cpf_contribution` int(11) DEFAULT NULL,
  `payslip_start_date` date DEFAULT NULL,
  `payslip_end_date` date DEFAULT NULL,
  `actual_working_days` decimal(10,1) DEFAULT NULL,
  `working_days_in_month` decimal(10,1) DEFAULT NULL,
  `reimbursement` decimal(10,2) DEFAULT NULL,
  `allowance4` decimal(10,2) DEFAULT NULL,
  `allowance5` decimal(10,2) DEFAULT NULL,
  `director_fee` decimal(10,2) DEFAULT NULL,
  `total_basic_pay_for_month` decimal(10,2) DEFAULT NULL,
  `mode_of_payment` varchar(50) DEFAULT NULL,
  `allowance6` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `po_product`
--

CREATE TABLE `po_product` (
  `po_product_id` int(11) NOT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `item_title` varchar(255) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `description` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `status` varchar(150) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `selling_price` decimal(10,2) DEFAULT NULL,
  `qty_updated` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `damage_qty` int(11) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `qty_requested` decimal(10,2) DEFAULT NULL,
  `qty_delivered` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `po_product`
--

INSERT INTO `po_product` (`po_product_id`, `purchase_order_id`, `item_title`, `quantity`, `unit`, `amount`, `description`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `status`, `cost_price`, `selling_price`, `qty_updated`, `qty`, `product_id`, `supplier_id`, `gst`, `damage_qty`, `brand`, `qty_requested`, `qty_delivered`, `price`) VALUES
(1, 1, 'brick', NULL, '5', NULL, '', '2022-10-18 18:40:20', NULL, 'Super Admin', NULL, 'Closed', '10.00', NULL, 3, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'steel', NULL, '8', NULL, '', '2022-10-18 18:40:20', NULL, 'Super Admin', NULL, 'In Progress', '5.00', NULL, NULL, 3, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 2, 'steel', NULL, 'kgs', NULL, '', '2022-10-18 18:45:31', NULL, 'Super Admin', NULL, 'Closed', '75.00', NULL, 100, 100, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 2, 'brick', NULL, 'pcs', NULL, '', '2022-10-18 18:45:31', NULL, 'Super Admin', NULL, 'In Progress', '30.00', NULL, NULL, 1000, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 3, 'brick', NULL, 'unit', NULL, '', '2022-10-18 20:09:04', NULL, 'Super Admin', NULL, 'In Progress', '20000.00', NULL, NULL, 50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 3, 'tiles', NULL, 'box', NULL, '', '2022-10-18 20:09:04', NULL, 'Super Admin', NULL, 'In Progress', '250.00', NULL, NULL, 150, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 3, 'cement', NULL, 'unit', NULL, '', '2022-10-18 20:09:04', NULL, 'Super Admin', NULL, 'In Progress', '30000.00', NULL, NULL, 20, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `product_code` varchar(50) DEFAULT NULL,
  `description` text,
  `qty_in_stock` decimal(10,2) DEFAULT '0.00',
  `price` float(10,2) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `member_only` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `chi_description` text,
  `sort_order` int(11) DEFAULT '0',
  `meta_title` varchar(500) DEFAULT NULL,
  `meta_description` text,
  `meta_keyword` text,
  `latest` int(1) DEFAULT NULL,
  `description_short` text,
  `chi_description_short` text,
  `general_quotation` int(1) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `product_group_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `item_code` varchar(50) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `part_number` varchar(255) DEFAULT NULL,
  `price_from_supplier` decimal(10,2) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `carton_no` varchar(255) DEFAULT NULL,
  `batch_no` varchar(255) DEFAULT NULL,
  `vat` decimal(10,2) DEFAULT NULL,
  `fc_price_code` varchar(100) DEFAULT NULL,
  `batch_import` int(11) DEFAULT NULL,
  `commodity_code` int(50) DEFAULT NULL,
  `show_in_website` int(1) DEFAULT NULL,
  `most_selling_product` int(1) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `damaged_qty` int(11) DEFAULT NULL,
  `item_code_backup` varchar(100) DEFAULT NULL,
  `hsn_sac` varchar(100) DEFAULT NULL,
  `deals_of_week` int(1) DEFAULT NULL,
  `top_seller` int(1) DEFAULT NULL,
  `hot_deal` int(1) DEFAULT NULL,
  `most_popular` int(1) DEFAULT NULL,
  `top_rating` int(1) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `discount_type` varchar(100) DEFAULT NULL,
  `discount_percentage` decimal(10,2) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `hsn` varchar(100) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `product_weight` float(10,2) DEFAULT NULL,
  `tam_title` varchar(100) DEFAULT NULL,
  `tam_description` text,
  `tam_description_short` text,
  `supplier_id` int(11) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `bar_code` varchar(100) DEFAULT NULL,
  `tag_no` int(11) DEFAULT NULL,
  `pack_size` varchar(50) DEFAULT NULL,
  `discount_from_date` date DEFAULT NULL,
  `discount_to_date` date DEFAULT NULL,
  `mrp` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `sub_category_id`, `title`, `product_code`, `description`, `qty_in_stock`, `price`, `published`, `member_only`, `creation_date`, `modification_date`, `chi_title`, `chi_description`, `sort_order`, `meta_title`, `meta_description`, `meta_keyword`, `latest`, `description_short`, `chi_description_short`, `general_quotation`, `unit`, `product_group_id`, `department_id`, `item_code`, `modified_by`, `created_by`, `part_number`, `price_from_supplier`, `model`, `carton_no`, `batch_no`, `vat`, `fc_price_code`, `batch_import`, `commodity_code`, `show_in_website`, `most_selling_product`, `site_id`, `damaged_qty`, `item_code_backup`, `hsn_sac`, `deals_of_week`, `top_seller`, `hot_deal`, `most_popular`, `top_rating`, `section_id`, `discount_type`, `discount_percentage`, `discount_amount`, `hsn`, `gst`, `product_weight`, `tam_title`, `tam_description`, `tam_description_short`, `supplier_id`, `product_type`, `bar_code`, `tag_no`, `pack_size`, `discount_from_date`, `discount_to_date`, `mrp`) VALUES
(1, NULL, NULL, 'brick', NULL, '', '2.00', 20000.00, 1, NULL, '2022-10-18 18:30:26', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'unit', NULL, NULL, '1133', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Materials', NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, 'steel', NULL, '', '90.00', 75.00, 1, NULL, '2022-10-18 18:37:23', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kgs', NULL, NULL, '1134', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Materials', NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, NULL, 'tiles', NULL, '', '0.00', 250.00, 1, NULL, '2022-10-18 20:07:14', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'box', NULL, NULL, '1135', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Materials', NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, NULL, 'cement', NULL, '', '20.00', 30000.00, 1, NULL, '2022-10-18 20:07:50', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'unit', NULL, NULL, '1136', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Materials', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_company`
--

CREATE TABLE `product_company` (
  `product_company_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_price`
--

CREATE TABLE `product_price` (
  `product_price_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_price_history`
--

CREATE TABLE `product_price_history` (
  `product_price_history_id` int(11) NOT NULL,
  `product_price_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `content_date` date DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `enquiry_date` date DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `estimated_finish_date` date DEFAULT NULL,
  `actual_finish_date` date DEFAULT NULL,
  `project_value` int(11) DEFAULT NULL,
  `notes` text,
  `project_code` varchar(10) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `project_manager_id` int(11) DEFAULT NULL,
  `per_completed` int(10) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `percent_used` int(11) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `quote_ref` varchar(255) DEFAULT NULL,
  `client_type` varchar(100) DEFAULT NULL,
  `difficulty` varchar(10) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `deposit_inv_ref` varchar(255) DEFAULT NULL,
  `project_commission` int(11) DEFAULT NULL,
  `payment_terms` varchar(255) DEFAULT NULL,
  `confirmed_quote_id` int(11) DEFAULT NULL,
  `target_left` int(11) DEFAULT NULL,
  `budget_inhouse` int(11) DEFAULT NULL,
  `budget_third_party` int(11) DEFAULT NULL,
  `used_third_party` int(11) DEFAULT NULL,
  `used_inhouse` int(11) DEFAULT NULL,
  `net_third_party` int(11) DEFAULT NULL,
  `stage` varchar(25) DEFAULT NULL,
  `currency` varchar(5) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `project_value_base` int(11) DEFAULT NULL,
  `project_value_ref` int(11) DEFAULT NULL,
  `paid_on` varchar(100) DEFAULT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `site` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `title`, `description`, `published`, `creation_date`, `modification_date`, `content_date`, `service_id`, `contact_id`, `task_id`, `enquiry_date`, `follow_up_date`, `start_date`, `estimated_finish_date`, `actual_finish_date`, `project_value`, `notes`, `project_code`, `status`, `staff_id`, `company_id`, `project_manager_id`, `per_completed`, `opportunity_id`, `category`, `percent_used`, `invoice`, `quote_ref`, `client_type`, `difficulty`, `created_by`, `modified_by`, `flag`, `deposit_inv_ref`, `project_commission`, `payment_terms`, `confirmed_quote_id`, `target_left`, `budget_inhouse`, `budget_third_party`, `used_third_party`, `used_inhouse`, `net_third_party`, `stage`, `currency`, `branch_id`, `project_value_base`, `project_value_ref`, `paid_on`, `quote_id`, `site`) VALUES
(1, 'Marina bay sands', '', NULL, '2020-11-02 11:42:05', '2020-12-18 14:49:29', NULL, NULL, 1, NULL, NULL, NULL, '2020-11-02', '2021-11-30', NULL, NULL, NULL, 'P-1000', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, '', NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 3, NULL),
(2, 'New Project', NULL, NULL, '2020-11-23 15:28:02', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'P-1001', 'WIP', NULL, 1, NULL, NULL, NULL, 'Manpower Supply', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 2, NULL),
(3, '13 International Business Park Project', '', NULL, '2020-12-22 11:52:10', '2020-12-22 11:52:47', NULL, NULL, 1, NULL, NULL, NULL, '2020-12-08', '2021-02-10', NULL, NULL, NULL, 'P-1002', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 8, NULL),
(4, 'Sim Lim tower', '', NULL, '2020-12-22 21:07:26', '2020-12-22 22:09:05', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'P-1003', 'WIP', NULL, 4, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 9, NULL),
(5, 'Jurong Island Sim', NULL, NULL, '2020-12-23 11:08:38', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'P-1004', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 10, NULL),
(6, 'Test Opportunity', '', NULL, '2020-12-29 11:34:44', '2021-01-01 14:25:45', NULL, NULL, 1, NULL, NULL, NULL, '2020-12-29', NULL, NULL, NULL, '', 'P-1005', 'WIP', NULL, 1, NULL, 0, 1, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(7, 'Sentosa Island', '', NULL, '2020-12-30 22:36:35', '2021-01-01 14:21:38', NULL, NULL, 3, NULL, NULL, NULL, '2021-01-01', '2021-01-29', NULL, NULL, NULL, 'P-1006', 'WIP', NULL, 6, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Marina Bay Sands Level 50', '', NULL, '2020-12-31 11:56:04', '2022-01-25 22:23:50', NULL, NULL, 4, NULL, NULL, NULL, '2021-01-01', NULL, NULL, NULL, '', 'P-1007', 'WIP', NULL, 7, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Business ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 19, NULL),
(9, 'Test', 'test', NULL, '2020-12-31 21:02:27', '2021-01-01 14:20:58', NULL, NULL, 7, NULL, NULL, NULL, '2021-01-01', '2020-12-31', NULL, NULL, '', 'P-1008', 'WIP', NULL, 8, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 21, NULL),
(10, 'SIm Lim Work', NULL, NULL, '2021-01-01 13:32:25', NULL, NULL, NULL, 9, NULL, NULL, NULL, '2021-01-01', NULL, NULL, NULL, '', 'P-1009', 'WIP', NULL, 10, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 24, NULL),
(11, 'At Busan', '', NULL, '2021-01-01 14:15:48', '2021-01-01 14:28:09', NULL, NULL, 8, NULL, NULL, NULL, '2021-01-01', NULL, NULL, NULL, '', 'P-1010', 'WIP', NULL, 9, NULL, 0, 0, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 25, NULL),
(12, 'Boat Quay Mc Donalds upgrade', NULL, NULL, '2021-01-01 18:37:02', NULL, NULL, NULL, 10, NULL, NULL, NULL, '2021-01-01', NULL, NULL, NULL, '', 'P-1011', 'WIP', NULL, 11, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 26, NULL),
(13, 'Marina Bay Sands Apple Store', NULL, NULL, '2021-01-02 10:18:52', NULL, NULL, NULL, 10, NULL, NULL, NULL, '2021-01-02', NULL, NULL, NULL, '', 'P-1012', 'WIP', NULL, 11, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 27, NULL),
(14, 'New project for quote', NULL, NULL, '2021-01-02 11:07:59', NULL, NULL, NULL, 9, NULL, NULL, NULL, '2021-01-02', '2021-02-01', NULL, NULL, NULL, 'P-1013', 'WIP', NULL, 10, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'New Test Project', NULL, NULL, '2021-01-04 15:56:48', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-01-04', '2021-02-03', NULL, NULL, NULL, 'P-1014', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 30, NULL),
(16, 'New Drawing Quote', NULL, NULL, '2021-01-04 19:04:56', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-01-04', '2021-02-03', NULL, NULL, NULL, 'P-1015', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'SMRT - Tuas bay terminal', NULL, NULL, '2021-01-05 12:54:56', NULL, NULL, NULL, 2, NULL, NULL, NULL, '2021-01-05', '2021-02-04', NULL, NULL, NULL, 'P-1016', 'WIP', NULL, 4, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Work at Haddock Road', NULL, NULL, '2021-01-06 20:23:55', NULL, NULL, NULL, 9, NULL, NULL, NULL, '2021-01-06', NULL, NULL, NULL, '', 'P-1017', 'WIP', NULL, 10, NULL, 0, 0, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 33, NULL),
(19, 'New landslip road', NULL, NULL, '2021-01-07 14:55:16', NULL, NULL, NULL, 3, NULL, NULL, NULL, '2021-01-07', NULL, NULL, NULL, '', 'P-1018', 'WIP', NULL, 6, NULL, 0, 0, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 34, NULL),
(20, '80 UOB Plaza 1', NULL, NULL, '2021-01-07 15:19:24', NULL, NULL, NULL, 10, NULL, NULL, NULL, '2021-01-07', NULL, NULL, NULL, '', 'P-1019', 'WIP', NULL, 11, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 35, NULL),
(21, 'Float @ Marina Bay', NULL, NULL, '2021-01-11 17:23:35', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-01-11', NULL, NULL, NULL, '', 'P-1020', 'WIP', NULL, 1, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 36, NULL),
(22, 'Installation and Maintenance at Changi Terminal 3', NULL, NULL, '2021-01-11 19:12:08', NULL, NULL, NULL, 3, NULL, NULL, NULL, '2021-01-11', NULL, NULL, NULL, '', 'P-1021', 'WIP', NULL, 6, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 37, NULL),
(23, 'Jacketing work at Shop units', '', NULL, '2021-01-13 15:40:07', '2021-01-13 16:00:18', NULL, NULL, 12, NULL, NULL, NULL, '2021-01-13', '2022-01-31', NULL, NULL, '', 'P-1022', 'WIP', NULL, 13, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'DHANDAPANI SENTHIL KUMAR', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 39, NULL),
(24, 'Contruction', NULL, NULL, '2021-01-15 14:28:25', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-01-15', '2021-02-14', NULL, NULL, NULL, 'P-1023', 'WIP', NULL, 1, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'aircon replacement', NULL, NULL, '2021-01-16 10:42:32', NULL, NULL, NULL, 9, NULL, NULL, NULL, '2021-01-16', NULL, NULL, NULL, '', 'P-1024', 'WIP', NULL, 10, NULL, 0, 0, 'Tenancy Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 41, NULL),
(26, 'sim lim', '', NULL, '2021-01-16 10:44:04', '2021-01-16 10:44:07', NULL, NULL, 3, NULL, NULL, NULL, '2021-01-16', '2021-02-15', NULL, NULL, NULL, 'P-1025', 'WIP', NULL, 6, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 43, NULL),
(27, 'aircon', NULL, NULL, '2021-01-16 11:22:03', NULL, NULL, NULL, 3, NULL, NULL, NULL, '2021-01-16', NULL, NULL, NULL, '', 'P-1026', 'WIP', NULL, 6, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 42, NULL),
(28, 'Installing signage', NULL, NULL, '2021-01-23 13:04:50', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-01-23', NULL, NULL, NULL, '', 'P-1027', 'WIP', NULL, 1, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 50, NULL),
(29, 'App installation', '', NULL, '2022-01-25 18:58:53', '2022-01-25 20:26:54', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-02-24', NULL, NULL, NULL, 'P-1028', 'WIP', NULL, 7, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Business ', 'Business ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'software training', 'Training in 2 months', NULL, '2022-01-25 19:02:43', '2022-01-25 20:04:22', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-01-28', NULL, NULL, '', 'P-1029', 'WIP', NULL, 7, NULL, 0, 0, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Admin ', 'Admin ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 54, NULL),
(31, 'Beauty products', 'Organic products', NULL, '2022-01-25 19:08:30', '2022-01-25 20:03:28', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-02-22', NULL, NULL, '', 'P-1030', 'WIP', NULL, 7, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Admin ', 'Admin ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 55, NULL),
(32, 'Mobile app development', 'Creating new mobile app installation', NULL, '2022-01-25 19:20:17', '2022-01-25 19:28:35', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-03-25', NULL, NULL, '', 'P-1031', 'WIP', NULL, 7, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Admin ', 'Admin ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 58, NULL),
(33, 'Email marketting(abc)', '', NULL, '2022-01-25 19:37:18', '2022-01-25 19:48:31', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-02-24', NULL, NULL, NULL, 'P-1032', 'WIP', NULL, 7, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Business ', 'Business ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, 59, NULL),
(34, 'construction replacement', '', NULL, '2022-01-25 19:50:19', '2022-01-25 19:51:31', NULL, NULL, 5, NULL, NULL, NULL, '2022-01-25', '2022-02-24', NULL, NULL, NULL, 'P-1033', 'WIP', NULL, 7, NULL, NULL, NULL, 'Project', NULL, NULL, NULL, NULL, NULL, 'Business ', 'Business ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'US$', NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'Bus stop moving at Jalan Besar', NULL, NULL, '2022-04-29 12:42:56', NULL, NULL, NULL, 14, NULL, NULL, NULL, '2022-04-29', NULL, NULL, NULL, '', 'P-1034', 'WIP', NULL, 17, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 62, NULL),
(36, 'Contruction work ', NULL, NULL, '2022-08-19 13:58:07', NULL, NULL, NULL, 16, NULL, NULL, NULL, '2022-08-19', NULL, NULL, NULL, '', 'P-1035', 'WIP', NULL, 19, 3, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 63, NULL),
(37, 'abc construction', '', NULL, '2022-08-19 20:06:18', '2022-08-19 21:54:40', NULL, NULL, 17, NULL, NULL, NULL, '2022-08-19', NULL, NULL, NULL, '', 'P-1036', 'WIP', NULL, 20, 3, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 65, NULL),
(38, 'BUILDING CONSTRUCTION', 'process on work ', NULL, '2022-08-19 21:17:17', '2022-08-19 22:22:43', NULL, NULL, 19, NULL, NULL, NULL, '2022-08-19', '2022-11-30', NULL, NULL, '', 'P-1037', 'WIP', NULL, 21, 3, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 64, NULL),
(39, 'mafmar', NULL, NULL, '2022-08-20 19:11:28', NULL, NULL, NULL, 22, NULL, NULL, NULL, '2022-08-20', NULL, NULL, NULL, '', 'P-1038', 'WIP', NULL, 20, 3, 0, 0, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 66, NULL),
(40, 'marzu', 'dgfsdfga', NULL, '2022-08-22 03:29:53', '2022-08-22 04:26:01', NULL, NULL, 24, NULL, NULL, NULL, '2022-08-22', '2022-08-23', NULL, NULL, '', 'P-1039', 'WIP', NULL, 22, 3, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 67, NULL),
(41, 'sdsdj', NULL, NULL, '2022-08-22 03:34:37', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-22', NULL, NULL, NULL, '', 'P-1040', 'WIP', NULL, 2, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 68, NULL),
(42, 'Raja', '', NULL, '2022-08-30 17:54:43', '2022-10-17 14:18:13', NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-30', NULL, NULL, NULL, '', 'P-1041', 'WIP', NULL, 25, NULL, 0, 0, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 69, NULL),
(43, 'test1', '', NULL, '2022-10-18 18:36:33', '2022-10-18 19:57:51', NULL, NULL, 2, NULL, NULL, NULL, '2022-10-18', '2022-10-26', NULL, NULL, '', 'P-595', 'WIP', NULL, 1, NULL, 0, 3, 'Maintenance', NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL),
(44, 'New Check 18 10', NULL, NULL, '2022-10-18 18:43:52', NULL, NULL, NULL, 1, NULL, NULL, NULL, '2022-10-18', NULL, NULL, NULL, '', 'P-596', 'WIP', NULL, 21, NULL, 0, 4, 'Project', NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_claim`
--

CREATE TABLE `project_claim` (
  `project_claim_id` int(11) NOT NULL,
  `claim_no` varchar(100) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `project_title` varchar(255) DEFAULT NULL,
  `description` text,
  `po_quote_no` varchar(150) DEFAULT NULL,
  `ref_no` varchar(150) DEFAULT NULL,
  `claim_date` date DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `variation_order_submission` decimal(10,2) DEFAULT NULL,
  `value_of_contract_work_done` decimal(10,2) DEFAULT NULL,
  `vo_claim_work_done` decimal(10,2) DEFAULT NULL,
  `claim_code` varchar(100) DEFAULT NULL,
  `less_previous_retention` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_claim`
--

INSERT INTO `project_claim` (`project_claim_id`, `claim_no`, `project_id`, `client_id`, `project_title`, `description`, `po_quote_no`, `ref_no`, `claim_date`, `status`, `amount`, `created_by`, `creation_date`, `modified_by`, `modification_date`, `variation_order_submission`, `value_of_contract_work_done`, `vo_claim_work_done`, `claim_code`, `less_previous_retention`) VALUES
(1, NULL, 43, 1, 'test1', '', '3', '123', '2022-10-18', 'Claim Amount Recieved', '3000.00', 'Super Admin', '2022-10-18 18:43:36', 'Super Admin', '2022-10-18 20:16:23', '2.00', '3333.00', '3333.00', '01017', '33.00'),
(2, NULL, 44, 21, 'New Check 18 10', NULL, NULL, NULL, '2022-10-18', 'In Progress', NULL, 'Super Admin', '2022-10-18 18:49:41', 'Super Admin', '2022-10-18 18:50:13', NULL, NULL, NULL, '01018', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_employee`
--

CREATE TABLE `project_employee` (
  `project_employee_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `active_in_project` tinyint(1) DEFAULT NULL,
  `category_type` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project_materials`
--

CREATE TABLE `project_materials` (
  `project_materials_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `title` text,
  `quantity` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `description` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `material_used_date` date DEFAULT NULL,
  `part_no` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `viresco_factory` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_materials`
--

INSERT INTO `project_materials` (`project_materials_id`, `project_id`, `title`, `quantity`, `amount`, `description`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `status`, `unit`, `material_used_date`, `part_no`, `product_id`, `viresco_factory`) VALUES
(1, 43, 'brick', '0.00', NULL, '', '2022-10-18 18:43:37', NULL, 'Super Admin', NULL, 'Used', '1', '2022-10-18', NULL, 1, NULL),
(2, 44, 'steel', '10.00', NULL, '', '2022-10-18 18:46:52', NULL, 'Super Admin', NULL, 'Used', 'kgs', '2022-10-18', NULL, 2, NULL),
(3, 43, 'brick', '2.00', NULL, '', '2022-10-18 20:12:09', NULL, 'Super Admin', NULL, 'Used', 'unit', '2022-10-18', NULL, 1, NULL),
(4, 43, 'tiles', '0.00', NULL, '', '2022-10-18 20:12:09', NULL, 'Super Admin', NULL, 'Used', 'unit', '2022-10-18', NULL, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_service`
--

CREATE TABLE `project_service` (
  `project_service_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project_staff`
--

CREATE TABLE `project_staff` (
  `project_staff_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `active_in_project` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order`
--

CREATE TABLE `purchase_order` (
  `purchase_order_id` int(11) NOT NULL,
  `po_code` varchar(15) DEFAULT NULL,
  `company_id_supplier` int(11) DEFAULT NULL,
  `contact_id_supplier` int(11) DEFAULT '0',
  `delivery_terms` text,
  `status` varchar(25) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `supplier_reference_no` varchar(100) DEFAULT NULL,
  `our_reference_no` varchar(100) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `payment_terms` text,
  `delivery_date` date DEFAULT NULL,
  `po_date` date DEFAULT NULL,
  `shipping_address_flat` varchar(255) DEFAULT NULL,
  `shipping_address_street` varchar(255) DEFAULT NULL,
  `shipping_address_country` varchar(100) DEFAULT NULL,
  `shipping_address_po_code` varchar(10) DEFAULT NULL,
  `expense_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `priority` varchar(100) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `notes` text,
  `supplier_inv_code` varchar(100) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `gst_percentage` decimal(10,2) DEFAULT NULL,
  `delivery_to` varchar(200) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `payment` float(10,2) DEFAULT NULL,
  `project` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchase_order`
--

INSERT INTO `purchase_order` (`purchase_order_id`, `po_code`, `company_id_supplier`, `contact_id_supplier`, `delivery_terms`, `status`, `project_id`, `flag`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `supplier_reference_no`, `our_reference_no`, `shipping_method`, `payment_terms`, `delivery_date`, `po_date`, `shipping_address_flat`, `shipping_address_street`, `shipping_address_country`, `shipping_address_po_code`, `expense_id`, `staff_id`, `purchase_order_date`, `payment_status`, `title`, `priority`, `follow_up_date`, `notes`, `supplier_inv_code`, `gst`, `gst_percentage`, `delivery_to`, `contact`, `mobile`, `payment`, `project`) VALUES
(1, 'PO-1022', 1, 0, NULL, NULL, 43, NULL, '2022-10-18 18:40:20', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, '2022-10-18', '2022-10-18', '10 Jalan Besar', '#15-02 Sim Lim Tower', 'Singapore ', ' 208787', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', '0.00', NULL, NULL, NULL, NULL, NULL),
(2, 'PO-1023', 1, 0, '', NULL, 44, NULL, '2022-10-18 18:45:31', '2022-10-18 18:46:16', 'Super Admin', 'Super Admin', '', '', '', '', '2022-10-18', '2022-10-19', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', '0.00', 'Factory', 'Test Name', '432532523', NULL, ''),
(3, 'PO-1024', 1, 0, NULL, NULL, 43, NULL, '2022-10-18 20:09:04', NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, '2022-10-18', '2022-10-17', '10 Jalan Besar', '#15-02 Sim Lim Tower', 'Singapore ', ' 208787', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', '0.00', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quote`
--

CREATE TABLE `quote` (
  `quote_id` int(11) NOT NULL,
  `opportunity_id` int(10) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  `quote_code` varchar(50) DEFAULT NULL,
  `quote_date` date DEFAULT NULL,
  `quote_status` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `currency_item` varchar(50) DEFAULT NULL,
  `note` text,
  `condition` text,
  `quote_type` varchar(100) DEFAULT NULL,
  `quote_sequence` tinyint(4) NOT NULL DEFAULT '1',
  `template` tinyint(4) DEFAULT '0',
  `template_title` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `sign_staff_id` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `sort_order` int(11) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `signatory_name` varchar(25) DEFAULT NULL,
  `signatory_position` varchar(25) DEFAULT NULL,
  `quote_code_user` varchar(50) DEFAULT NULL,
  `quote_intro_text_1` varchar(100) DEFAULT NULL,
  `invoices_payment_terms` text,
  `responsibility` text,
  `provision_by_client` text,
  `provision_by_krs` text,
  `monday_to_friday_normal_timing` varchar(500) DEFAULT NULL,
  `saturday_normal_timing` varchar(500) DEFAULT NULL,
  `monday_to_friday_ot_timing` varchar(500) DEFAULT NULL,
  `saturday_ot_timing` varchar(500) DEFAULT NULL,
  `sunday_and_publicholiday_ot_timing` varchar(500) DEFAULT NULL,
  `timesheet_type` varchar(50) DEFAULT NULL,
  `site_address` varchar(255) DEFAULT NULL,
  `project_location` varchar(255) DEFAULT NULL,
  `project_reference` varchar(255) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `gst` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `drawing_nos` tinyint(4) DEFAULT NULL,
  `intro_quote` text,
  `our_reference` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `revision` varchar(100) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `ref_no_quote` varchar(50) DEFAULT NULL,
  `intro_drawing_quote` text,
  `show_project_manager` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quote`
--

INSERT INTO `quote` (`quote_id`, `opportunity_id`, `project_id`, `quote_code`, `quote_date`, `quote_status`, `creation_date`, `modification_date`, `currency_item`, `note`, `condition`, `quote_type`, `quote_sequence`, `template`, `template_title`, `created_by`, `sign_staff_id`, `flag`, `sort_order`, `modified_by`, `title`, `signatory_name`, `signatory_position`, `quote_code_user`, `quote_intro_text_1`, `invoices_payment_terms`, `responsibility`, `provision_by_client`, `provision_by_krs`, `monday_to_friday_normal_timing`, `saturday_normal_timing`, `monday_to_friday_ot_timing`, `saturday_ot_timing`, `sunday_and_publicholiday_ot_timing`, `timesheet_type`, `site_address`, `project_location`, `project_reference`, `discount`, `gst`, `payment_method`, `drawing_nos`, `intro_quote`, `our_reference`, `total_amount`, `revision`, `employee_id`, `ref_no_quote`, `intro_drawing_quote`, `show_project_manager`) VALUES
(1, 1, NULL, 'QT_ME_171', '2022-10-06', 'New', '2022-10-06 22:56:35', '2022-10-06 22:58:12', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'Site 1', 'Construction work', '0.00', NULL, '30 days', 0, '', '', '0.00', '', NULL, '', '<p>Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item</p>\n', 0),
(3, 3, 43, 'QT_ME_173', '2022-10-07', 'Quoted', '2022-10-07 15:01:29', '2022-10-18 20:01:55', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '15000.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n', 0),
(2, 2, NULL, 'QT_ME_172', '2022-10-07', 'New', '2022-10-07 15:00:31', '2022-10-07 15:00:31', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', 'test', '0.00', NULL, '', 0, '', '', '0.00', '', NULL, '', '', 0),
(4, 4, 44, 'QT_ME_174', '2022-10-18', 'Awarded', '2022-10-18 18:42:05', '2022-10-18 18:50:44', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', 'New Check 18 10', '0.00', NULL, '', 0, '', '', '0.00', '', NULL, '', '', 0),
(5, 5, NULL, 'QT_ME_175', '2022-10-21', 'New', '2022-10-21 15:24:37', '2022-10-21 15:24:37', NULL, NULL, ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', 'PROJECT NAME', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quote_category`
--

CREATE TABLE `quote_category` (
  `quote_category_id` int(11) NOT NULL,
  `quote_id` int(10) DEFAULT NULL,
  `valuelist_id` int(10) DEFAULT NULL,
  `sort_order` int(10) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `category_type` varchar(100) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quote_columns`
--

CREATE TABLE `quote_columns` (
  `quote_columns_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `show_column` int(1) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quote_items`
--

CREATE TABLE `quote_items` (
  `quote_items_id` int(11) NOT NULL,
  `quote_category_id` int(10) DEFAULT NULL,
  `description` text,
  `amount` decimal(10,2) DEFAULT NULL,
  `amount_other` decimal(10,0) DEFAULT NULL,
  `item_type` varchar(200) DEFAULT NULL,
  `sort_order` int(10) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `title` text,
  `quote_id` int(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `actual_amount` int(11) DEFAULT NULL,
  `supplier_amount` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `remarks` text,
  `part_no` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `ot_rate` decimal(10,2) DEFAULT NULL,
  `ph_rate` decimal(10,2) DEFAULT NULL,
  `scaffold_code` varchar(100) DEFAULT NULL,
  `erection` decimal(10,2) DEFAULT NULL,
  `dismantle` decimal(10,2) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `drawing_number` varchar(255) DEFAULT NULL,
  `drawing_title` text,
  `drawing_revision` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quote_items`
--

INSERT INTO `quote_items` (`quote_items_id`, `quote_category_id`, `description`, `amount`, `amount_other`, `item_type`, `sort_order`, `creation_date`, `modification_date`, `title`, `quote_id`, `opportunity_id`, `actual_amount`, `supplier_amount`, `quantity`, `project_id`, `created_by`, `modified_by`, `unit`, `remarks`, `part_no`, `nationality`, `ot_rate`, `ph_rate`, `scaffold_code`, `erection`, `dismantle`, `unit_price`, `drawing_number`, `drawing_title`, `drawing_revision`) VALUES
(1, NULL, 'Some Description', '18900.00', NULL, NULL, NULL, '2022-10-06 22:58:12', NULL, 'Product 1', 1, 1, NULL, NULL, '189.00', NULL, 'Super Admin', NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', NULL, NULL, NULL),
(2, NULL, 'description about product 2', '4760.00', NULL, NULL, NULL, '2022-10-06 22:58:12', NULL, 'Product 2', 1, 1, NULL, NULL, '34.00', NULL, 'Super Admin', NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '140.00', NULL, NULL, NULL),
(3, NULL, 'ram sands', '750000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'sand', 3, 3, NULL, NULL, '50.00', NULL, 'Super Admin', NULL, 'unit', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15000.00', NULL, NULL, NULL),
(4, NULL, 'ram sands', '6250000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'breaks', 3, 3, NULL, NULL, '25.00', NULL, 'Super Admin', NULL, 'load', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '250000.00', NULL, NULL, NULL),
(5, NULL, 'ram sands', '1500000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'iron', 3, 3, NULL, NULL, '15000.00', NULL, 'Super Admin', NULL, 'weight', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', NULL, NULL, NULL),
(6, NULL, 'Tiles land', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'tiles', 3, 3, NULL, NULL, '1000.00', NULL, 'Super Admin', NULL, 'box', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1000.00', NULL, NULL, NULL),
(7, NULL, 'ram sands', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'cement', 3, 3, NULL, NULL, '20.00', NULL, 'Super Admin', NULL, 'load', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000.00', NULL, NULL, NULL),
(8, NULL, 'test desc 1', '1000.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, 'test item 1', 4, 4, NULL, NULL, '20.00', NULL, 'Super Admin', NULL, 'kg', 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50.00', NULL, NULL, NULL),
(9, NULL, 'test desc 2', '600.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, '', 4, 4, NULL, NULL, '15.00', NULL, 'Super Admin', NULL, 'pcs', 'test 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40.00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quote_items_log`
--

CREATE TABLE `quote_items_log` (
  `quote_items_log_id` int(11) NOT NULL,
  `quote_category_id` int(10) DEFAULT NULL,
  `description` text,
  `amount` decimal(10,2) DEFAULT NULL,
  `amount_other` decimal(10,0) DEFAULT NULL,
  `item_type` varchar(200) DEFAULT NULL,
  `sort_order` int(10) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `title` text,
  `quote_id` int(11) DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `actual_amount` int(11) DEFAULT NULL,
  `supplier_amount` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `remarks` text,
  `part_no` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `ot_rate` decimal(10,2) DEFAULT NULL,
  `ph_rate` decimal(10,2) DEFAULT NULL,
  `scaffold_code` varchar(100) DEFAULT NULL,
  `erection` decimal(10,2) DEFAULT NULL,
  `dismantle` decimal(10,2) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `drawing_number` varchar(255) DEFAULT NULL,
  `drawing_title` text,
  `drawing_revision` varchar(255) DEFAULT NULL,
  `quote_items_id` int(11) DEFAULT NULL,
  `quote_log_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quote_items_log`
--

INSERT INTO `quote_items_log` (`quote_items_log_id`, `quote_category_id`, `description`, `amount`, `amount_other`, `item_type`, `sort_order`, `creation_date`, `modification_date`, `title`, `quote_id`, `opportunity_id`, `actual_amount`, `supplier_amount`, `quantity`, `project_id`, `created_by`, `modified_by`, `unit`, `remarks`, `part_no`, `nationality`, `ot_rate`, `ph_rate`, `scaffold_code`, `erection`, `dismantle`, `unit_price`, `drawing_number`, `drawing_title`, `drawing_revision`, `quote_items_id`, `quote_log_id`) VALUES
(1, NULL, 'Some Description', '18900.00', NULL, NULL, NULL, '2022-10-06 22:58:12', NULL, 'Product 1', 1, 1, NULL, NULL, '189.00', NULL, 'Super Admin', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', '', '', '', 1, 2),
(2, NULL, 'description about product 2', '4760.00', NULL, NULL, NULL, '2022-10-06 22:58:12', NULL, 'Product 2', 1, 1, NULL, NULL, '34.00', NULL, 'Super Admin', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '140.00', '', '', '', 2, 2),
(3, NULL, 'ram sands', '750000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'sand', 3, 3, NULL, NULL, '50.00', NULL, 'Super Admin', '', 'unit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15000.00', '', '', '', 3, 7),
(4, NULL, 'ram sands', '6250000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'breaks', 3, 3, NULL, NULL, '25.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '250000.00', '', '', '', 4, 7),
(5, NULL, 'ram sands', '1500000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'iron', 3, 3, NULL, NULL, '15000.00', NULL, 'Super Admin', '', 'weight', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', '', '', '', 5, 7),
(6, NULL, 'Tiles land', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'tiles', 3, 3, NULL, NULL, '1000.00', NULL, 'Super Admin', '', 'box', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1000.00', '', '', '', 6, 7),
(7, NULL, 'ram sands', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'cement', 3, 3, NULL, NULL, '20.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000.00', '', '', '', 7, 7),
(8, NULL, 'test desc 1', '1000.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, 'test item 1', 4, 4, NULL, NULL, '20.00', NULL, 'Super Admin', '', 'kg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50.00', '', '', '', 8, 8),
(9, NULL, 'test desc 2', '600.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, '', 4, 4, NULL, NULL, '15.00', NULL, 'Super Admin', '', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40.00', '', '', '', 9, 8),
(10, NULL, 'test desc 1', '1000.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, 'test item 1', 4, 4, NULL, NULL, '20.00', NULL, 'Super Admin', '', 'kg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50.00', '', '', '', 8, 9),
(11, NULL, 'test desc 2', '600.00', NULL, NULL, NULL, '2022-10-18 18:43:13', NULL, '', 4, 4, NULL, NULL, '15.00', NULL, 'Super Admin', '', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '40.00', '', '', '', 9, 9),
(12, NULL, 'ram sands', '750000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'sand', 3, 3, NULL, NULL, '50.00', NULL, 'Super Admin', '', 'unit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15000.00', '', '', '', 3, 10),
(13, NULL, 'ram sands', '6250000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'breaks', 3, 3, NULL, NULL, '25.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '250000.00', '', '', '', 4, 10),
(14, NULL, 'ram sands', '1500000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'iron', 3, 3, NULL, NULL, '15000.00', NULL, 'Super Admin', '', 'weight', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', '', '', '', 5, 10),
(15, NULL, 'Tiles land', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'tiles', 3, 3, NULL, NULL, '1000.00', NULL, 'Super Admin', '', 'box', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1000.00', '', '', '', 6, 10),
(16, NULL, 'ram sands', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'cement', 3, 3, NULL, NULL, '20.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000.00', '', '', '', 7, 10),
(17, NULL, 'ram sands', '750000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'sand', 3, 3, NULL, NULL, '50.00', NULL, 'Super Admin', '', 'unit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15000.00', '', '', '', 3, 11),
(18, NULL, 'ram sands', '6250000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'breaks', 3, 3, NULL, NULL, '25.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '250000.00', '', '', '', 4, 11),
(19, NULL, 'ram sands', '1500000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'iron', 3, 3, NULL, NULL, '15000.00', NULL, 'Super Admin', '', 'weight', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.00', '', '', '', 5, 11),
(20, NULL, 'Tiles land', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'tiles', 3, 3, NULL, NULL, '1000.00', NULL, 'Super Admin', '', 'box', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1000.00', '', '', '', 6, 11),
(21, NULL, 'ram sands', '1000000.00', NULL, NULL, NULL, '2022-10-18 18:23:14', NULL, 'cement', 3, 3, NULL, NULL, '20.00', NULL, 'Super Admin', '', 'load', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000.00', '', '', '', 7, 11);

-- --------------------------------------------------------

--
-- Table structure for table `quote_log`
--

CREATE TABLE `quote_log` (
  `quote_log_id` int(11) NOT NULL,
  `opportunity_id` int(10) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  `quote_code` varchar(50) DEFAULT NULL,
  `quote_date` date DEFAULT NULL,
  `quote_status` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `currency_item` varchar(50) DEFAULT NULL,
  `note` text,
  `condition` text,
  `quote_type` varchar(100) DEFAULT NULL,
  `quote_sequence` tinyint(4) NOT NULL DEFAULT '1',
  `template` tinyint(4) DEFAULT '0',
  `template_title` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `sign_staff_id` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `sort_order` int(11) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `signatory_name` varchar(25) DEFAULT NULL,
  `signatory_position` varchar(25) DEFAULT NULL,
  `quote_code_user` varchar(50) DEFAULT NULL,
  `quote_intro_text_1` varchar(100) DEFAULT NULL,
  `invoices_payment_terms` text,
  `responsibility` text,
  `provision_by_client` text,
  `provision_by_krs` text,
  `monday_to_friday_normal_timing` varchar(500) DEFAULT NULL,
  `saturday_normal_timing` varchar(500) DEFAULT NULL,
  `monday_to_friday_ot_timing` varchar(500) DEFAULT NULL,
  `saturday_ot_timing` varchar(500) DEFAULT NULL,
  `sunday_and_publicholiday_ot_timing` varchar(500) DEFAULT NULL,
  `timesheet_type` varchar(50) DEFAULT NULL,
  `site_address` varchar(255) DEFAULT NULL,
  `project_location` varchar(255) DEFAULT NULL,
  `project_reference` varchar(255) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `gst` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `drawing_nos` tinyint(4) DEFAULT NULL,
  `intro_quote` text,
  `our_reference` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `revision` varchar(100) DEFAULT NULL,
  `quote_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `ref_no_quote` varchar(50) DEFAULT NULL,
  `intro_drawing_quote` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quote_log`
--

INSERT INTO `quote_log` (`quote_log_id`, `opportunity_id`, `project_id`, `quote_code`, `quote_date`, `quote_status`, `creation_date`, `modification_date`, `currency_item`, `note`, `condition`, `quote_type`, `quote_sequence`, `template`, `template_title`, `created_by`, `sign_staff_id`, `flag`, `sort_order`, `modified_by`, `title`, `signatory_name`, `signatory_position`, `quote_code_user`, `quote_intro_text_1`, `invoices_payment_terms`, `responsibility`, `provision_by_client`, `provision_by_krs`, `monday_to_friday_normal_timing`, `saturday_normal_timing`, `monday_to_friday_ot_timing`, `saturday_ot_timing`, `sunday_and_publicholiday_ot_timing`, `timesheet_type`, `site_address`, `project_location`, `project_reference`, `discount`, `gst`, `payment_method`, `drawing_nos`, `intro_quote`, `our_reference`, `total_amount`, `revision`, `quote_id`, `employee_id`, `ref_no_quote`, `intro_drawing_quote`) VALUES
(1, 1, NULL, 'QT_ME_171', '2022-10-06', 'New', '2022-10-06 22:56:35', '2022-10-06 22:56:35', NULL, NULL, ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', 'PROJECT NAME', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', '', '0.00', NULL, '', 0, '', '', '0.00', '', 1, NULL, '', ''),
(2, 1, NULL, 'QT_ME_171', '2022-10-06', 'New', '2022-10-06 22:56:35', '2022-10-06 22:58:12', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'Site 1', 'Construction work', '0.00', NULL, '30 days', 0, '', '', '0.00', '', 1, NULL, '', '<p>Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item Intro Item</p>\n'),
(3, 2, NULL, 'QT_ME_172', '2022-10-07', 'New', '2022-10-07 15:00:31', '2022-10-07 15:00:31', NULL, NULL, ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', 'PROJECT NAME', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', '', '0.00', NULL, '', 0, '', '', '0.00', '', 2, NULL, '', ''),
(4, 3, NULL, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-07 15:01:29', NULL, NULL, ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', 'PROJECT NAME', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', '', '0.00', NULL, '', 0, '', '', '0.00', '', 3, NULL, '', ''),
(5, 3, NULL, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-07 15:01:29', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '0.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', 3, NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n'),
(6, 3, NULL, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-07 15:01:29', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '0.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', 3, NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n'),
(7, 3, NULL, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-18 18:23:14', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '0.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', 3, NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n'),
(8, 4, NULL, 'QT_ME_174', '2022-10-18', 'New', '2022-10-18 18:42:05', '2022-10-18 18:43:13', NULL, NULL, ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', 'PROJECT NAME', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', '', '0.00', NULL, '', 0, '', '', '0.00', '', 4, NULL, '', ''),
(9, NULL, 44, 'QT_ME_174', '2022-10-18', 'New', '2022-10-18 18:42:05', '2022-10-18 18:43:13', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, '', 'New Check 18 10', '0.00', NULL, '', 0, '', '', '0.00', '', 4, NULL, '', ''),
(10, NULL, 43, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-18 18:23:14', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '0.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', 3, NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n'),
(11, NULL, 43, 'QT_ME_173', '2022-10-07', 'New', '2022-10-07 15:01:29', '2022-10-18 20:01:37', NULL, NULL, '<p>:- Payment : COD<br />\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br />\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.</p>\n', NULL, 1, 0, NULL, 'Super Admin', NULL, 0, NULL, 'Super Admin', '', NULL, NULL, '', '', '', '', '', NULL, '', '', '', '', '', '', NULL, 'TIEUNELVELI', 'test1', '15000.00', NULL, '60 days', 0, '', '', '0.00', 'Cash', 3, NULL, '', '<p>&nbsp;cbnkvnkdv</p>\n');

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL,
  `receipt_code` varchar(55) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `mode_of_payment` varchar(55) DEFAULT NULL,
  `remarks` text,
  `date` date DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `receipt_status` varchar(100) NOT NULL,
  `cheque_date` date DEFAULT NULL,
  `bank_name` varchar(500) DEFAULT NULL,
  `site_id` int(11) NOT NULL,
  `cheque_no` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`receipt_id`, `receipt_code`, `amount`, `mode_of_payment`, `remarks`, `date`, `published`, `flag`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `order_id`, `receipt_status`, `cheque_date`, `bank_name`, `site_id`, `cheque_no`) VALUES
(1, 'REC-0152', 5216.25, 'Giro', '', '2022-10-18', NULL, 0, '2022-10-18 18:51:58', NULL, 'Super Admin', NULL, 1, 'Paid', NULL, '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `renewals`
--

CREATE TABLE `renewals` (
  `renewal_id` int(11) NOT NULL,
  `renewal_type` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `registrar` varchar(255) DEFAULT NULL,
  `server_name` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `auto_reminder` int(11) DEFAULT NULL,
  `remind_to` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `amount_for_domain` decimal(10,2) DEFAULT NULL,
  `amount_for_dns` decimal(10,2) DEFAULT NULL,
  `chargeable` int(10) DEFAULT NULL,
  `renewal_status` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sales_return_history`
--

CREATE TABLE `sales_return_history` (
  `sales_return_history_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `invoice_item_id` int(11) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `notes` text,
  `qty_return` decimal(10,2) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `flag` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `display_type` varchar(50) DEFAULT NULL,
  `show_navigation_panel` int(11) DEFAULT NULL,
  `description` text,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `external_link` varchar(500) DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `chi_description` text,
  `button_position` varchar(50) DEFAULT NULL,
  `template` varchar(255) DEFAULT NULL,
  `section_type` varchar(50) DEFAULT NULL,
  `meta_title` text,
  `meta_keyword` text,
  `meta_description` text,
  `access_to` varchar(50) DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `top_section_id` int(11) DEFAULT NULL,
  `internal_link` varchar(255) DEFAULT NULL,
  `show_in_nav` tinyint(4) NOT NULL DEFAULT '1',
  `seo_title` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `title`, `display_type`, `show_navigation_panel`, `description`, `sort_order`, `published`, `creation_date`, `modification_date`, `external_link`, `chi_title`, `chi_description`, `button_position`, `template`, `section_type`, `meta_title`, `meta_keyword`, `meta_description`, `access_to`, `published_test`, `top_section_id`, `internal_link`, `show_in_nav`, `seo_title`) VALUES
(1, 'Get Started', NULL, NULL, NULL, 1, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Get Started', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'get-started'),
(2, 'Lead', NULL, NULL, NULL, 2, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Lead', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'lead'),
(3, 'Opportunity', NULL, NULL, NULL, 3, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Opportunity', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'opportunity'),
(4, 'Project', NULL, NULL, NULL, 4, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Project', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'project'),
(5, 'Company', NULL, NULL, NULL, 5, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'company'),
(6, 'Contact', NULL, NULL, NULL, 6, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Contact', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'contact'),
(7, 'Supplier', NULL, NULL, NULL, 7, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Supplier', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'supplier'),
(8, 'Order', NULL, NULL, NULL, 8, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Order', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'order'),
(9, 'Invoice', NULL, NULL, NULL, 9, 1, '2015-12-11 12:05:08', '2015-12-11 12:05:17', NULL, NULL, NULL, 'Top', NULL, 'Invoice', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'invoice');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `service_code` varchar(50) DEFAULT NULL,
  `description` text,
  `price` float(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `setting_id` int(11) NOT NULL,
  `description` text,
  `key_text` varchar(255) DEFAULT NULL,
  `value` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `group_name` varchar(50) DEFAULT NULL,
  `value_type` varchar(25) DEFAULT NULL,
  `show_to_user` int(1) DEFAULT NULL,
  `chi_value` text,
  `used_for_admin` int(1) DEFAULT NULL,
  `used_for_www` int(1) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `site_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`setting_id`, `description`, `key_text`, `value`, `creation_date`, `modification_date`, `group_name`, `value_type`, `show_to_user`, `chi_value`, `used_for_admin`, `used_for_www`, `flag`, `site_id`) VALUES
(1, 'The prefix used for project code', 'projectCodePrefix', 'P-', '2008-03-05 16:20:57', '2016-04-29 16:37:01', 'Admin', 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(2, 'The next project code', 'nextProjectCode', '597', '2008-03-05 16:24:55', '2022-07-18 16:32:16', 'Admin', 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(3, 'The prefix used for invoice code', 'invoiceCodePrefix', 'INV_ME_', '2008-03-05 16:27:10', '2022-07-18 17:04:14', 'Admin', 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(5, 'The next opportunity code', 'nextOpportunityCode', '1073', '2008-03-05 16:27:10', '2016-04-29 15:49:54', 'Admin', 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(4, 'The prefix used for opportunity code', 'opportunityCodePrefix', 'O-', '2008-03-05 16:26:27', '2016-04-29 16:37:37', 'Admin', 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(6, 'Enquiry emails will be forwarded to this address', 'cp.adminEmail', 'arif@usoftsolutions.com', '2007-08-25 15:58:29', '2020-06-24 20:03:50', 'Email Settings', 'Text Field', 1, NULL, 0, 1, 0, 1),
(7, 'This is description for the site inserted between head tags', 'cp.metaDescription', '', '2007-08-25 15:58:29', '2007-08-25 15:58:29', 'Meta Data', 'Text Area', 1, NULL, 0, 1, 0, 1),
(8, 'These are the keywords for the site inserted between head tags', 'cp.metaKeyword', '', '2007-08-25 15:58:29', '2007-08-25 15:58:29', 'Meta Data', 'Text Area', 1, NULL, 0, 1, 0, 1),
(9, 'Site Title', 'cp.siteTitle', 'Cubosale Pte Ltd\n', '2007-08-25 15:58:30', '2022-09-01 07:04:47', 'Meta Data', 'Text Area', 1, NULL, 0, 1, 0, 1),
(10, 'The prefix used for quote code', 'quoteCodePrefix', 'QT_ME_', '2009-11-17 15:33:01', '2022-08-15 11:43:13', 'Admin', 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(11, 'The sales target for a month', 'monthlySalesTarget', '300000', '2010-10-21 07:16:00', '2010-10-22 06:14:31', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(12, 'Company Name', 'cp.companyName', 'Cubosale Pte Ltd', '2011-11-02 20:01:27', '2022-09-01 07:04:59', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(13, 'The prefix used for lead code', 'leadsPrefix', 'LD-', '2013-09-21 11:33:49', '2016-04-29 16:38:18', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(14, 'The next lead code', 'nextLeadsCode', '1', '2013-09-21 11:33:49', '2016-04-29 16:39:36', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(29, 'Fax number of company', 'cp.companyFax', '6850 5162', '2015-10-08 17:49:40', '2020-12-22 16:27:19', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(30, 'Website URL', 'cp.companyWebsite', 'Web : www.cubosale.com', '2015-10-08 18:15:02', '2021-02-20 11:05:18', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(15, 'The next quote code', 'nextQuoteCode', '131', '2015-03-26 15:38:13', '2020-08-21 20:18:28', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(16, 'Text of terms and condition in Quote', 'quoteTermsAndCondition', ':- Payment : COD<br/>\n:- The above quote does not cover replacement of any parts unless expressly stated above.<br/>\n:- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.', '2015-06-12 14:25:15', '2022-08-19 16:59:59', NULL, 'Text Area', 1, NULL, NULL, NULL, 0, 1),
(17, 'The next invoice code', 'nextInvoiceCode', '597', '2015-06-19 12:59:05', '2022-08-06 11:37:26', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(18, 'The prefix used for receipt code', 'receiptCodePrefix', 'REC-', '2015-06-20 13:03:57', '2016-04-29 16:38:43', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(19, 'The next receipt code', 'nextReceiptCode', '153', '2015-06-20 13:03:57', '2016-04-29 16:40:41', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(20, 'Address of the company.', 'cp.companyAddress1', '10 Jalan Besar', '2015-08-03 10:49:42', '2022-09-01 16:08:19', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(21, 'Address of the company.', 'cp.companyAddress2', '#15-02 Sim Lim Tower', '2015-08-03 10:50:42', '2022-09-01 07:22:33', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(22, 'Address of the company.', 'cp.companyAddress3', 'Singapore - 208787', '2015-08-03 10:51:30', '2022-09-01 16:08:33', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(23, 'Phone number', 'cp.companyPhone', '6493 2724', '2015-08-03 10:53:29', '2020-12-22 16:30:13', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(24, 'Reg.number', 'cp.companyUEN', 'UEN : 10000001G', '2015-08-03 10:54:45', '2020-06-24 20:14:59', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(25, 'GST Percentage', 'cp.gstPercentage', '7', '2015-08-03 10:55:49', '2015-08-03 10:56:04', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(26, 'The project code', 'cp.projectName', 'PROJECT NAME', '2015-08-03 10:56:33', '2020-05-14 14:37:44', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(27, 'The Meterials project code', 'cp.meterialsprojectName', 'PROJECT NAME', '2015-08-03 10:57:40', '2020-05-14 14:37:50', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(28, 'The purchase order project code', 'cp.poprojectName', 'PROJECT NAME', '2015-08-03 10:58:24', '2020-05-14 14:37:56', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(31, 'This is used to display the welcome text in the login form.', 'cp.adminLoginFormWelcomeText', 'WELCOME TO CUBOSALE SMART CON', '2019-12-30 15:53:40', '2022-09-01 07:05:24', NULL, 'Text Area', 1, NULL, NULL, NULL, 0, 1),
(32, 'Employee Code', 'nextEmployeeCode', '1101', '2020-03-30 19:12:27', '2020-03-30 19:12:44', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(33, 'Using this number credit note code is generated', 'nextCreditNoteCode', '1', '2020-05-18 16:10:41', '2020-05-18 16:11:10', NULL, 'Number Field', 1, NULL, NULL, NULL, 0, 1),
(34, 'Prefix for Credit Note', 'creditNotePrefix', 'CN', '2020-05-18 16:11:41', '2020-05-18 16:12:11', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(35, 'Company email', 'cp.companyEmail', 'Email : arif@usoftsolutions.com', '2020-06-24 19:57:14', '2022-09-01 07:05:41', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, 1),
(36, 'GST number', 'cp.gstNumber', 'GST & CO. REG NO. 200822688M', '2020-07-02 12:43:58', '2021-02-20 11:07:52', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(37, 'Address 1 for Manpower Footer', 'cp.footerManpowerInvoicecompanyAddress1', '10 Jalan Besar', '2020-07-01 22:16:13', '2022-09-01 16:08:57', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(38, 'Address 2 for Manpower Footer', 'cp.footerManpowerInvoicecompanyAddress2', '#15-02 Sim Lim Tower, Singapore - 208787', '2020-07-01 22:16:13', '2022-09-01 07:22:49', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(39, 'Address Line 4 for Manpower Footer', 'cp.footerManpowerInvoiceFooter4', 'Tel: +65 6396 7554, Fax: +65 6396 7554', '2020-07-01 22:16:13', '2021-02-20 11:08:14', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(40, 'Address Line 5 for Manpower Footer', 'cp.footerManpowerInvoiceFooter5', 'Website: www.cubosale.com', '2020-07-01 22:16:13', '2021-02-20 11:06:54', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(41, 'Address Line 5 for Manpower Footer', 'cp.companyNameForManPowerInvoice', 'Cubosale Pte Ltd', '2020-07-01 22:16:13', '2022-09-01 07:05:53', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(42, 'Using this number work order code is generated', 'nextWOCode', '34', '2020-12-18 17:57:44', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(43, 'Using this number receipt code is generated', 'wOCodePrefix', 'VIR/WO/', '2020-12-18 17:57:44', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(44, '', 'workOrderTermsAndCondition', '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', '2020-12-19 20:08:16', '2020-12-19 20:08:34', NULL, '', 1, NULL, NULL, NULL, 0, NULL),
(45, 'This is used to display the payment terms on the invoice form and pdf.', 'cp.paymentTermsInvoice', '<p>1.The above rates are in Singapore Dollars.</p>\n\n<p>2. Payment Terms 30 days from the date of Invoice</p>\n\n<p>3.Payment should be made in favor of " CUBOSALE ENGINEERING PTE LTD "</p>\n\n<p>4.Any discrepancies please write to us within 3 days from the date of invoice</p>\n\n<p> </p>\n\n<p>5. <u>For Account transfer</u></p>\n\n<p><strong>UNITED OVERSEAS BANK</strong></p>\n\n<p><strong>ACCT NAME: CUBOSALE ENGINEERING PTE LTD</strong></p>\n\n<p><strong>ACCT NO.:- 3923023427</strong></p>\n\n<p><strong>Paynow By UEN : 201222688M</strong></p>', '2020-12-21 16:06:02', '2022-09-01 07:07:07', NULL, 'Text Area', 1, NULL, NULL, NULL, 0, NULL),
(46, 'This is used to display the contact person name of the company in pdf signature.', 'cp.companyContactName', 'Mr. Benjamin Yun', '2020-12-30 20:51:25', '2020-12-30 20:53:49', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(47, 'This is used to set claim code.', 'nextClaimCode', '1019', '2020-12-30 21:46:45', '2020-12-30 22:00:22', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(48, 'Using this number quote code is generated in opportunity', 'nextQuoteCodeOpp', '176', '2020-12-31 13:44:46', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(49, 'This is used to add code for product.', 'nextProductItemCode', '1137', '2021-01-05 15:19:07', '2021-01-05 15:19:24', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(50, 'This is used to generate stock code for inventory.', 'inventoryCode', '1014', '2021-01-05 15:18:25', '2021-01-05 15:18:45', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(51, 'Using this project report % is calculated for orange color', 'projectReportPercentage', '10', '2021-01-05 20:53:48', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(52, 'Using this number work order code is generated', 'nextMRCode', '11', '2021-02-06 20:30:12', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(53, 'Using this number receipt code is generated', 'mRCodePrefix', 'VIR/MR/', '2021-02-06 20:30:12', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL),
(54, '', 'cp.addrs', '10 Jalan Besar', '2022-07-05 20:20:58', '2022-09-01 07:23:04', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(55, '', 'cp.country', 'Singapore - 209428', '2022-07-05 20:22:00', '2022-07-05 20:22:24', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(56, '', 'cp.regno', '201526293M', '2022-07-06 14:04:25', '2022-07-06 14:06:43', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(57, '', 'cp.address', '10 Jalan Besar, #15-02 Sim Lim Tower, Singapore - 208787', '2022-07-06 14:07:00', '2022-09-01 07:23:26', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(58, '', 'cp.email', 'arif@usoftsolutions.com', '2022-07-06 14:07:24', '2022-09-01 07:07:24', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(59, '', 'cp.gstn', 'GSTN: 201526293M', '2022-07-21 14:26:18', '2022-07-21 14:26:37', NULL, 'Text Field', 1, NULL, NULL, NULL, 0, NULL),
(60, 'Using this number po code is generated', 'nextPoCode', '1025', '2022-08-05 17:10:35', NULL, NULL, 'Number Field', 1, NULL, NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `site_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `admin_email` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `modification_date` date NOT NULL,
  `default_language` varchar(100) DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `flag` int(1) DEFAULT NULL,
  `site_url` varchar(255) DEFAULT NULL,
  `google_analytics_id` varchar(255) DEFAULT NULL,
  `tag_line` varchar(155) DEFAULT NULL,
  `tag_line2` varchar(155) DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `skin` varchar(50) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `ad_ops_site_name` varchar(255) DEFAULT NULL,
  `additional_meta_tags` text,
  `additional_analytics_script` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `staff_rate` int(10) DEFAULT NULL,
  `user_group_id` int(3) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` text,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `notes` text,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `protected` int(11) DEFAULT NULL,
  `user_name` varchar(25) DEFAULT NULL,
  `pass_word` varchar(25) DEFAULT NULL,
  `subscribe` int(1) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `address` text,
  `relationship` varchar(100) DEFAULT NULL,
  `known_as_name` varchar(255) DEFAULT NULL,
  `address_street1` varchar(255) DEFAULT NULL,
  `address_town1` varchar(255) DEFAULT NULL,
  `address_country1` varchar(255) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `random_no` bigint(50) DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  `member_status` varchar(20) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `section_name` varchar(100) DEFAULT NULL,
  `staff_type` varchar(100) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `content_update_alert` int(11) DEFAULT NULL,
  `show_sensitive_details` int(11) DEFAULT NULL,
  `current_status` varchar(25) DEFAULT NULL,
  `developer` tinyint(4) NOT NULL DEFAULT '0',
  `joined_date` date DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_rate`, `user_group_id`, `name`, `company_name`, `position`, `email`, `address_street`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `notes`, `sort_order`, `published`, `creation_date`, `modification_date`, `protected`, `user_name`, `pass_word`, `subscribe`, `first_name`, `last_name`, `mobile`, `religion`, `address`, `relationship`, `known_as_name`, `address_street1`, `address_town1`, `address_country1`, `flag`, `sex`, `date_of_birth`, `random_no`, `login_count`, `member_status`, `team`, `section_name`, `staff_type`, `status`, `content_update_alert`, `show_sensitive_details`, `current_status`, `developer`, `joined_date`, `employee_id`) VALUES
(1, NULL, 1, 'Admin', NULL, 'Super Admin', 'usstesting@gmail.com', '', '', '', '', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2014-11-21 17:29:02', NULL, NULL, 'smartcon1600', NULL, 'Super', 'Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '', NULL, '', 'Current', NULL, NULL, NULL, 1, NULL, NULL),
(14, NULL, 8, NULL, NULL, '', 'user2@cubosale.com', '', '', '', '', NULL, NULL, NULL, NULL, NULL, 1, '2022-07-09 15:09:11', '2022-09-01 12:55:50', NULL, NULL, 'user2', NULL, 'User 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '', NULL, '', 'Current', NULL, NULL, NULL, 0, NULL, NULL),
(12, NULL, 8, NULL, NULL, '', 'user1@cubosale.com', '', '', '', '', NULL, NULL, NULL, NULL, NULL, 1, '2022-01-22 12:23:16', '2022-09-01 12:56:01', NULL, NULL, 'user1', NULL, 'User 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '', NULL, '', 'Current', NULL, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff_group`
--

CREATE TABLE `staff_group` (
  `staff_group_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `staff_group_history`
--

CREATE TABLE `staff_group_history` (
  `staff_group_history_id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `staff_group_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `stock_history`
--

CREATE TABLE `stock_history` (
  `stock_history_id` int(11) NOT NULL,
  `po_product_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stock_history`
--

INSERT INTO `stock_history` (`stock_history_id`, `po_product_id`, `product_id`, `purchase_order_id`, `qty`, `creation_date`, `modification_date`) VALUES
(1, 3, 2, 2, '100.00', '2022-10-18 18:45:43', NULL),
(2, 1, 1, 1, '3.00', '2022-10-18 20:11:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_transfer`
--

CREATE TABLE `stock_transfer` (
  `stock_transfer_id` int(11) NOT NULL,
  `from_project_id` int(11) DEFAULT NULL,
  `to_project_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stock_transfer`
--

INSERT INTO `stock_transfer` (`stock_transfer_id`, `from_project_id`, `to_project_id`, `product_id`, `quantity`, `creation_date`, `modification_date`) VALUES
(1, 44, 4, 1, 100, '2022-10-18 18:47:42', NULL),
(2, 44, 23, 1, 1, '2022-10-18 20:30:19', NULL),
(3, 44, 13, 1, 1, '2022-10-18 20:40:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_transfer_history`
--

CREATE TABLE `stock_transfer_history` (
  `stock_transfer_history_id` int(11) NOT NULL,
  `stock_transfer_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT '0.00',
  `status` varchar(20) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `qty_requested` decimal(10,2) DEFAULT '0.00',
  `lock_record` int(1) DEFAULT NULL,
  `stock_deducted` int(1) DEFAULT NULL,
  `product_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `sub_category_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `chi_title` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT '0',
  `display_type` varchar(255) DEFAULT NULL,
  `published` int(1) DEFAULT NULL,
  `show_navigation_panel` int(1) DEFAULT NULL,
  `external_link` varchar(255) DEFAULT NULL,
  `sub_category_type` varchar(50) DEFAULT NULL,
  `template` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `published_test` int(1) DEFAULT NULL,
  `internal_link` varchar(255) DEFAULT NULL,
  `show_in_nav` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_con`
--

CREATE TABLE `sub_con` (
  `sub_con_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` text,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `comment_by` text,
  `company_size` varchar(20) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `supplier_type` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `chi_company_name` varchar(255) DEFAULT NULL,
  `chi_company_address` text,
  `company_address_id` int(11) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `billing_address_flat` varchar(255) DEFAULT NULL,
  `billing_address_street` varchar(255) DEFAULT NULL,
  `billing_address_country` varchar(255) DEFAULT NULL,
  `billing_address_po_code` varchar(255) DEFAULT NULL,
  `gst_no` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_con`
--

INSERT INTO `sub_con` (`sub_con_id`, `company_name`, `email`, `address_street`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `notes`, `creation_date`, `modification_date`, `mobile`, `flag`, `address_flat`, `status`, `website`, `category`, `comment_by`, `company_size`, `industry`, `source`, `group_name`, `supplier_type`, `created_by`, `modified_by`, `chi_company_name`, `chi_company_address`, `company_address_id`, `contact_person`, `billing_address_flat`, `billing_address_street`, `billing_address_country`, `billing_address_po_code`, `gst_no`) VALUES
(1, 'united technologies', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-10-21 13:35:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_con_payments`
--

CREATE TABLE `sub_con_payments` (
  `sub_con_payments_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `sub_con_id` int(11) DEFAULT NULL,
  `work_order` varchar(255) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remarks` text,
  `mode_of_payment` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_con_payments_history`
--

CREATE TABLE `sub_con_payments_history` (
  `sub_con_payments_history_id` int(11) NOT NULL,
  `sub_con_work_order_id` int(11) DEFAULT NULL,
  `sub_con_payments_id` int(11) DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `work_order_date` date DEFAULT NULL,
  `invoice_paid_status` varchar(500) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `receipt_type` varchar(25) DEFAULT NULL,
  `related_sub_con_work_order_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_con_work_order`
--

CREATE TABLE `sub_con_work_order` (
  `sub_con_work_order_id` int(11) NOT NULL,
  `sub_con_worker_code` varchar(255) DEFAULT NULL,
  `work_order_date` date DEFAULT NULL,
  `work_order_due_date` date DEFAULT NULL,
  `completed_date` date DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `sub_con_id` int(11) DEFAULT NULL,
  `work_order` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `project_location` varchar(255) DEFAULT NULL,
  `project_reference` varchar(255) DEFAULT NULL,
  `condition` text,
  `quote_date` date DEFAULT NULL,
  `quote_reference` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_con_work_order`
--

INSERT INTO `sub_con_work_order` (`sub_con_work_order_id`, `sub_con_worker_code`, `work_order_date`, `work_order_due_date`, `completed_date`, `project_id`, `sub_con_id`, `work_order`, `status`, `creation_date`, `modification_date`, `created_by`, `modified_by`, `project_location`, `project_reference`, `condition`, `quote_date`, `quote_reference`) VALUES
(1, 'VIR/WO/0025/22', '2022-10-18', NULL, NULL, 42, NULL, NULL, 'New', '2022-10-18 15:48:53', '2022-10-18 15:48:53', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(2, 'VIR/WO/0026/22', '2022-10-18', NULL, NULL, 42, NULL, NULL, 'New', '2022-10-18 16:00:01', '2022-10-18 16:00:01', '', '', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(3, 'VIR/WO/0027/22', '2022-10-18', NULL, NULL, 38, NULL, NULL, 'New', '2022-10-18 16:18:03', '2022-10-18 16:18:03', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(4, 'VIR/WO/0028/22', '2022-10-18', NULL, NULL, 38, NULL, NULL, 'New', '2022-10-18 16:18:21', '2022-10-18 16:18:21', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(5, 'VIR/WO/0029/22', '2022-10-18', '2022-10-20', '2022-11-24', 43, NULL, '', 'Confirmed', '2022-10-18 18:42:31', '2022-10-18 18:42:31', 'Super Admin', 'Super Admin', 'TIRUNELVELI', 'RAVI', '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', '2022-10-19', ''),
(6, 'VIR/WO/0030/22', '2022-10-18', '2022-11-30', NULL, 44, NULL, '', 'Confirmed', '2022-10-18 18:48:18', '2022-10-18 18:48:18', 'Super Admin', 'Super Admin', '', '', '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, ''),
(7, 'VIR/WO/0031/22', '2022-10-18', NULL, NULL, 44, NULL, NULL, 'New', '2022-10-18 18:48:47', '2022-10-18 18:49:27', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(8, 'VIR/WO/0032/22', '2022-10-18', NULL, NULL, 43, NULL, NULL, 'New', '2022-10-18 19:38:43', '2022-10-18 19:38:43', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL),
(9, 'VIR/WO/0033/22', '2022-10-18', NULL, NULL, 43, NULL, NULL, 'New', '2022-10-18 19:41:59', '2022-10-18 19:41:59', 'Super Admin', 'Super Admin', NULL, NULL, '1. All works must be carried out under your supervisor staff & site staff instruction.\n2. All foreign workers must posses valid work permit and SOC in accfordance to \'Employ of foreign Workers Act\'. All fines, losses and expenses in\nconnection shall be deduted from progress payments accordingly.\n3. All the worker or workers shall strictly adhere to all safety procedures implemented on site by the Contractor and the Main Contractor. Any\nmonetary set-off, fine of financial loss suffered by the Contractor due to non-compliance by the Sub-Contractor shall be recovered from any\nmonies due or which may become due under this work order.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_street` text,
  `address_town` varchar(255) DEFAULT NULL,
  `address_state` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  `address_po_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `notes` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `address_flat` varchar(255) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `comment_by` text,
  `company_size` varchar(20) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `supplier_type` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `chi_company_name` varchar(255) DEFAULT NULL,
  `chi_company_address` text,
  `company_address_id` int(11) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `billing_address_flat` varchar(255) DEFAULT NULL,
  `billing_address_street` varchar(255) DEFAULT NULL,
  `billing_address_country` varchar(255) DEFAULT NULL,
  `billing_address_po_code` varchar(255) DEFAULT NULL,
  `gst_no` varchar(100) DEFAULT NULL,
  `terms` varchar(100) DEFAULT NULL,
  `payment_details` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `company_name`, `email`, `address_street`, `address_town`, `address_state`, `address_country`, `address_po_code`, `phone`, `fax`, `notes`, `creation_date`, `modification_date`, `mobile`, `flag`, `address_flat`, `status`, `website`, `category`, `comment_by`, `company_size`, `industry`, `source`, `group_name`, `supplier_type`, `created_by`, `modified_by`, `chi_company_name`, `chi_company_address`, `company_address_id`, `contact_person`, `billing_address_flat`, `billing_address_street`, `billing_address_country`, `billing_address_po_code`, `gst_no`, `terms`, `payment_details`) VALUES
(1, 'abc company', 'dh', 'singapore', NULL, '', 'SG', '', NULL, '', NULL, '2022-10-18 18:38:31', '2022-10-18 18:39:14', '538969887', NULL, 'singapore', 'Current', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Super Admin', 'Super Admin', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', ''),
(2, 'ABC New company Pte Ltd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_order`
--

CREATE TABLE `supplier_order` (
  `supplier_order_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `so_code` varchar(25) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_order_history`
--

CREATE TABLE `supplier_order_history` (
  `supplier_order_history_id` int(11) NOT NULL,
  `supplier_order_id` int(11) DEFAULT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_receipt`
--

CREATE TABLE `supplier_receipt` (
  `supplier_receipt_id` int(11) NOT NULL,
  `receipt_code` varchar(55) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `mode_of_payment` varchar(55) DEFAULT NULL,
  `remarks` text,
  `date` date DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `receipt_status` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `cheque_date` date DEFAULT NULL,
  `bank_name` varchar(500) DEFAULT NULL,
  `issued_by` varchar(300) DEFAULT NULL,
  `cheque_no` int(11) DEFAULT NULL,
  `coi_no` varchar(100) DEFAULT NULL,
  `company_contact_salutation` varchar(10) DEFAULT NULL,
  `company_contact_name` varchar(255) DEFAULT NULL,
  `cust_first_name` varchar(255) DEFAULT NULL,
  `cust_email` varchar(50) DEFAULT NULL,
  `cust_address1` varchar(100) DEFAULT NULL,
  `cust_address2` varchar(100) DEFAULT NULL,
  `cust_address_po_code` varchar(10) DEFAULT NULL,
  `cust_address_country_code` varchar(2) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `advance_payment_used` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_receipt_history`
--

CREATE TABLE `supplier_receipt_history` (
  `supplier_receipt_history_id` int(11) NOT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `supplier_receipt_id` int(11) DEFAULT NULL,
  `published` tinyint(4) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `invoice_paid_status` varchar(500) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `installment_id` int(11) DEFAULT NULL,
  `receipt_type` varchar(25) DEFAULT NULL,
  `related_purchase_order_id` int(11) DEFAULT NULL,
  `gst_amount` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `published` int(1) DEFAULT NULL,
  `member_only` int(1) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `total_hours` int(11) DEFAULT NULL,
  `status` text,
  `notes` longtext,
  `timesheet_id` int(11) DEFAULT NULL,
  `task_code` varchar(20) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `chargeable` int(1) NOT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `project_manager_id` int(11) DEFAULT NULL,
  `category` varchar(200) DEFAULT NULL,
  `estimated_hours` float(5,2) DEFAULT NULL,
  `staff_alert` int(11) DEFAULT NULL,
  `project_manager_alert` int(11) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `release_task_status` tinyint(4) NOT NULL,
  `select_date` date DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `handled_by_staff_id` int(11) DEFAULT NULL,
  `handled_by_reason` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_history`
--

CREATE TABLE `task_history` (
  `task_history_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `comments` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `percentage` varchar(10) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `send_mail` int(1) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `task_history_now` tinyint(4) DEFAULT NULL,
  `priority` varchar(55) DEFAULT NULL,
  `progress_percent` varchar(55) DEFAULT NULL,
  `sort_by` varchar(255) DEFAULT NULL,
  `estd_hrs` float(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_staff`
--

CREATE TABLE `task_staff` (
  `task_staff_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `current` tinyint(4) NOT NULL,
  `task_now` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `template_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `record_type` varchar(25) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `description` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;

-- --------------------------------------------------------

--
-- Table structure for table `third_party_cost`
--

CREATE TABLE `third_party_cost` (
  `third_party_cost_id` int(10) NOT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `item_title` varchar(50) DEFAULT NULL,
  `budget_amount` int(11) DEFAULT NULL,
  `actual_amount` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `published` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 PACK_KEYS=0;

-- --------------------------------------------------------

--
-- Table structure for table `timesheet`
--

CREATE TABLE `timesheet` (
  `timesheet_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `hours` float(5,2) DEFAULT NULL,
  `chargeable` int(1) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `opportunity_id` int(11) DEFAULT NULL,
  `total_cost` int(11) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `task_history_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `trainer` varchar(100) DEFAULT NULL,
  `description` text,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `flag` int(1) DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `training_company_name` varchar(255) DEFAULT NULL,
  `training_company_address` varchar(255) DEFAULT NULL,
  `training_company_email` varchar(255) DEFAULT NULL,
  `training_company_phone` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `training_staff`
--

CREATE TABLE `training_staff` (
  `training_staff_id` int(11) NOT NULL,
  `training_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `translation`
--

CREATE TABLE `translation` (
  `translation_id` int(11) NOT NULL,
  `key_text` varchar(255) DEFAULT NULL,
  `value` text,
  `chi_value` text,
  `creation_date` date DEFAULT NULL,
  `modification_date` date DEFAULT NULL,
  `group_name` varchar(50) DEFAULT NULL,
  `is_html_text` varchar(1) DEFAULT NULL,
  `show_to_user` int(1) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `translation`
--

INSERT INTO `translation` (`translation_id`, `key_text`, `value`, `chi_value`, `creation_date`, `modification_date`, `group_name`, `is_html_text`, `show_to_user`, `flag`) VALUES
(1, 'quoteIntroText1', 'Quote Intro Text', 'We are pleased to submit our proposal as follows for your kind consideration.', '2020-02-10', '2020-02-10', 'Other', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `user_group_id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `user_group_type` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`user_group_id`, `title`, `user_group_type`, `creation_date`, `modification_date`) VALUES
(1, 'Super Administrator', NULL, NULL, NULL),
(2, 'Tender', 'User', NULL, '2021-01-13 10:20:45'),
(3, 'HR', 'User', NULL, '2021-01-13 10:16:33'),
(4, 'Admin and Purchase', 'User', '2021-01-13 10:15:55', '2021-01-13 16:20:03'),
(5, 'Tender and Project', 'User', '2021-01-13 10:19:14', '2021-01-13 10:20:34'),
(6, 'Projects', 'Super Administrator', '2021-01-13 10:21:46', '2021-01-13 10:23:20'),
(7, 'Accounts', 'User', '2021-01-13 10:23:33', '2021-01-13 10:24:52'),
(8, 'Super Admin', 'Super Administrator', '2021-01-13 18:14:52', '2022-08-10 20:16:31'),
(9, 'Testing Universal', 'Super Administrator', '2021-01-16 19:19:36', '2021-01-16 19:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `valuelist`
--

CREATE TABLE `valuelist` (
  `valuelist_id` int(11) NOT NULL,
  `key_text` varchar(255) DEFAULT NULL,
  `value` text,
  `chi_value` text,
  `creation_date` date DEFAULT NULL,
  `modification_date` date DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `flag` tinyint(4) DEFAULT '0',
  `code` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `valuelist`
--

INSERT INTO `valuelist` (`valuelist_id`, `key_text`, `value`, `chi_value`, `creation_date`, `modification_date`, `sort_order`, `flag`, `code`) VALUES
(1, 'companyCategory', 'Client', NULL, '2007-09-27', NULL, 1, 0, NULL),
(2, 'companyCategory', 'Supplier', NULL, '2007-09-27', NULL, 2, 0, NULL),
(3, 'companyStatus', 'Current', NULL, '2007-09-27', NULL, 3, 0, NULL),
(4, 'companyStatus', 'Old', NULL, '2007-09-27', NULL, 4, 0, NULL),
(5, 'opportunityChance', '10%', NULL, '2007-09-27', NULL, 5, 0, NULL),
(6, 'opportunityChance', '50%', NULL, '2007-09-27', NULL, 6, 0, NULL),
(7, 'opportunityChance', '95%', NULL, '2007-09-27', NULL, 7, 0, NULL),
(8, 'opportunityStatus', 'Not Awarded', NULL, '2007-09-27', '2021-01-07', 238, 0, ''),
(728, 'paymentQuoteType', '15 days', NULL, '2021-01-15', '2021-01-15', 240, 0, ''),
(10, 'opportunityStatus', 'Awarded', NULL, '2007-09-27', '2021-01-07', 237, 0, ''),
(11, 'projectCategory', 'Project', NULL, '2007-09-28', '2020-12-18', 11, 0, ''),
(12, 'projectCategory', 'Maintenance', NULL, '2007-09-28', '2020-12-18', 12, 0, ''),
(14, 'percentCompleted', '0', NULL, '2007-09-28', NULL, 14, 0, NULL),
(15, 'staffTeam', 'In-house', NULL, '2007-09-28', NULL, 15, 0, NULL),
(16, 'percentCompleted', '100', NULL, '2007-09-28', NULL, 21, 0, NULL),
(17, 'percentCompleted', '50', NULL, '2007-09-28', NULL, 18, 0, NULL),
(18, 'percentCompleted', '25', NULL, '2007-09-28', NULL, 17, 0, NULL),
(19, 'percentCompleted', '75', NULL, '2007-09-28', NULL, 19, 0, NULL),
(20, 'percentCompleted', '10', NULL, '2007-09-28', NULL, 16, 0, NULL),
(21, 'percentCompleted', '90', NULL, '2007-09-28', NULL, 20, 0, NULL),
(22, 'taskStatus', 'Due', NULL, '2007-09-28', NULL, 22, 0, NULL),
(23, 'taskStatus', 'Late', NULL, '2007-09-28', NULL, 23, 0, NULL),
(24, 'taskStatus', 'Complete', NULL, '2007-09-28', NULL, 24, 0, NULL),
(25, 'taskStatus', 'Cancelled', NULL, '2007-09-28', NULL, 25, 0, NULL),
(26, 'taskCategory', 'Project Inclusive', NULL, '2007-09-28', NULL, 26, 0, NULL),
(27, 'taskCategory', 'Extra Work', NULL, '2007-09-28', NULL, 27, 0, NULL),
(28, 'taskCategory', 'Fix', NULL, '2007-09-28', NULL, 28, 0, NULL),
(29, 'projectStatus', 'WIP', NULL, '2007-09-28', NULL, 29, 0, NULL),
(30, 'projectStatus', 'Billable', NULL, '2007-09-28', NULL, 30, 0, NULL),
(31, 'projectStatus', 'Billed', NULL, '2007-09-28', NULL, 31, 0, NULL),
(32, 'projectStatus', 'Complete', NULL, '2007-09-28', NULL, 32, 0, NULL),
(33, 'projectStatus', 'Cancelled', NULL, '2007-09-28', NULL, 33, 0, NULL),
(34, 'projectStatus', 'On Hold', NULL, '2007-09-28', NULL, 34, 0, NULL),
(35, 'staffTeam', '3rd Party', NULL, '2007-09-28', NULL, 35, 0, NULL),
(39, 'taskCategory', 'Opportunity Related', NULL, '2007-10-03', NULL, 39, 0, NULL),
(40, 'invoiceStatus', 'Due', NULL, '2007-10-29', NULL, 40, 0, NULL),
(41, 'invoiceStatus', 'Paid', NULL, '2007-10-29', NULL, 41, 0, NULL),
(42, 'invoiceStatus', 'Late', NULL, '2007-10-29', NULL, 42, 0, NULL),
(44, 'invoiceTerms', 'This invoice is due immediately. Please make cheque payable to Boxx Engineering Pte Ltd.', NULL, '2007-10-29', '2014-09-08', 44, 0, NULL),
(47, 'projectDifficulty', '1', NULL, '2007-12-16', NULL, 47, 0, NULL),
(48, 'projectDifficulty', '2', NULL, '2007-12-16', NULL, 48, 0, NULL),
(49, 'projectDifficulty', '3', NULL, '2007-12-16', NULL, 49, 0, NULL),
(50, 'projectDifficulty', '4', NULL, '2007-12-16', NULL, 50, 0, NULL),
(51, 'projectDifficulty', '5', NULL, '2007-12-16', NULL, 51, 0, NULL),
(52, 'companySize', 'Small', NULL, '2007-12-16', NULL, 52, 0, NULL),
(53, 'companySize', 'Medium', NULL, '2007-12-16', NULL, 53, 0, NULL),
(54, 'companySize', 'Large', NULL, '2007-12-16', NULL, 54, 0, NULL),
(55, 'companyIndustry', 'Property', NULL, '2007-12-16', NULL, 65, 0, NULL),
(56, 'companyIndustry', 'Retail b2b', NULL, '2007-12-16', NULL, 66, 0, NULL),
(57, 'companyIndustry', 'Retail b2c', NULL, '2007-12-16', NULL, 67, 0, NULL),
(58, 'companyIndustry', 'Financial', NULL, '2007-12-16', NULL, 62, 0, NULL),
(59, 'companyIndustry', 'Organisation', NULL, '2007-12-16', NULL, 64, 0, NULL),
(60, 'companyIndustry', 'Creative', NULL, '2007-12-16', NULL, 60, 0, NULL),
(61, 'companySource', 'Referral', NULL, '2007-12-16', NULL, 61, 0, NULL),
(62, 'companySource', 'Direct', NULL, '2007-12-16', NULL, 62, 0, NULL),
(63, 'companySource', 'Agency', NULL, '2007-12-16', NULL, 63, 0, NULL),
(64, 'serviceType', 'Pilot CMS', NULL, '2007-12-16', NULL, 64, 0, NULL),
(65, 'serviceType', 'SEO', NULL, '2007-12-16', NULL, 65, 0, NULL),
(66, 'serviceType', 'Usability', NULL, '2007-12-16', NULL, 66, 0, NULL),
(67, 'serviceType', 'Hosting', NULL, '2007-12-16', NULL, 67, 0, NULL),
(68, 'serviceType', 'Other', NULL, '2007-12-16', NULL, 68, 0, NULL),
(69, 'serviceType', 'Retainer', NULL, '2007-12-16', NULL, 69, 0, NULL),
(70, 'serviceType', 'Servoy', NULL, '2007-12-16', NULL, 70, 0, NULL),
(71, 'serviceType', 'Mail ++', NULL, '2007-12-16', NULL, 71, 0, NULL),
(72, 'serviceType', 'Filemaker Pro', NULL, '2007-12-16', NULL, 72, 0, NULL),
(74, 'companyIndustry', 'Real Estate', NULL, '2008-01-09', NULL, 76, 0, NULL),
(133, 'projectStatus', 'Latest', NULL, '2009-04-04', NULL, 113, 0, NULL),
(76, 'companyIndustry', 'Trading', NULL, '2008-01-09', NULL, 77, 0, NULL),
(77, 'companyIndustry', 'Service', NULL, '2008-01-10', NULL, 68, 0, NULL),
(78, 'companyIndustry', 'Medical', NULL, '2008-01-10', NULL, 74, 0, NULL),
(79, 'companyIndustry', 'Media', NULL, '2008-01-10', NULL, 63, 0, NULL),
(80, 'companyIndustry', 'Education', NULL, '2008-01-10', NULL, 61, 0, NULL),
(132, 'companyIndustry', 'Software', NULL, '2008-12-25', NULL, 112, 0, NULL),
(82, 'companyIndustry', 'Others', NULL, '2008-01-10', NULL, 75, 0, NULL),
(83, 'clientType', 'New Client', NULL, '2008-01-14', NULL, 83, 0, NULL),
(84, 'clientType', 'Repeat Client', NULL, '2008-01-14', NULL, 84, 0, NULL),
(87, 'companyIndustry', 'Management', NULL, '2008-01-15', NULL, 73, 0, NULL),
(88, 'companyIndustry', 'Legal', NULL, '2008-01-15', NULL, 72, 0, NULL),
(89, 'percentCompleted', '30', NULL, '2008-01-24', NULL, 88, 0, NULL),
(90, 'percentCompleted', '20', NULL, '2008-01-24', NULL, 89, 0, NULL),
(91, 'percentCompleted', '80', NULL, '2008-01-24', NULL, 90, 0, NULL),
(92, 'percentCompleted', '30', NULL, '2008-01-24', NULL, 91, 0, NULL),
(729, 'paymentQuoteType', '30 days', NULL, '2021-01-15', '2021-01-15', 241, 0, ''),
(111, 'thirdPartyItem', 'Programming (Syed USS )', NULL, '2008-08-14', NULL, 108, 0, NULL),
(95, 'invoiceType', 'Deposit Invoice', NULL, '2008-02-08', NULL, 93, 0, NULL),
(96, 'invoiceType', 'Invoice', NULL, '2008-02-08', NULL, 94, 0, NULL),
(97, 'invoiceType', 'Final Invoice', NULL, '2008-02-08', NULL, 95, 0, NULL),
(723, 'opportunityStatus', 'In Progress', NULL, '2021-01-11', '2021-01-11', 10, 0, ''),
(99, 'staffType', 'Staff', NULL, '2008-02-18', NULL, 96, 0, NULL),
(100, 'staffType', 'Project Manager', NULL, '2008-02-18', NULL, 97, 0, NULL),
(101, 'contactTitle', 'Ms', NULL, '2008-02-18', NULL, 98, 0, NULL),
(102, 'contactTitle', 'Mr', NULL, '2008-02-18', NULL, 99, 0, NULL),
(103, 'contactTitle', 'Mrs', NULL, '2008-02-18', NULL, 100, 0, NULL),
(104, 'supplierType', 'Wholesaler', NULL, '2008-02-25', '2014-09-08', 101, 0, NULL),
(105, 'supplierType', 'Retailer', NULL, '2008-02-25', '2014-09-08', 102, 0, NULL),
(106, 'supplierType', 'Broker', NULL, '2008-02-25', '2014-09-08', 103, 0, NULL),
(107, 'supplierType', '2nd middle man', NULL, '2008-02-25', '2014-09-08', 104, 0, NULL),
(108, 'supplierType', '3rd middle man', NULL, '2008-02-25', '2014-09-08', 105, 0, NULL),
(109, 'staffStatus', 'Current', NULL, '2008-03-04', NULL, 106, 0, NULL),
(110, 'staffStatus', 'Archive', NULL, '2008-03-04', NULL, 107, 0, NULL),
(112, 'thirdPartyItem', 'Graphic desgin (shiny)', NULL, '2008-08-14', NULL, 109, 0, NULL),
(113, 'taskCategory', 'Discussion', NULL, '2008-02-21', NULL, 65, 0, NULL),
(114, 'taskCategory', 'Explaination to Staff', NULL, '2008-02-22', NULL, 66, 0, NULL),
(115, 'paidOn', 'Jan', NULL, '2008-02-27', NULL, 67, 0, NULL),
(116, 'paidOn', 'Feb', NULL, '2008-02-27', NULL, 68, 0, NULL),
(117, 'paidOn', 'Mar', NULL, '2008-02-27', NULL, 69, 0, NULL),
(118, 'paidOn', 'Apr', NULL, '2008-02-27', NULL, 70, 0, NULL),
(119, 'paidOn', 'May', NULL, '2008-02-27', NULL, 71, 0, NULL),
(120, 'paidOn', 'Jun', NULL, '2008-02-27', NULL, 72, 0, NULL),
(121, 'paidOn', 'Jul', NULL, '2008-02-27', NULL, 73, 0, NULL),
(122, 'paidOn', 'Aug', NULL, '2008-02-27', NULL, 74, 0, NULL),
(123, 'paidOn', 'Sep', NULL, '2008-02-27', NULL, 75, 0, NULL),
(124, 'paidOn', 'Oct', NULL, '2008-02-27', NULL, 76, 0, NULL),
(125, 'paidOn', 'Nov', NULL, '2008-02-27', NULL, 77, 0, NULL),
(126, 'paidOn', 'Dec', NULL, '2008-02-27', NULL, 78, 0, NULL),
(127, 'priority', '1', NULL, '2008-06-02', NULL, 79, 0, NULL),
(128, 'priority', '2', NULL, '2008-06-02', NULL, 80, 0, NULL),
(129, 'priority', '3', NULL, '2008-06-02', NULL, 81, 0, NULL),
(130, 'taskCategory', 'Today\'s task', NULL, '2008-12-17', NULL, 110, 0, NULL),
(131, 'taskCategory', 'Task by Admin', NULL, '2008-12-24', NULL, 111, 0, NULL),
(134, 'quoteItemType', 'in-house', NULL, NULL, NULL, NULL, 0, NULL),
(135, 'quoteItemType', '3rd party', NULL, NULL, NULL, NULL, 0, NULL),
(136, 'quoteItemType', 'discount IH', NULL, NULL, NULL, NULL, 0, NULL),
(137, 'quoteItemType', 'discount 3P', NULL, NULL, NULL, NULL, 0, NULL),
(138, 'quoteStatus', 'Draft', NULL, NULL, NULL, NULL, 0, NULL),
(139, 'quoteStatus', 'Sent', NULL, NULL, NULL, NULL, 0, NULL),
(140, 'quoteStatus', 'Agreed', NULL, NULL, NULL, NULL, 0, NULL),
(141, 'quoteStatus', 'Cancelled', NULL, NULL, NULL, NULL, 0, NULL),
(142, 'quoteCategoryType', 'Normal', NULL, NULL, NULL, NULL, 0, NULL),
(143, 'quoteCategoryType', 'Discount', NULL, NULL, NULL, NULL, 0, NULL),
(144, 'quoteCategoryName', 'Design', NULL, NULL, NULL, NULL, 0, NULL),
(145, 'quoteCategoryName', 'Programming', NULL, NULL, NULL, NULL, 0, NULL),
(146, 'quoteCategoryName', 'Discount', NULL, NULL, NULL, NULL, 0, NULL),
(147, 'quoteCategoryName', 'Hosting', NULL, NULL, NULL, NULL, 0, NULL),
(148, 'quoteCategoryName', 'SEO & SEM', NULL, NULL, NULL, NULL, 0, NULL),
(149, 'quoteType', 'HK$', NULL, NULL, NULL, NULL, 0, NULL),
(150, 'quoteType', 'other $', NULL, NULL, NULL, NULL, 0, NULL),
(151, 'quoteType', 'No line items', NULL, NULL, NULL, NULL, 0, NULL),
(152, 'companyIndustry', 'Jewellery', NULL, '2010-10-11', '2010-10-11', 114, 0, NULL),
(153, 'companyIndustry', 'Technology', NULL, '2010-10-11', '2010-10-11', 115, 0, NULL),
(154, 'taskHistoryStatus', 'In-Progress', NULL, '2010-10-31', '2010-10-31', 116, 0, NULL),
(155, 'taskHistoryStatus', 'Resolved', NULL, '2010-10-31', '2010-10-31', 117, 0, NULL),
(156, 'taskHistoryStatus', 'Tested', NULL, '2010-10-31', '2010-10-31', 118, 0, NULL),
(157, 'taskHistoryStatus', 'Completed', NULL, '2010-10-31', '2010-10-31', 119, 0, NULL),
(158, 'staffCurrentStatus', 'Can add Projects', NULL, '2010-11-02', '2010-11-03', 120, 0, NULL),
(159, 'staffCurrentStatus', 'Cannot add Projects', NULL, '2010-11-02', '2010-11-03', 121, 0, NULL),
(160, 'staffCurrentStatus', 'Intermediate', NULL, '2010-11-02', '2010-11-03', 122, 0, NULL),
(166, 'ideasByWhen', 'Next Month', NULL, '2010-11-04', '2010-11-04', 125, 0, NULL),
(165, 'ideasByWhen', 'This Month', NULL, '2010-11-04', '2010-11-04', 124, 0, NULL),
(164, 'taskHistoryStatus', 'To be Started', NULL, '2010-11-03', '2010-11-04', 123, 0, NULL),
(167, 'ideasByWhen', 'In Three Months', NULL, '2010-11-04', '2010-11-04', 126, 0, NULL),
(168, 'ideasByWhen', 'This Year', NULL, '2010-11-04', '2010-11-04', 127, 0, NULL),
(169, 'ideasByWhen', 'Next Year', NULL, '2010-11-04', '2010-11-04', 128, 0, NULL),
(170, 'ideasByWhen', 'In Future', NULL, '2010-11-04', '2010-11-04', 129, 0, NULL),
(171, 'ideasStatus', 'In-Progress', NULL, '2010-11-04', '2010-11-04', 130, 0, NULL),
(172, 'ideasStatus', 'To be Started', NULL, '2010-11-04', '2010-11-04', 131, 0, NULL),
(173, 'ideasStatus', 'Completed', NULL, '2010-11-04', '2010-11-04', 132, 0, NULL),
(174, 'ideasStatus', 'Ignored', NULL, '2010-11-04', '2010-11-04', 133, 0, NULL),
(175, 'projectStage', 'CMS Blueprint', NULL, '2010-11-05', '2010-11-05', 134, 0, NULL),
(176, 'projectStage', 'CMS Programming', NULL, '2010-11-05', '2010-11-05', 135, 0, NULL),
(177, 'projectStage', 'Front-end Development', NULL, '2010-11-05', '2010-11-05', 136, 0, NULL),
(178, 'projectStage', 'Testing', NULL, '2010-11-05', '2010-11-05', 137, 0, NULL),
(179, 'projectStage', 'Fixes', NULL, '2010-11-05', '2010-11-05', 138, 0, NULL),
(180, 'ideasType', 'Khankha Related', NULL, '2010-11-05', '2010-11-05', 139, 0, NULL),
(181, 'ideasType', 'Product', NULL, '2010-11-05', '2010-11-05', 140, 0, NULL),
(182, 'ideasType', 'Trading', NULL, '2010-11-05', '2010-11-05', 141, 0, NULL),
(190, 'projectStage', 'Completed', NULL, '2010-11-05', '2010-11-05', 149, 0, NULL),
(184, 'ideasType', 'Edukloud', NULL, '2010-11-05', '2010-11-05', 143, 0, NULL),
(185, 'ideasType', 'Property', NULL, '2010-11-05', '2010-11-05', 144, 0, NULL),
(186, 'ideasType', 'Marketing', NULL, '2010-11-05', '2010-11-05', 145, 0, NULL),
(187, 'ideasType', 'USS SG Related', NULL, '2010-11-05', '2010-11-05', 146, 0, NULL),
(188, 'ideasType', 'USS HK Related', NULL, '2010-11-05', '2010-11-05', 147, 0, NULL),
(189, 'ideasType', 'Branches Overseas', NULL, '2010-11-05', '2010-11-05', 148, 0, NULL),
(191, 'currency', 'HK$', NULL, '2010-11-07', '2010-11-07', 150, 0, NULL),
(192, 'currency', 'US$', NULL, '2010-11-07', '2010-11-07', 151, 0, NULL),
(193, 'currency', 'INR', NULL, '2010-11-07', '2010-11-07', 152, 0, NULL),
(194, 'currency', 'SG$', NULL, '2010-11-07', '2010-11-07', 153, 0, NULL),
(196, 'quoteType', 'US$', NULL, '2010-11-16', '2010-11-16', 155, 0, NULL),
(197, 'quoteType', 'SG$', NULL, '2010-11-16', '2010-11-16', 156, 0, NULL),
(198, 'quoteCategoryName', 'Non-programming', NULL, '2010-11-16', '2010-11-16', 157, 0, NULL),
(199, 'quoteCategoryName', 'Functionality & Usability Analysis', NULL, '2010-11-16', '2010-11-16', 158, 0, NULL),
(200, 'quoteCategoryName', 'Maintenance', NULL, '2010-11-16', '2010-11-16', 159, 0, NULL),
(201, 'quoteCategoryName', 'Content Provision', NULL, '2010-11-16', '2010-11-16', 160, 0, NULL),
(202, 'quoteCategoryName', 'Plugin', NULL, '2010-11-16', '2010-11-16', 161, 0, NULL),
(203, 'quoteCategoryName', 'Domain Registration / Renewal', NULL, '2010-11-16', '2010-11-16', 162, 0, NULL),
(204, 'quoteCategoryName', 'License fee', NULL, '2010-11-16', '2010-11-16', 163, 0, NULL),
(205, 'ideasType', 'Technical', NULL, '2010-11-27', '2010-11-27', 164, 0, NULL),
(206, 'taskStatus', 'On Hold', NULL, '2010-12-03', '2010-12-03', 165, 0, NULL),
(207, 'taskCategory', 'Testing', NULL, '2010-12-04', '2010-12-04', 166, 0, NULL),
(208, 'taskHistoryStatus', 'Reopened', NULL, '2010-12-15', '2010-12-15', 167, 0, NULL),
(209, 'taskHistoryStatus', 'To Clarify', NULL, '2010-12-15', '2010-12-15', 168, 0, NULL),
(210, 'invoiceTerms', 'This invoice is due in 30 days. Please transfer to OCBC A/C - 787-828-823', NULL, '2010-12-25', '2014-09-08', 169, 0, NULL),
(211, 'ideasType', 'Publishers', NULL, '2011-01-30', '2011-01-30', 170, 0, NULL),
(212, 'companyIndustry', 'Money Exchange', NULL, '2011-10-15', '2011-10-15', 171, 0, NULL),
(213, 'invoiceTerms', 'This invoice is due immediately. Please transfer money to Boxx Engineering Pte Ltd', NULL, '2012-02-04', '2014-09-08', 172, 0, NULL),
(272, 'invoiceNotes', 'Invoice terms are not applicable. Make the payment to company name.', NULL, '2014-09-08', '2014-09-08', 183, 0, NULL),
(271, 'invoiceNotes', 'Invoice is system generated. No signature is required.', NULL, '2014-09-08', '2014-09-08', 182, 0, NULL),
(215, 'quoteCategoryName', 'Task Title', NULL, '2012-07-03', '2012-07-03', 174, 0, NULL),
(216, 'typeOfLeave', 'Holiday', NULL, '2012-11-01', '2012-11-01', 175, 0, NULL),
(217, 'typeOfLeave', 'Personal Leave', NULL, '2012-11-01', '2012-11-01', 176, 0, NULL),
(218, 'typeOfLeave', 'Sick Leave', NULL, '2012-11-01', '2012-11-01', 177, 0, NULL),
(219, 'typeOfLeave', 'Pay leave', NULL, '2012-11-01', '2012-11-01', 178, 0, NULL),
(221, 'mailStatus', 'Update', NULL, '2013-02-03', NULL, NULL, 0, NULL),
(222, 'mailStatus', 'Resolved', NULL, '2013-02-03', '2013-02-14', NULL, 0, NULL),
(223, 'taskStatus', 'Closed', NULL, '2013-02-04', '2013-02-04', 180, 0, NULL),
(224, 'taskHistoryPriority', 'Priority 1', NULL, '2013-02-15', NULL, NULL, 0, NULL),
(225, 'taskHistoryPriority', 'Priority 2', NULL, '2013-02-15', NULL, NULL, 0, NULL),
(226, 'taskHistoryPriority', 'Priority 3', NULL, '2013-02-15', NULL, NULL, 0, NULL),
(227, 'taskHistoryPriority', 'Priority 4', NULL, '2013-02-15', NULL, NULL, 0, NULL),
(228, 'taskHistoryprogressPercent', '0%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(229, 'taskHistoryprogressPercent', '10%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(230, 'taskHistoryprogressPercent', '20%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(231, 'taskHistoryprogressPercent', '30%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(232, 'taskHistoryprogressPercent', '40%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(233, 'taskHistoryprogressPercent', '50%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(234, 'taskHistoryprogressPercent', '60%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(235, 'taskHistoryprogressPercent', '70%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(236, 'taskHistoryprogressPercent', '80%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(237, 'taskHistoryprogressPercent', '90%', NULL, '2013-02-16', NULL, NULL, 0, NULL),
(238, 'mailStatus', 'Clarify', NULL, '2013-02-23', NULL, NULL, 0, NULL),
(239, 'taskHistoryPriority', 'Priority 5', NULL, '2013-02-24', NULL, NULL, 0, NULL),
(240, 'taskHistoryPriority', 'Priority 6', NULL, '2013-02-24', NULL, NULL, 0, NULL),
(241, 'taskHistoryPriority', 'Priority 7', NULL, '2013-02-24', NULL, NULL, 0, NULL),
(242, 'taskHistoryPriority', 'Priority 8', NULL, '2013-02-24', NULL, NULL, 0, NULL),
(243, 'taskHistoryPriority', 'Priority 9', NULL, '2013-02-24', NULL, NULL, 0, NULL),
(244, 'taskHistoryPriority', 'Work Later', NULL, '2013-02-24', '2013-04-15', NULL, 0, NULL),
(245, 'mailStatus', 'Not Resolved', NULL, '2013-02-27', NULL, NULL, 0, NULL),
(246, 'taskHistoryprogressPercent', '100%', NULL, '2013-02-27', NULL, NULL, 0, NULL),
(247, 'expenseType', 'Income', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(248, 'expenseType', 'Expense', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(249, 'accountGroup', 'Assets', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(250, 'accountGroup', 'Liability', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(251, 'accountGroup', 'Deposits', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(252, 'accountGroup', 'Accounts Receivable', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(253, 'accountGroup', 'Organisation Expenses', NULL, '2013-03-30', NULL, NULL, 0, NULL),
(254, 'invoiceStatus', 'Cancelled', NULL, '2013-04-30', '2013-04-30', 181, 0, NULL),
(255, 'callRegistryIndustry', 'Construction', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(256, 'callRegistryIndustry', 'Marine', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(257, 'callRegistryIndustry', 'Manufacturing', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(258, 'callRegistryIndustry', 'Service', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(259, 'callRegistryIndustry', 'Process Construction', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(260, 'callRegistryIndustry', 'Others', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(261, 'callRegistryCategory', 'Tele Marketing', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(262, 'callRegistryCategory', 'Direct Calling', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(263, 'callRegistryReffer', 'Advertisement', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(264, 'callRegistryReffer', 'Website', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(265, 'callRegistryReffer', 'Referral', NULL, '2013-09-21', '2016-04-21', NULL, 0, ''),
(266, 'callRegistryStatus', 'Not Interested', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(267, 'callRegistryStatus', 'Short Time Follow up', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(268, 'callRegistryStatus', 'Long Time Follow up', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(269, 'callRegistryStatus', 'High Win Ratio', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(270, 'callRegistryStatus', 'Converted to Opportunity', NULL, '2013-09-21', NULL, NULL, 0, NULL),
(273, 'employeeWorkType', 'Part time', NULL, '2015-04-07', '2015-04-07', 184, 0, NULL),
(274, 'employeeWorkType', 'Full Time', NULL, '2015-04-07', '2015-04-07', 185, 0, NULL),
(275, 'positionType', 'Construction Worker', NULL, '2015-04-14', '2015-09-03', NULL, 0, NULL),
(276, 'paymentType', 'Cash', NULL, '2015-06-20', NULL, NULL, 0, NULL),
(277, 'paymentType', 'Cheque', NULL, '2015-06-20', NULL, NULL, 0, NULL),
(278, 'paymentType', 'Giro', NULL, '2015-06-20', '2020-06-01', NULL, 0, ''),
(279, 'positionType', 'GENERAL MANAGER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(280, 'positionType', 'ASS.GENERAL MANAGER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(281, 'positionType', 'SAFETY CO-ORDINATOR', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(282, 'positionType', 'ADMIN', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(283, 'positionType', 'TECHNICAL CONSULTANT', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(284, 'positionType', 'HR CUM GENERAL ADMIN', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(285, 'positionType', 'LOGISTIC CHECKER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(286, 'positionType', 'SEN STRUC ENGINEER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(287, 'positionType', 'SEN NETWORK ENG/MAN', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(288, 'positionType', 'PROJECT ENGINEER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(289, 'positionType', 'DATA NETWORK ENG ANA', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(290, 'positionType', 'APPLICATION ENGINEER', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(291, 'positionType', 'INFORMATION SYSTEM ENG', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(292, 'positionType', 'GENERAL ACCOUNTANT', NULL, '2015-09-03', NULL, NULL, 0, NULL),
(293, 'invoiceTypes', 'Normal', NULL, '2015-12-18', '2015-12-18', 186, 0, NULL),
(294, 'invoiceTypes', 'LOT', NULL, '2015-12-18', '2015-12-18', 187, 0, NULL),
(295, 'quoteSignatory', 'HAMEED', NULL, '2015-12-28', '2015-12-28', 188, 0, 'General Manager'),
(296, 'quoteSignatory', 'FAISAL', NULL, '2015-12-28', '2015-12-28', 189, 0, 'Project Manager'),
(297, 'opportunitySourceChannel', 'Direct', NULL, '2016-01-22', '2016-01-22', 190, 0, ''),
(298, 'opportunitySourceChannel', 'Referrel', NULL, '2016-01-22', '2016-01-22', 191, 0, ''),
(299, 'companyIndustry', 'Telecom', NULL, '2016-04-08', '2016-04-08', 192, 0, ''),
(300, 'callRegistryIndustry', 'Telecom', NULL, '2016-04-14', '2016-04-14', 193, 0, ''),
(301, 'quoteColumn', 'Worker Name', NULL, '2016-05-27', '2016-05-27', 194, 0, ''),
(302, 'quoteColumn', 'Admin Charges', NULL, '2016-05-27', '2016-05-27', 195, 0, ''),
(303, 'quoteColumn', 'Workers Salary', NULL, '2016-05-27', '2016-05-27', 196, 0, ''),
(304, 'quoteColumn', 'Transport Charges', NULL, '2016-05-27', '2016-05-27', 197, 0, ''),
(305, 'quoteColumn', 'Overtime Hours', NULL, '2016-05-27', '2016-05-27', 198, 0, ''),
(306, 'quoteColumn', 'Overtime Rate', NULL, '2016-05-27', '2016-05-27', 199, 0, ''),
(307, 'employeeStatus', 'Active', NULL, '2016-06-07', '2016-06-07', 200, 0, ''),
(308, 'employeeStatus', 'Archive', NULL, '2016-06-07', '2016-06-07', 201, 0, ''),
(309, 'invoiceStatus', 'Partial Payment', NULL, '2016-07-25', '2016-07-25', 202, 0, ''),
(310, 'nationality', 'Afghan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(311, 'nationality', 'Albanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(312, 'nationality', 'Algerian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(313, 'nationality', 'American', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(314, 'nationality', 'American', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(315, 'nationality', 'Andorran', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(316, 'nationality', 'Angolan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(317, 'nationality', 'Antiguans', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(318, 'nationality', 'Argentinean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(319, 'nationality', 'Armenian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(320, 'nationality', 'Australian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(321, 'nationality', 'Austrian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(322, 'nationality', 'Azerbaijani', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(323, 'nationality', 'Bahamian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(324, 'nationality', 'Bahraini', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(325, 'nationality', 'Bangladeshi', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(326, 'nationality', 'Barbadian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(327, 'nationality', 'Batswana', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(328, 'nationality', 'Belarusian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(329, 'nationality', 'Belgian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(330, 'nationality', 'Belizean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(331, 'nationality', 'Beninese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(332, 'nationality', 'Bhutanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(333, 'nationality', 'Bolivian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(334, 'nationality', 'Bosnian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(335, 'nationality', 'Herzegovinian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(336, 'nationality', 'Brazilian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(337, 'nationality', 'British', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(338, 'nationality', 'Bruneian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(339, 'nationality', 'Bulgarian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(340, 'nationality', 'Burkinabe', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(341, 'nationality', 'Burmese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(342, 'nationality', 'Burundian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(343, 'nationality', 'Cambodian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(344, 'nationality', 'Cameroonian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(345, 'nationality', 'Canadian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(346, 'nationality', 'Cape Verdian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(347, 'nationality', 'Central African', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(348, 'nationality', 'Chadian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(349, 'nationality', 'Chilean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(350, 'nationality', 'Chinese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(351, 'nationality', 'Colombian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(352, 'nationality', 'Comoran', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(353, 'nationality', 'Congolese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(354, 'nationality', 'Costa Rican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(355, 'nationality', 'Croatian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(356, 'nationality', 'Cuban', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(357, 'nationality', 'Cypriot', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(358, 'nationality', 'Czech', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(359, 'nationality', 'Danish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(360, 'nationality', 'Djibouti', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(361, 'nationality', 'Dominican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(362, 'nationality', 'Dominican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(363, 'nationality', 'Dutch', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(364, 'nationality', 'Ecuadorean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(365, 'nationality', 'Egyptian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(366, 'nationality', 'Emirian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(367, 'nationality', 'Equatorial Guinean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(368, 'nationality', 'Eritrean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(369, 'nationality', 'Estonian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(370, 'nationality', 'Ethiopian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(371, 'nationality', 'Fijian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(372, 'nationality', 'Filipino', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(373, 'nationality', 'Finnish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(374, 'nationality', 'French', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(375, 'nationality', 'Gabonese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(376, 'nationality', 'Gambian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(377, 'nationality', 'Georgian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(378, 'nationality', 'German', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(379, 'nationality', 'Ghanaian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(380, 'nationality', 'Greek', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(381, 'nationality', 'Grenadian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(382, 'nationality', 'Guatemalan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(383, 'nationality', 'Guinea-Bissauan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(384, 'nationality', 'Guinean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(385, 'nationality', 'Guyanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(386, 'nationality', 'Haitian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(387, 'nationality', 'Honduran', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(388, 'nationality', 'Hungarian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(389, 'nationality', 'Icelander', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(390, 'nationality', 'I-Kiribati', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(391, 'nationality', 'Indian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(392, 'nationality', 'Indonesian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(393, 'nationality', 'Iranian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(394, 'nationality', 'Iraqi', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(395, 'nationality', 'Irish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(396, 'nationality', 'Israeli', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(397, 'nationality', 'Italian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(398, 'nationality', 'Ivorian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(399, 'nationality', 'Jamaican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(400, 'nationality', 'Japanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(401, 'nationality', 'Jordanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(402, 'nationality', 'Kazakhstani', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(403, 'nationality', 'Kenyan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(404, 'nationality', 'Kirghiz', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(405, 'nationality', 'Kittian and Nevisian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(406, 'nationality', 'Kuwaiti', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(407, 'nationality', 'Laotian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(408, 'nationality', 'Latvian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(409, 'nationality', 'Lebanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(410, 'nationality', 'Liberian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(411, 'nationality', 'Libyan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(412, 'nationality', 'Liechtensteiner', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(413, 'nationality', 'Lithuanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(414, 'nationality', 'Luxembourger', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(415, 'nationality', 'Macedonian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(416, 'nationality', 'Malagasy', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(417, 'nationality', 'Malawian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(418, 'nationality', 'Malaysian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(419, 'nationality', 'Maldivan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(420, 'nationality', 'Malian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(421, 'nationality', 'Maltese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(422, 'nationality', 'Marshallese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(423, 'nationality', 'Mauritanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(424, 'nationality', 'Mauritian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(425, 'nationality', 'Mexican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(426, 'nationality', 'Micronesian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(427, 'nationality', 'Moldovan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(428, 'nationality', 'Monegasque', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(429, 'nationality', 'Mongolian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(430, 'nationality', 'Moroccan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(431, 'nationality', 'Mosotho', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(432, 'nationality', 'Mozambican', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(433, 'nationality', 'Namibian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(434, 'nationality', 'Nauruan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(435, 'nationality', 'Nepalese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(436, 'nationality', 'New Zealander', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(437, 'nationality', 'Nicaraguan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(438, 'nationality', 'Nigerian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(439, 'nationality', 'Nigerien', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(440, 'nationality', 'Ni-Vanuatu', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(441, 'nationality', 'North Korean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(442, 'nationality', 'Norwegian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(443, 'nationality', 'Omani', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(444, 'nationality', 'Pakistani', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(445, 'nationality', 'Palauan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(446, 'nationality', 'Palestinian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(447, 'nationality', 'Panamanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(448, 'nationality', 'Papua New Guinean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(449, 'nationality', 'Paraguayan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(450, 'nationality', 'Peruvian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(451, 'nationality', 'Polish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(452, 'nationality', 'Portuguese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(453, 'nationality', 'Qatari', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(454, 'nationality', 'Romanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(455, 'nationality', 'Russian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(456, 'nationality', 'Rwandan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(457, 'nationality', 'Saint Lucian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(458, 'nationality', 'Salvadoran', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(459, 'nationality', 'Sammarinese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(460, 'nationality', 'Samoan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(461, 'nationality', 'Sao Tomean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(462, 'nationality', 'Saudi Arabian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(463, 'nationality', 'Senegalese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(464, 'nationality', 'Serbian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(465, 'nationality', 'Seychellois', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(466, 'nationality', 'Sierra Leonean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(467, 'nationality', 'Singaporean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(468, 'nationality', 'Slovak', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(469, 'nationality', 'Slovene', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(470, 'nationality', 'Solomon Islander', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(471, 'nationality', 'Somali', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(472, 'nationality', 'South African', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(473, 'nationality', 'South Korean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(474, 'nationality', 'Spanish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(475, 'nationality', 'Sri Lankan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(476, 'nationality', 'Sudanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(477, 'nationality', 'Surinamer', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(478, 'nationality', 'Swazi', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(479, 'nationality', 'Swedish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(480, 'nationality', 'Swiss', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(481, 'nationality', 'Syrian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(482, 'nationality', 'Tadzhik', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(483, 'nationality', 'Taiwanese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(484, 'nationality', 'Tanzanian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(485, 'nationality', 'Thai', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(486, 'nationality', 'Togolese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(487, 'nationality', 'Tongan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(488, 'nationality', 'Trinidadian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(489, 'nationality', 'Tunisian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(490, 'nationality', 'Turkish', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(491, 'nationality', 'Turkmen', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(492, 'nationality', 'Tuvaluan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(493, 'nationality', 'Ugandan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(494, 'nationality', 'Ukrainian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(495, 'nationality', 'Uruguayan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(496, 'nationality', 'Uzbekistani', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(497, 'nationality', 'Venezuelan', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(498, 'nationality', 'Vietnamese', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(499, 'nationality', 'Yemeni', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(500, 'nationality', 'Zambian', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(501, 'nationality', 'Zimbabwean', NULL, '2016-05-02', NULL, NULL, 0, NULL),
(502, 'employeeType', 'Bangladeshi Worker', NULL, '2015-07-20', NULL, NULL, 0, NULL),
(503, 'employeeType', 'Service Worker', NULL, '2015-07-20', NULL, NULL, 0, NULL),
(504, 'employeeType', 'Indian Worker', NULL, '2015-07-20', NULL, NULL, 0, NULL),
(505, 'employeeType', 'S Pass', NULL, '2015-07-20', NULL, NULL, 0, NULL),
(506, 'employeeWorkType', 'Part time', NULL, '2015-04-07', '2015-04-07', 184, 0, NULL),
(507, 'employeeWorkType', 'Full Time', NULL, '2015-04-07', '2015-04-07', 185, 0, NULL),
(508, 'positionType', 'Software Engineer', NULL, '2015-04-14', NULL, NULL, 0, NULL),
(509, 'positionType', 'ADMIN', NULL, '2016-02-01', NULL, NULL, 0, NULL),
(510, 'salutation', 'Mr', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(511, 'salutation', 'Mrs', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(512, 'salutation', 'Ms', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(513, 'gender', 'Male', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(514, 'gender', 'Female', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(515, 'maritalStatus', 'Single', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(516, 'maritalStatus', 'Married', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(517, 'race', 'AAFRICAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(518, 'race', 'ACHEHNESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(519, 'race', 'AFGHAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(520, 'race', 'ALBANIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(521, 'race', 'AMBONESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(522, 'race', 'AMERICAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(523, 'race', 'ANGLO BURMESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(524, 'race', 'ANGLO CHINESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(525, 'race', 'ANGLO FILIPINO', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(526, 'race', 'ANGLO INDIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(527, 'race', 'ANGLO SAXON', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(528, 'race', 'ANGLO THAI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(529, 'race', 'ANNAMITE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(530, 'race', 'ARAB', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(531, 'race', 'ARMENIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(532, 'race', 'ARYAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(533, 'race', 'ASSAMI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(534, 'race', 'AUSTRALIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(535, 'race', 'AUSTRIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(536, 'race', 'AZERI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(537, 'race', 'BAJAU', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(538, 'race', 'BANGALA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(539, 'race', 'BANGLADESHI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(540, 'race', 'BANJARESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(541, 'race', 'BATAK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(542, 'race', 'BELGIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(543, 'race', 'BENGALI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(544, 'race', 'BHUTANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(545, 'race', 'BISAYA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(546, 'race', 'BOYANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(547, 'race', 'BRAHMIN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(548, 'race', 'BRAZILIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(549, 'race', 'BRITISH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(550, 'race', 'BUGIS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(551, 'race', 'BULGARIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(552, 'race', 'BURGHER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(553, 'race', 'BURMESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(554, 'race', 'BUTONESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(555, 'race', 'CANADIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(556, 'race', 'CAPE COLOURED', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(557, 'race', 'CAUCASIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(558, 'race', 'CEYLON MOOR', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(559, 'race', 'CEYLONESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(560, 'race', 'CHINESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(561, 'race', 'COCOS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(562, 'race', 'CZECH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(563, 'race', 'CZECHOSLOVAK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(564, 'race', 'DANE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(565, 'race', 'DAYAK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(566, 'race', 'DUSUN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(567, 'race', 'DUTCH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(568, 'race', 'DUTCH BURGHER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(569, 'race', 'EGYPTIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(570, 'race', 'ENGLISH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(571, 'race', 'ETHIOPIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(572, 'race', 'EURASIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(573, 'race', 'EUROPEAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(574, 'race', 'FIJIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(575, 'race', 'FILIPINO', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(576, 'race', 'FINN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(577, 'race', 'FRENCH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(578, 'race', 'GERMAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(579, 'race', 'GHANAIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(580, 'race', 'GOANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(581, 'race', 'GREEK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(582, 'race', 'GUJARATI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(583, 'race', 'GURKHA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(584, 'race', 'HAWAIIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(585, 'race', 'HINDUSTANI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(586, 'race', 'HOLLANDER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(587, 'race', 'IBAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(588, 'race', 'ICELANDER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(589, 'race', 'INDIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(590, 'race', 'INDONESIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(591, 'race', 'IRANIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(592, 'race', 'IRAQI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(593, 'race', 'IRISH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(594, 'race', 'ISOKO', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(595, 'race', 'ISRAELI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(596, 'race', 'ITALIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(597, 'race', 'JAMAICAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(598, 'race', 'JAPANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(599, 'race', 'JAVANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(600, 'race', 'JEW', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(601, 'race', 'JORDANIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(602, 'race', 'KACHIN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(603, 'race', 'KADAZAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(604, 'race', 'KAMPUCHEAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(605, 'race', 'KAREN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(606, 'race', 'KAZAKH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(607, 'race', 'KELABIT', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(608, 'race', 'KENYAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(609, 'race', 'KHASI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(610, 'race', 'KHMER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(611, 'race', 'KOREAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(612, 'race', 'LAO', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(613, 'race', 'LEBANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(614, 'race', 'LIBYAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(615, 'race', 'MAHRATTA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(616, 'race', 'MAKASARESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(617, 'race', 'MALABARI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(618, 'race', 'MALAGASY', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(619, 'race', 'MALAY', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(620, 'race', 'MALAYALEE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(621, 'race', 'MALDIVIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(622, 'race', 'MALTESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(623, 'race', 'MANIPURI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(624, 'race', 'MAORI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(625, 'race', 'MARATHI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(626, 'race', 'MAURITIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(627, 'race', 'MELANAU', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(628, 'race', 'MELANESIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(629, 'race', 'METIS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(630, 'race', 'MEXICAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(631, 'race', 'MINANGKABAU', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(632, 'race', 'MOLDAVIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(633, 'race', 'MONGOLIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(634, 'race', 'MURUT', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(635, 'race', 'NAGA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(636, 'race', 'NAURUAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(637, 'race', 'NEGRO', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(638, 'race', 'NEPALESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(639, 'race', 'NETHERLANDER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(640, 'race', 'NEW ZEALANDER', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(641, 'race', 'NEWAR', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(642, 'race', 'NIGERIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(643, 'race', 'NORWEGIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(644, 'race', 'OTHER EURASIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(645, 'race', 'OTHER INDIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(646, 'race', 'OTHER INDONESIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(647, 'race', 'OTHERS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(648, 'race', 'PAKISTANI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(649, 'race', 'PALESTINE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(650, 'race', 'PARSEE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(651, 'race', 'PATHAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(652, 'race', 'PENAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(653, 'race', 'PERSIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(654, 'race', 'PERUVIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(655, 'race', 'POLE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(656, 'race', 'POLYNESIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(657, 'race', 'PORTUGUESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(658, 'race', 'PUNJABI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(659, 'race', 'RAJPUT', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(660, 'race', 'RAKHINE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(661, 'race', 'RUSSIAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(662, 'race', 'SCOT', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(663, 'race', 'SERANI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(664, 'race', 'SERB/MONT', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(665, 'race', 'SEYCHELLOIS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(666, 'race', 'SHAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(667, 'race', 'SIKH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(668, 'race', 'SINDHI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(669, 'race', 'SINHALESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(670, 'race', 'SINO JAPANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(671, 'race', 'SINO KADAZAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(672, 'race', 'SLOVAK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(673, 'race', 'SPANISH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(674, 'race', 'SRI LANKAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(675, 'race', 'SUDANESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(676, 'race', 'SUMATRAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(677, 'race', 'SWEDE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(678, 'race', 'SWISS', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(679, 'race', 'TAMIL', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(680, 'race', 'TELUGU', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(681, 'race', 'THAI', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(682, 'race', 'TIBETAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(683, 'race', 'TONGAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(684, 'race', 'TURK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(685, 'race', 'UKRAINIA', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(686, 'race', 'UNKNOWN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(687, 'race', 'UZBEK', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(688, 'race', 'VENEZUELAN', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(689, 'race', 'VIETNAMESE', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(690, 'race', 'WELSH', NULL, '2016-08-31', NULL, NULL, 0, NULL),
(691, 'religion', 'HINDU', NULL, '2018-11-12', '2018-11-12', 213, 0, NULL),
(692, 'religion', 'CHRISTIAN', NULL, '2018-11-12', '2018-11-12', 214, 0, NULL),
(693, 'religion', 'MUSLIM', NULL, '2018-11-12', '2018-11-12', 215, 0, NULL),
(694, 'religion', 'BUDDHIST', NULL, '2018-11-12', '2018-11-12', 216, 0, NULL),
(695, 'employeeCategory', 'Insulator', NULL, '2020-04-04', '2020-04-04', 217, 0, ''),
(696, 'employeeCategory', 'Rigger', NULL, '2020-04-04', '2020-04-04', 218, 0, '');
INSERT INTO `valuelist` (`valuelist_id`, `key_text`, `value`, `chi_value`, `creation_date`, `modification_date`, `sort_order`, `flag`, `code`) VALUES
(697, 'employeeCategory', 'Signalman', NULL, '2020-04-04', '2020-04-04', 219, 0, ''),
(698, 'employeeCategory', 'Supervisor', NULL, '2020-04-04', '2020-04-04', 220, 0, ''),
(699, 'employeeCategory', 'Electrician', NULL, '2020-06-23', '2020-06-23', 221, 0, ''),
(700, 'singaporeHolidays', '2020-01-01,2020-01-25,2020-01-26,2020-01-27,2020-04-10,2020-05-01,2020-05-07,2020-05-24,2020-05-25,2020-07-31,2020-08-09,2020-08-10,2020-11-14,2020-12-25', NULL, NULL, NULL, NULL, 0, '2020'),
(701, 'timesheetType', 'Monthly', NULL, NULL, NULL, NULL, 0, NULL),
(702, 'timesheetType', 'Fortnightly', NULL, NULL, NULL, NULL, 0, NULL),
(703, 'employeeCategory', 'Scaffolder', NULL, '2020-07-08', '2020-07-08', 222, 0, ''),
(704, 'employeeCategory', 'Lifting Supervisor', NULL, '2020-08-21', '2020-08-21', 223, 0, ''),
(705, 'employeeCategory', 'Rigger / Signalman', NULL, '2020-08-21', '2020-08-21', 224, 0, ''),
(706, 'employeeCategory', '6G SS Welder', NULL, '2020-08-21', '2020-08-21', 225, 0, ''),
(707, 'employeeCategory', 'Pipe Fitter', NULL, '2020-08-21', '2020-08-21', 226, 0, ''),
(708, 'employeeCategory', 'Scaffold Supervisor', NULL, '2020-08-21', '2020-08-21', 227, 0, ''),
(709, 'employeeCategory', 'General Worker', NULL, '2020-08-21', '2020-08-21', 228, 0, ''),
(710, 'services', 'Task 1', NULL, '2020-12-14', '2020-12-14', 229, 0, ''),
(711, 'services', 'Task 2', NULL, '2020-12-14', '2020-12-14', 230, 0, ''),
(712, 'services', 'Task 3', NULL, '2020-12-14', NULL, 231, 0, NULL),
(713, 'projectCategory', 'Tenancy Project', NULL, '2020-12-18', '2020-12-18', 232, 0, ''),
(714, 'projectCategory', 'Tenancy Work', NULL, '2020-12-18', '2020-12-18', 233, 0, ''),
(715, 'projectDesignation', 'Manager', NULL, '2020-12-19', NULL, NULL, 0, NULL),
(716, 'projectDesignation', 'Supervisor', NULL, '2020-12-19', NULL, NULL, 0, NULL),
(717, 'projectDesignation', 'Employee', NULL, '2020-12-19', NULL, NULL, 0, NULL),
(718, 'team', 'Team A', NULL, '2020-12-19', '2020-12-21', NULL, 0, ''),
(719, 'team', 'Team B', NULL, '2020-12-19', '2020-12-21', NULL, 0, ''),
(720, 'team', 'Team C', NULL, '2020-12-19', '2020-12-21', NULL, 0, ''),
(721, 'team', 'Team D', NULL, '2020-12-19', '2020-12-21', NULL, 0, ''),
(722, 'paymentQuoteType', 'COD', NULL, '2020-12-22', '2020-12-22', 234, 0, ''),
(724, 'opportunityStatus', 'Waiting for Approval', NULL, '2021-01-11', '2021-01-11', 11, 0, ''),
(725, 'opportunityStatus', 'Submitted', NULL, '2021-01-11', '2021-01-11', 235, 0, ''),
(726, 'opportunityStatus', 'Follow-up', NULL, '2021-01-11', '2021-01-11', 236, 0, ''),
(727, 'opportunityStatus', 'Converted to Project', NULL, '2021-01-11', '2021-01-11', 239, 0, ''),
(730, 'paymentQuoteType', '60 days', NULL, '2021-01-15', '2021-01-15', 242, 0, ''),
(731, 'companyIndustry', 'Electrical', NULL, '2022-07-12', NULL, 243, 0, NULL),
(732, 'companyname', 'Mikas', NULL, '2022-07-12', '2022-07-12', 244, 0, ''),
(733, 'companyname', 'Delta', NULL, '2022-07-12', '2022-07-12', 245, 0, ''),
(734, 'companyname', 'Supply', NULL, '2022-07-12', '2022-07-12', 246, 0, ''),
(735, 'companyname', 'Others', NULL, '2022-07-12', '2022-07-12', 247, 0, ''),
(736, 'opportunityStatus', 'Cancelled', NULL, '2022-08-15', '2022-08-15', 248, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `vehicle_id` int(11) NOT NULL,
  `vehicle_no` varchar(200) DEFAULT NULL,
  `year_of_purchase` varchar(200) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_fuel`
--

CREATE TABLE `vehicle_fuel` (
  `vehicle_fuel_id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `liters` varchar(200) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_insurance`
--

CREATE TABLE `vehicle_insurance` (
  `vehicle_insurance_id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `insurance_date` date DEFAULT NULL,
  `insurance_amount` decimal(10,2) DEFAULT NULL,
  `renewal_date` date DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_service`
--

CREATE TABLE `vehicle_service` (
  `vehicle_service_id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `modified_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `work_order_line_items`
--

CREATE TABLE `work_order_line_items` (
  `work_order_line_items_id` int(11) NOT NULL,
  `quote_category_id` int(10) DEFAULT NULL,
  `description` text,
  `amount` decimal(10,2) DEFAULT NULL,
  `unit_rate` decimal(10,0) DEFAULT NULL,
  `item_type` varchar(200) DEFAULT NULL,
  `sort_order` int(10) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  `title` text,
  `sub_con_work_order_id` int(11) DEFAULT NULL,
  `actual_amount` int(11) DEFAULT NULL,
  `supplier_amount` int(11) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `remarks` text,
  `part_no` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `work_order_line_items`
--

INSERT INTO `work_order_line_items` (`work_order_line_items_id`, `quote_category_id`, `description`, `amount`, `unit_rate`, `item_type`, `sort_order`, `creation_date`, `modification_date`, `title`, `sub_con_work_order_id`, `actual_amount`, `supplier_amount`, `quantity`, `project_id`, `created_by`, `modified_by`, `unit`, `remarks`, `part_no`) VALUES
(1, NULL, 'Test Desc Work Order', '4000.00', '80', NULL, NULL, '2022-10-18 18:49:27', NULL, NULL, 7, NULL, NULL, '50', 44, 'Super Admin', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actual_costing_summary`
--
ALTER TABLE `actual_costing_summary`
  ADD PRIMARY KEY (`actual_costing_summary_id`);

--
-- Indexes for table `actual_opportunity_costing_summary`
--
ALTER TABLE `actual_opportunity_costing_summary`
  ADD PRIMARY KEY (`actual_opportunity_costing_summary_id`);

--
-- Indexes for table `adjust_stock_log`
--
ALTER TABLE `adjust_stock_log`
  ADD PRIMARY KEY (`adjust_stock_log_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bank_id`);

--
-- Indexes for table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`basket_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_service`
--
ALTER TABLE `booking_service`
  ADD PRIMARY KEY (`booking_service_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `broadcast`
--
ALTER TABLE `broadcast`
  ADD PRIMARY KEY (`broadcast_id`);

--
-- Indexes for table `broadcast_contact`
--
ALTER TABLE `broadcast_contact`
  ADD PRIMARY KEY (`broadcast_contact_id`);

--
-- Indexes for table `broadcast_test_recipient`
--
ALTER TABLE `broadcast_test_recipient`
  ADD PRIMARY KEY (`broadcast_test_recipient_id`);

--
-- Indexes for table `call_registry`
--
ALTER TABLE `call_registry`
  ADD PRIMARY KEY (`call_registry_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `claim_line_items`
--
ALTER TABLE `claim_line_items`
  ADD PRIMARY KEY (`claim_line_items_id`);

--
-- Indexes for table `claim_payment`
--
ALTER TABLE `claim_payment`
  ADD PRIMARY KEY (`claim_payment_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `company_address`
--
ALTER TABLE `company_address`
  ADD PRIMARY KEY (`company_address_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `costing_summary`
--
ALTER TABLE `costing_summary`
  ADD PRIMARY KEY (`costing_summary_id`);

--
-- Indexes for table `costing_summary_history`
--
ALTER TABLE `costing_summary_history`
  ADD PRIMARY KEY (`costing_summary_history_id`);

--
-- Indexes for table `cpf_calculator`
--
ALTER TABLE `cpf_calculator`
  ADD PRIMARY KEY (`cpf_calculator_id`);

--
-- Indexes for table `credit_note`
--
ALTER TABLE `credit_note`
  ADD PRIMARY KEY (`credit_note_id`);

--
-- Indexes for table `delivery_order`
--
ALTER TABLE `delivery_order`
  ADD PRIMARY KEY (`delivery_order_id`);

--
-- Indexes for table `delivery_order_history`
--
ALTER TABLE `delivery_order_history`
  ADD PRIMARY KEY (`delivery_order_history_id`);

--
-- Indexes for table `dormitory`
--
ALTER TABLE `dormitory`
  ADD PRIMARY KEY (`dormitory_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `employee_category`
--
ALTER TABLE `employee_category`
  ADD PRIMARY KEY (`employee_category_id`);

--
-- Indexes for table `employee_timesheet`
--
ALTER TABLE `employee_timesheet`
  ADD PRIMARY KEY (`employee_timesheet_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_timesheet_finance`
--
ALTER TABLE `employee_timesheet_finance`
  ADD PRIMARY KEY (`employee_timesheet_finance_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`enquiry_id`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `expense_group`
--
ALTER TABLE `expense_group`
  ADD PRIMARY KEY (`expense_group_id`);

--
-- Indexes for table `expense_sub_group`
--
ALTER TABLE `expense_sub_group`
  ADD PRIMARY KEY (`expense_sub_group_id`);

--
-- Indexes for table `geo_country`
--
ALTER TABLE `geo_country`
  ADD PRIMARY KEY (`geo_country_id`);

--
-- Indexes for table `income_group`
--
ALTER TABLE `income_group`
  ADD PRIMARY KEY (`income_group_id`);

--
-- Indexes for table `income_sub_group`
--
ALTER TABLE `income_sub_group`
  ADD PRIMARY KEY (`income_sub_group_id`);

--
-- Indexes for table `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`interest_id`);

--
-- Indexes for table `interest_contact`
--
ALTER TABLE `interest_contact`
  ADD PRIMARY KEY (`interest_contact_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_id_2` (`product_id`),
  ADD KEY `product_id_3` (`product_id`),
  ADD KEY `product_id_4` (`product_id`),
  ADD KEY `product_id_5` (`product_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`);

--
-- Indexes for table `invoice_credit_note_history`
--
ALTER TABLE `invoice_credit_note_history`
  ADD PRIMARY KEY (`invoice_credit_note_history_id`);

--
-- Indexes for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD PRIMARY KEY (`invoice_item_id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `invoice_id_2` (`invoice_id`),
  ADD KEY `invoice_id_3` (`invoice_id`),
  ADD KEY `order_item_id` (`order_item_id`),
  ADD KEY `record_id` (`record_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `invoice_receipt_history`
--
ALTER TABLE `invoice_receipt_history`
  ADD PRIMARY KEY (`invoice_receipt_history_id`);

--
-- Indexes for table `job_information`
--
ALTER TABLE `job_information`
  ADD PRIMARY KEY (`job_information_id`);

--
-- Indexes for table `leave`
--
ALTER TABLE `leave`
  ADD PRIMARY KEY (`leave_id`);

--
-- Indexes for table `leave_policy`
--
ALTER TABLE `leave_policy`
  ADD PRIMARY KEY (`leave_policy_id`);

--
-- Indexes for table `leave_policy_employee_type`
--
ALTER TABLE `leave_policy_employee_type`
  ADD PRIMARY KEY (`leave_policy_employee_type_id`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`loan_id`);

--
-- Indexes for table `loan_repayment_history`
--
ALTER TABLE `loan_repayment_history`
  ADD PRIMARY KEY (`loan_repayment_history_id`);

--
-- Indexes for table `materials_request`
--
ALTER TABLE `materials_request`
  ADD PRIMARY KEY (`materials_request_id`);

--
-- Indexes for table `materials_request_line_items`
--
ALTER TABLE `materials_request_line_items`
  ADD PRIMARY KEY (`materials_request_line_items_id`);

--
-- Indexes for table `materials_returned`
--
ALTER TABLE `materials_returned`
  ADD PRIMARY KEY (`materials_returned_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`media_id`);

--
-- Indexes for table `mod_acc_other_action`
--
ALTER TABLE `mod_acc_other_action`
  ADD PRIMARY KEY (`other_action_id`);

--
-- Indexes for table `mod_acc_room`
--
ALTER TABLE `mod_acc_room`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `mod_acc_room_user_group`
--
ALTER TABLE `mod_acc_room_user_group`
  ADD PRIMARY KEY (`room_user_group_id`);

--
-- Indexes for table `mod_acc_user_group_other_action`
--
ALTER TABLE `mod_acc_user_group_other_action`
  ADD PRIMARY KEY (`user_group_other_action_id`);

--
-- Indexes for table `nationality`
--
ALTER TABLE `nationality`
  ADD PRIMARY KEY (`nationality_id`);

--
-- Indexes for table `opportunity`
--
ALTER TABLE `opportunity`
  ADD PRIMARY KEY (`opportunity_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `project_manager_id` (`project_manager_id`),
  ADD KEY `opportunity_id` (`opportunity_id`);

--
-- Indexes for table `opportunity_costing_summary`
--
ALTER TABLE `opportunity_costing_summary`
  ADD PRIMARY KEY (`opportunity_costing_summary_id`);

--
-- Indexes for table `opportunity_costing_summary_history`
--
ALTER TABLE `opportunity_costing_summary_history`
  ADD PRIMARY KEY (`opportunity_costing_summary_history_id`);

--
-- Indexes for table `opportunity_employee`
--
ALTER TABLE `opportunity_employee`
  ADD PRIMARY KEY (`opportunity_employee_id`);

--
-- Indexes for table `opportunity_project_history`
--
ALTER TABLE `opportunity_project_history`
  ADD PRIMARY KEY (`opportunity_project_history_id`);

--
-- Indexes for table `opportunity_staff`
--
ALTER TABLE `opportunity_staff`
  ADD PRIMARY KEY (`opportunity_staff_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `quote_id` (`quote_id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `record_id` (`record_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indexes for table `other_comp_emp`
--
ALTER TABLE `other_comp_emp`
  ADD PRIMARY KEY (`other_comp_emp_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `payroll_management`
--
ALTER TABLE `payroll_management`
  ADD PRIMARY KEY (`payroll_management_id`);

--
-- Indexes for table `po_product`
--
ALTER TABLE `po_product`
  ADD PRIMARY KEY (`po_product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_company`
--
ALTER TABLE `product_company`
  ADD PRIMARY KEY (`product_company_id`);

--
-- Indexes for table `product_price`
--
ALTER TABLE `product_price`
  ADD PRIMARY KEY (`product_price_id`);

--
-- Indexes for table `product_price_history`
--
ALTER TABLE `product_price_history`
  ADD PRIMARY KEY (`product_price_history_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `project_claim`
--
ALTER TABLE `project_claim`
  ADD PRIMARY KEY (`project_claim_id`);

--
-- Indexes for table `project_employee`
--
ALTER TABLE `project_employee`
  ADD PRIMARY KEY (`project_employee_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `project_materials`
--
ALTER TABLE `project_materials`
  ADD PRIMARY KEY (`project_materials_id`);

--
-- Indexes for table `project_service`
--
ALTER TABLE `project_service`
  ADD PRIMARY KEY (`project_service_id`);

--
-- Indexes for table `project_staff`
--
ALTER TABLE `project_staff`
  ADD PRIMARY KEY (`project_staff_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`purchase_order_id`);

--
-- Indexes for table `quote`
--
ALTER TABLE `quote`
  ADD PRIMARY KEY (`quote_id`);

--
-- Indexes for table `quote_category`
--
ALTER TABLE `quote_category`
  ADD PRIMARY KEY (`quote_category_id`);

--
-- Indexes for table `quote_columns`
--
ALTER TABLE `quote_columns`
  ADD PRIMARY KEY (`quote_columns_id`);

--
-- Indexes for table `quote_items`
--
ALTER TABLE `quote_items`
  ADD PRIMARY KEY (`quote_items_id`);

--
-- Indexes for table `quote_items_log`
--
ALTER TABLE `quote_items_log`
  ADD PRIMARY KEY (`quote_items_log_id`);

--
-- Indexes for table `quote_log`
--
ALTER TABLE `quote_log`
  ADD PRIMARY KEY (`quote_log_id`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receipt_id`);

--
-- Indexes for table `renewals`
--
ALTER TABLE `renewals`
  ADD PRIMARY KEY (`renewal_id`);

--
-- Indexes for table `sales_return_history`
--
ALTER TABLE `sales_return_history`
  ADD PRIMARY KEY (`sales_return_history_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`setting_id`),
  ADD UNIQUE KEY `key_text` (`key_text`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `staff_group`
--
ALTER TABLE `staff_group`
  ADD PRIMARY KEY (`staff_group_id`);

--
-- Indexes for table `staff_group_history`
--
ALTER TABLE `staff_group_history`
  ADD PRIMARY KEY (`staff_group_history_id`);

--
-- Indexes for table `stock_history`
--
ALTER TABLE `stock_history`
  ADD PRIMARY KEY (`stock_history_id`);

--
-- Indexes for table `stock_transfer`
--
ALTER TABLE `stock_transfer`
  ADD PRIMARY KEY (`stock_transfer_id`);

--
-- Indexes for table `stock_transfer_history`
--
ALTER TABLE `stock_transfer_history`
  ADD PRIMARY KEY (`stock_transfer_history_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`sub_category_id`);

--
-- Indexes for table `sub_con`
--
ALTER TABLE `sub_con`
  ADD PRIMARY KEY (`sub_con_id`);

--
-- Indexes for table `sub_con_payments`
--
ALTER TABLE `sub_con_payments`
  ADD PRIMARY KEY (`sub_con_payments_id`);

--
-- Indexes for table `sub_con_payments_history`
--
ALTER TABLE `sub_con_payments_history`
  ADD PRIMARY KEY (`sub_con_payments_history_id`);

--
-- Indexes for table `sub_con_work_order`
--
ALTER TABLE `sub_con_work_order`
  ADD PRIMARY KEY (`sub_con_work_order_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `supplier_receipt`
--
ALTER TABLE `supplier_receipt`
  ADD PRIMARY KEY (`supplier_receipt_id`);

--
-- Indexes for table `supplier_receipt_history`
--
ALTER TABLE `supplier_receipt_history`
  ADD PRIMARY KEY (`supplier_receipt_history_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `opportunity_id` (`opportunity_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `project_manager_id` (`project_manager_id`);

--
-- Indexes for table `task_history`
--
ALTER TABLE `task_history`
  ADD PRIMARY KEY (`task_history_id`);

--
-- Indexes for table `task_staff`
--
ALTER TABLE `task_staff`
  ADD PRIMARY KEY (`task_staff_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`template_id`);

--
-- Indexes for table `third_party_cost`
--
ALTER TABLE `third_party_cost`
  ADD PRIMARY KEY (`third_party_cost_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `timesheet`
--
ALTER TABLE `timesheet`
  ADD PRIMARY KEY (`timesheet_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `project_id_2` (`project_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `opportunity_id` (`opportunity_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `entry_date` (`entry_date`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`);

--
-- Indexes for table `training_staff`
--
ALTER TABLE `training_staff`
  ADD PRIMARY KEY (`training_staff_id`);

--
-- Indexes for table `translation`
--
ALTER TABLE `translation`
  ADD PRIMARY KEY (`translation_id`),
  ADD UNIQUE KEY `key_text` (`key_text`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`user_group_id`);

--
-- Indexes for table `valuelist`
--
ALTER TABLE `valuelist`
  ADD PRIMARY KEY (`valuelist_id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- Indexes for table `vehicle_fuel`
--
ALTER TABLE `vehicle_fuel`
  ADD PRIMARY KEY (`vehicle_fuel_id`);

--
-- Indexes for table `vehicle_insurance`
--
ALTER TABLE `vehicle_insurance`
  ADD PRIMARY KEY (`vehicle_insurance_id`);

--
-- Indexes for table `vehicle_service`
--
ALTER TABLE `vehicle_service`
  ADD PRIMARY KEY (`vehicle_service_id`);

--
-- Indexes for table `work_order_line_items`
--
ALTER TABLE `work_order_line_items`
  ADD PRIMARY KEY (`work_order_line_items_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actual_costing_summary`
--
ALTER TABLE `actual_costing_summary`
  MODIFY `actual_costing_summary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `actual_opportunity_costing_summary`
--
ALTER TABLE `actual_opportunity_costing_summary`
  MODIFY `actual_opportunity_costing_summary_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `adjust_stock_log`
--
ALTER TABLE `adjust_stock_log`
  MODIFY `adjust_stock_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `bank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `basket_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `booking_service`
--
ALTER TABLE `booking_service`
  MODIFY `booking_service_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `broadcast`
--
ALTER TABLE `broadcast`
  MODIFY `broadcast_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `broadcast_contact`
--
ALTER TABLE `broadcast_contact`
  MODIFY `broadcast_contact_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `broadcast_test_recipient`
--
ALTER TABLE `broadcast_test_recipient`
  MODIFY `broadcast_test_recipient_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `call_registry`
--
ALTER TABLE `call_registry`
  MODIFY `call_registry_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `claim_line_items`
--
ALTER TABLE `claim_line_items`
  MODIFY `claim_line_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `claim_payment`
--
ALTER TABLE `claim_payment`
  MODIFY `claim_payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `company_address`
--
ALTER TABLE `company_address`
  MODIFY `company_address_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `costing_summary`
--
ALTER TABLE `costing_summary`
  MODIFY `costing_summary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `costing_summary_history`
--
ALTER TABLE `costing_summary_history`
  MODIFY `costing_summary_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cpf_calculator`
--
ALTER TABLE `cpf_calculator`
  MODIFY `cpf_calculator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `credit_note`
--
ALTER TABLE `credit_note`
  MODIFY `credit_note_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `delivery_order`
--
ALTER TABLE `delivery_order`
  MODIFY `delivery_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `delivery_order_history`
--
ALTER TABLE `delivery_order_history`
  MODIFY `delivery_order_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `dormitory`
--
ALTER TABLE `dormitory`
  MODIFY `dormitory_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `employee_category`
--
ALTER TABLE `employee_category`
  MODIFY `employee_category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employee_timesheet`
--
ALTER TABLE `employee_timesheet`
  MODIFY `employee_timesheet_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employee_timesheet_finance`
--
ALTER TABLE `employee_timesheet_finance`
  MODIFY `employee_timesheet_finance_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `enquiry_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `expense_group`
--
ALTER TABLE `expense_group`
  MODIFY `expense_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `expense_sub_group`
--
ALTER TABLE `expense_sub_group`
  MODIFY `expense_sub_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `geo_country`
--
ALTER TABLE `geo_country`
  MODIFY `geo_country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;
--
-- AUTO_INCREMENT for table `income_group`
--
ALTER TABLE `income_group`
  MODIFY `income_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `income_sub_group`
--
ALTER TABLE `income_sub_group`
  MODIFY `income_sub_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `interest`
--
ALTER TABLE `interest`
  MODIFY `interest_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `interest_contact`
--
ALTER TABLE `interest_contact`
  MODIFY `interest_contact_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `invoice_credit_note_history`
--
ALTER TABLE `invoice_credit_note_history`
  MODIFY `invoice_credit_note_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `invoice_item`
--
ALTER TABLE `invoice_item`
  MODIFY `invoice_item_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `invoice_receipt_history`
--
ALTER TABLE `invoice_receipt_history`
  MODIFY `invoice_receipt_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `job_information`
--
ALTER TABLE `job_information`
  MODIFY `job_information_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leave`
--
ALTER TABLE `leave`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leave_policy`
--
ALTER TABLE `leave_policy`
  MODIFY `leave_policy_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `leave_policy_employee_type`
--
ALTER TABLE `leave_policy_employee_type`
  MODIFY `leave_policy_employee_type_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loan`
--
ALTER TABLE `loan`
  MODIFY `loan_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loan_repayment_history`
--
ALTER TABLE `loan_repayment_history`
  MODIFY `loan_repayment_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `materials_request`
--
ALTER TABLE `materials_request`
  MODIFY `materials_request_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `materials_request_line_items`
--
ALTER TABLE `materials_request_line_items`
  MODIFY `materials_request_line_items_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `materials_returned`
--
ALTER TABLE `materials_returned`
  MODIFY `materials_returned_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `media_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mod_acc_other_action`
--
ALTER TABLE `mod_acc_other_action`
  MODIFY `other_action_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mod_acc_room`
--
ALTER TABLE `mod_acc_room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `mod_acc_room_user_group`
--
ALTER TABLE `mod_acc_room_user_group`
  MODIFY `room_user_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=613;
--
-- AUTO_INCREMENT for table `mod_acc_user_group_other_action`
--
ALTER TABLE `mod_acc_user_group_other_action`
  MODIFY `user_group_other_action_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `nationality`
--
ALTER TABLE `nationality`
  MODIFY `nationality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=266;
--
-- AUTO_INCREMENT for table `opportunity`
--
ALTER TABLE `opportunity`
  MODIFY `opportunity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `opportunity_costing_summary`
--
ALTER TABLE `opportunity_costing_summary`
  MODIFY `opportunity_costing_summary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `opportunity_costing_summary_history`
--
ALTER TABLE `opportunity_costing_summary_history`
  MODIFY `opportunity_costing_summary_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `opportunity_employee`
--
ALTER TABLE `opportunity_employee`
  MODIFY `opportunity_employee_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `opportunity_staff`
--
ALTER TABLE `opportunity_staff`
  MODIFY `opportunity_staff_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_item_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `other_comp_emp`
--
ALTER TABLE `other_comp_emp`
  MODIFY `other_comp_emp_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payroll_management`
--
ALTER TABLE `payroll_management`
  MODIFY `payroll_management_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `po_product`
--
ALTER TABLE `po_product`
  MODIFY `po_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `product_company`
--
ALTER TABLE `product_company`
  MODIFY `product_company_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_price`
--
ALTER TABLE `product_price`
  MODIFY `product_price_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_price_history`
--
ALTER TABLE `product_price_history`
  MODIFY `product_price_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `project_claim`
--
ALTER TABLE `project_claim`
  MODIFY `project_claim_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `project_employee`
--
ALTER TABLE `project_employee`
  MODIFY `project_employee_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_materials`
--
ALTER TABLE `project_materials`
  MODIFY `project_materials_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `project_service`
--
ALTER TABLE `project_service`
  MODIFY `project_service_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_staff`
--
ALTER TABLE `project_staff`
  MODIFY `project_staff_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `purchase_order`
--
ALTER TABLE `purchase_order`
  MODIFY `purchase_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `quote`
  MODIFY `quote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `quote_category`
--
ALTER TABLE `quote_category`
  MODIFY `quote_category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `quote_columns`
--
ALTER TABLE `quote_columns`
  MODIFY `quote_columns_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `quote_items`
--
ALTER TABLE `quote_items`
  MODIFY `quote_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `quote_items_log`
--
ALTER TABLE `quote_items_log`
  MODIFY `quote_items_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `quote_log`
--
ALTER TABLE `quote_log`
  MODIFY `quote_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `renewals`
--
ALTER TABLE `renewals`
  MODIFY `renewal_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sales_return_history`
--
ALTER TABLE `sales_return_history`
  MODIFY `sales_return_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `setting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `staff_group`
--
ALTER TABLE `staff_group`
  MODIFY `staff_group_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `staff_group_history`
--
ALTER TABLE `staff_group_history`
  MODIFY `staff_group_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `stock_history`
--
ALTER TABLE `stock_history`
  MODIFY `stock_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `stock_transfer`
--
ALTER TABLE `stock_transfer`
  MODIFY `stock_transfer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stock_transfer_history`
--
ALTER TABLE `stock_transfer_history`
  MODIFY `stock_transfer_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_con`
--
ALTER TABLE `sub_con`
  MODIFY `sub_con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sub_con_payments`
--
ALTER TABLE `sub_con_payments`
  MODIFY `sub_con_payments_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_con_payments_history`
--
ALTER TABLE `sub_con_payments_history`
  MODIFY `sub_con_payments_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sub_con_work_order`
--
ALTER TABLE `sub_con_work_order`
  MODIFY `sub_con_work_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `supplier_receipt`
--
ALTER TABLE `supplier_receipt`
  MODIFY `supplier_receipt_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `supplier_receipt_history`
--
ALTER TABLE `supplier_receipt_history`
  MODIFY `supplier_receipt_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `task_history`
--
ALTER TABLE `task_history`
  MODIFY `task_history_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `task_staff`
--
ALTER TABLE `task_staff`
  MODIFY `task_staff_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `template_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `third_party_cost`
--
ALTER TABLE `third_party_cost`
  MODIFY `third_party_cost_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `timesheet`
--
ALTER TABLE `timesheet`
  MODIFY `timesheet_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `training_staff`
--
ALTER TABLE `training_staff`
  MODIFY `training_staff_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `translation`
--
ALTER TABLE `translation`
  MODIFY `translation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `user_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `valuelist`
--
ALTER TABLE `valuelist`
  MODIFY `valuelist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=737;
--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vehicle_fuel`
--
ALTER TABLE `vehicle_fuel`
  MODIFY `vehicle_fuel_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vehicle_insurance`
--
ALTER TABLE `vehicle_insurance`
  MODIFY `vehicle_insurance_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vehicle_service`
--
ALTER TABLE `vehicle_service`
  MODIFY `vehicle_service_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `work_order_line_items`
--
ALTER TABLE `work_order_line_items`
  MODIFY `work_order_line_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/* =========================SULFIYA- 19/10/2022 ===================== */


ALTER TABLE `opportunity` ADD `project_end_date` DATE NULL DEFAULT NULL AFTER `employee_id`


/* =========================SULFIYA - 21/10/2022 ===================== */

ALTER TABLE `supplier` ADD `payment_details` INT NULL DEFAULT NULL AFTER `gst_no`

ALTER TABLE `supplier` ADD `terms` VARCHAR(255) NULL DEFAULT NULL AFTER `payment_details`


/* =========================SULFIYA - 18/11/2022 ===================== */

ALTER TABLE `quote` CHANGE `condition` `conditions` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL

/* =================== RAFI - 17/11/2022 ===================== */

ALTER TABLE `purchase_order` ADD `site_id` INT(11) NULL DEFAULT NULL AFTER `project`

/* =================== MEERA - 17/11/2022 ===================== */

RENAME TABLE `smartcongen`.`leave`
 TO `smartcongen`.`empleave`;

/* =================== MEERA - 30/11/2022 ===================== */
 ALTER TABLE `purchase_order` CHANGE `company_id_supplier` `supplier_id` INT(11) NULL DEFAULT NULL;

/* =================== SULFIYA - 19/12/2022 ===================== */
ALTER TABLE `training` CHANGE `date` `from_date` DATE NULL DEFAULT NULL; 

/* =================== SULFIYA - 20/12/2022 ===================== */
ALTER TABLE `training_staff` ADD `employee_id` INT NOT NULL AFTER `to_date`; 

/* =================== SULFIYA - 30/12/2022 ===================== */
ALTER TABLE `invoice` ADD `gst_value` FLOAT(11) NOT NULL AFTER `reference`; 

/* =================== SULFIYA - 31/12/2022 ===================== */
ALTER TABLE `category` CHANGE `title` `category_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 

ALTER TABLE `section` CHANGE `title` `section_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 

ALTER TABLE `sub_category` CHANGE `title` `sub_category_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 

/* =================== SULFIYA - 07/01/2023 ===================== */
ALTER TABLE `credit_note` CHANGE `date` `from_date` DATE NULL DEFAULT NULL; 


/* =================== SULFIYA - 09/01/2023 ===================== */
ALTER TABLE `receipt` CHANGE `date` `receipt_date` DATE NULL DEFAULT NULL; 

/* =================== Gokila - 30/01/2023 ===================== */
ALTER TABLE `booking` CHANGE `customer_id` `company_id` INT(11) NULL DEFAULT NULL; 

/* =================== Gokila - 09/02/2023 ===================== */
ALTER TABLE `support` ADD `module_name` VARCHAR(255) NOT NULL AFTER `support_id`; 

/* =================== Gokila - 09/02/2023 ===================== */
ALTER TABLE `support` ADD `staff_id` INT NOT NULL AFTER `module_name`;

/* =================== Meera - 14/02/2023 ===================== */
ALTER TABLE `support` ADD `section_id` INT NOT NULL AFTER `staff_id`;

ALTER TABLE `po_product` ADD `item_code` INT(250) NULL DEFAULT NULL AFTER `price`;
ALTER TABLE `support` ADD `due_date` VARCHAR(255) NULL DEFAULT NULL AFTER `section_id`; 
ALTER TABLE `support` ADD `date` VARCHAR(255) NULL DEFAULT NULL AFTER `due_date`;
ALTER TABLE `support` ADD `sort_order` INT(11) NULL DEFAULT NULL AFTER `date`;

/* =================== Sulfiya - 20/04/2023 ===================== */
ALTER TABLE `setting` CHANGE `creation_date` `creation_date` VARCHAR(255) NULL DEFAULT NULL;
ALTER TABLE `setting` CHANGE `modification_date` `modification_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `section` CHANGE `title` `section_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 
ALTER TABLE `order_item` CHANGE `site_id` `site_id` INT(11) NULL DEFAULT NULL; 

/* =================== Sulfiya - 21/04/2023 ===================== */
ALTER TABLE `section` ADD `groups` VARCHAR(255) NULL DEFAULT NULL AFTER `show_in_nav`; 
ALTER TABLE `section` ADD `routes` VARCHAR(255) NULL DEFAULT NULL AFTER `groups`; 
ALTER TABLE `category` CHANGE `title` `category_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 
ALTER TABLE `category` ADD `seo_title` VARCHAR(255) NULL DEFAULT NULL AFTER `show_in_nav`; 
ALTER TABLE `category` CHANGE `creation_date` `creation_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `category` CHANGE `modification_date` `modification_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `sub_category` CHANGE `title` `sub_category_title` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL; 
ALTER TABLE `sub_category` CHANGE `creation_date` `creation_date` VARCHAR(255) NULL DEFAULT NULL
ALTER TABLE `sub_category` CHANGE `modification_date` `modification_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `sub_category` ADD `seo_title` VARCHAR(255) NULL DEFAULT NULL AFTER `show_in_nav`;
ALTER TABLE `content` CHANGE `creation_date` `creation_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `content` CHANGE `modification_date` `modification_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `content` CHANGE `content_date` `content_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `staff` ADD `staff_type` VARCHAR(255) NULL DEFAULT NULL AFTER `developer`; 

/* =================== Sulfiya - 24/04/2023 ===================== */
ALTER TABLE `mod_acc_room_user_group` ADD `remove` INT(1) NULL DEFAULT NULL AFTER `export`; 
ALTER TABLE `mod_acc_room_user_group` ADD `section_id` VARCHAR(255) NULL DEFAULT NULL AFTER `remove`; 
ALTER TABLE `mod_acc_room_user_group` ADD `section_title` VARCHAR(255) NULL DEFAULT NULL AFTER `section_id`; 

/* =================== Sulfiya - 25/04/2023 ===================== */
ALTER TABLE `media` ADD `modification_date` VARCHAR(255) NULL DEFAULT NULL AFTER `internal_link`; 

/* =================== Sulfiya - 02/02/2023 ===================== */
ALTER TABLE `blog` CHANGE `date` `date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `product` CHANGE `creation_date` `creation_date` VARCHAR(255) NULL DEFAULT NULL; 
ALTER TABLE `product` CHANGE `modification_date` `modification_date` VARCHAR(255) NULL DEFAULT NULL; 
