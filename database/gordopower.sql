-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2025 a las 21:27:29
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gordopower`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `character`
--

CREATE TABLE `character` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `strength` int(11) NOT NULL,
  `weight` int(11) DEFAULT NULL,
  `protein` int(11) NOT NULL,
  `fat` int(11) NOT NULL,
  `experience` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `character`
--

INSERT INTO `character` (`id`, `user_id`, `level`, `strength`, `weight`, `protein`, `fat`, `experience`) VALUES
(1, 1, 1, 1, 50, 0, 0, 0),
(2, 2, 1, 1, 50, 0, 0, 0),
(3, 3, 3, 46, 12, 925, 615, 2570),
(4, 4, 1, 1, 50, 50, 90, 0),
(5, 5, 1, 1, 50, 0, 0, 0),
(6, 6, 1, 6, 2, 130, 130, 100),
(7, 7, 1, 1, 50, 100, 100, 0),
(8, 8, 1, 1, 50, 100, 100, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clothing`
--

CREATE TABLE `clothing` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `rarity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slot` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `rarity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `protein` double DEFAULT NULL,
  `fat` double DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `food`
--

INSERT INTO `food` (`id`, `name`, `description`, `origin`, `price`, `rarity`, `type`, `protein`, `fat`, `image`) VALUES
(1, 'Croquetas', 'Croquetas de cocido', 'spain', 100, 'legendary', 'starter dish', 50, 30, 'uploads/food/croquetas.png'),
(3, 'Sushi', 'Sushi fresco', 'Japan', 75, 'Epic', 'Starter Dish', 15, 15, 'uploads/food/sushi.png'),
(5, 'lentejas', 'Lentejas con chorizo', 'Siria', 200, 'RARE', 'Principal', 20, 30, 'uploads/food/lentejas.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skin`
--

CREATE TABLE `skin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `levelcondition` int(11) NOT NULL,
  `proteincondition` int(11) NOT NULL,
  `fatcondition` int(11) NOT NULL,
  `rarity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `skin`
--

INSERT INTO `skin` (`id`, `name`, `image`, `levelcondition`, `proteincondition`, `fatcondition`, `rarity`) VALUES
(1, 'Fantasma', 'uploads/skin/defaultCharacter.png', 1, 0, 0, 'COMMON'),
(2, 'Pinguino', 'uploads/skin/penguin.png', 1, 1, 1, 'RARE'),
(3, 'Dino', 'uploads/skin/dinoCharacter.png', 1, 10, 1, 'LEGENDARY'),
(4, 'Totem', 'uploads/skin/Totem_of_Undying.png', 20, 20000, 30000, 'LEGENDARY'),
(5, 'Jirafa', 'uploads/skin/tropicalTurtle.png', 2, 20, 20, 'RARE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coins` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `username`, `coins`, `active`) VALUES
(1, 'juanfran@example.com', '[\"ROLE_ADMIN\"]', 'juanfran', 'juanfran', 1150, 1),
(2, 'martin@martin.com', '[\"ROLE_USER\"]', 'martin', 'martin', 1000, 0),
(3, 'admin@admin.com', '[\"ROLE_ADMIN\"]', '$2y$13$y9bYubGE3wawI7eGi4Inue6aLmS5/IYC/IGeDgFQhfq3wvFsmLWLy', 'admin', 56300, 1),
(4, 'pollicapelua@hotmail.com', '[\"ROLE_USER\"]', 'javi', 'javi', 900, 1),
(5, 'todostusputosmuertosenalmibar@gmail.com', '[\"ROLE_USER\"]', '123456', 'todostusputosmuertosenalmibar', 320, 1),
(6, 'javi@javi.com', '[\"ROLE_USER\"]', 'javi', 'javi', 625, 1),
(7, 'dinoestufa@gmail.com', '[\"ROLE_ADMIN\"]', '$2y$13$s8/vSbsXzE3dNKraEz7qSuy4Lro0MroyTz2giVG27vGKxwYw7q.ie', 'dinoestufa', 1000, 1),
(8, 'asdasd@asd.com', '[\"ROLE_USER\"]', '$2y$13$y9bYubGE3wawI7eGi4Inue6aLmS5/IYC/IGeDgFQhfq3wvFsmLWLy', 'asd', 1000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_clothing`
--

CREATE TABLE `user_clothing` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `clothing_id` int(11) DEFAULT NULL,
  `unlocked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_food`
--

CREATE TABLE `user_food` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `food_id` int(11) DEFAULT NULL,
  `unlocked` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_food`
--

INSERT INTO `user_food` (`id`, `user_id`, `food_id`, `unlocked`, `quantity`) VALUES
(2, 3, 1, 1, 104),
(3, 3, 3, 1, 2),
(4, 6, 3, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_skin`
--

CREATE TABLE `user_skin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `skin_id` int(11) DEFAULT NULL,
  `unlocked` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_skin`
--

INSERT INTO `user_skin` (`id`, `user_id`, `skin_id`, `unlocked`, `active`) VALUES
(1, 3, 1, 1, 0),
(2, 3, 2, 1, 1),
(4, 4, 1, 1, 1),
(5, 5, 1, 1, 1),
(6, 6, 1, 1, 1),
(7, 7, 1, 1, 1),
(8, 8, 1, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_937AB034A76ED395` (`user_id`);

--
-- Indices de la tabla `clothing`
--
ALTER TABLE `clothing`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `skin`
--
ALTER TABLE `skin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- Indices de la tabla `user_clothing`
--
ALTER TABLE `user_clothing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F311DCB1A76ED395` (`user_id`),
  ADD KEY `IDX_F311DCB14CFB3290` (`clothing_id`);

--
-- Indices de la tabla `user_food`
--
ALTER TABLE `user_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_AEB9653EA76ED395` (`user_id`),
  ADD KEY `IDX_AEB9653EBA8E87C4` (`food_id`);

--
-- Indices de la tabla `user_skin`
--
ALTER TABLE `user_skin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_78F824D7A76ED395` (`user_id`),
  ADD KEY `IDX_78F824D7F404637F` (`skin_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `character`
--
ALTER TABLE `character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clothing`
--
ALTER TABLE `clothing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `skin`
--
ALTER TABLE `skin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_clothing`
--
ALTER TABLE `user_clothing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_food`
--
ALTER TABLE `user_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user_skin`
--
ALTER TABLE `user_skin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `FK_937AB034A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_clothing`
--
ALTER TABLE `user_clothing`
  ADD CONSTRAINT `FK_F311DCB14CFB3290` FOREIGN KEY (`clothing_id`) REFERENCES `clothing` (`id`),
  ADD CONSTRAINT `FK_F311DCB1A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_food`
--
ALTER TABLE `user_food`
  ADD CONSTRAINT `FK_AEB9653EA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_AEB9653EBA8E87C4` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`);

--
-- Filtros para la tabla `user_skin`
--
ALTER TABLE `user_skin`
  ADD CONSTRAINT `FK_78F824D7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_78F824D7F404637F` FOREIGN KEY (`skin_id`) REFERENCES `skin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
