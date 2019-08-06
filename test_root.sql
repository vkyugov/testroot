-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 06 2019 г., 10:46
-- Версия сервера: 8.0.12
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test_root`
--

-- --------------------------------------------------------

--
-- Структура таблицы `root`
--

CREATE TABLE `root` (
  `root_id` int(10) NOT NULL,
  `parent_name` varchar(55) DEFAULT NULL,
  `root_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `root`
--

INSERT INTO `root` (`root_id`, `parent_name`, `root_name`) VALUES
(1, '', 'root1'),
(2, '/1/', 'cokas'),
(3, '/2//1/', 'root123'),
(4, '/1/', 'magic root'),
(5, '/1/', 'else root');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `root`
--
ALTER TABLE `root`
  ADD PRIMARY KEY (`root_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `root`
--
ALTER TABLE `root`
  MODIFY `root_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
