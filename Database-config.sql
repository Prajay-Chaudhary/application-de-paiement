-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 14 nov. 2023 à 00:27
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `funtest`
--

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `order_id`, `product_id`, `quantity`, `name`) VALUES
(16, 12, 1, 1, 'T-shirt Blanc'),
(17, 12, 2, 1, 'Jean Slim Noir'),
(18, 13, 3, 1, 'Chaussures de Sport'),
(19, 13, 4, 1, 'Veste en Cuir'),
(20, 14, 3, 1, 'Chaussures de Sport'),
(21, 14, 2, 1, 'Jean Slim Noir'),
(22, 15, 2, 1, 'Jean Slim Noir'),
(23, 15, 1, 1, 'T-shirt Blanc'),
(24, 16, 1, 1, 'T-shirt Blanc'),
(25, 16, 2, 1, 'Jean Slim Noir'),
(26, 17, 1, 1, 'T-shirt Blanc'),
(27, 17, 2, 1, 'Jean Slim Noir'),
(28, 17, 8, 1, 'Chapeau Panama'),
(29, 17, 7, 1, 'Sac à Main'),
(30, 17, 6, 1, 'Cravate en Soie'),
(31, 18, 2, 1, 'Jean Slim Noir'),
(32, 18, 1, 1, 'T-shirt Blanc'),
(33, 18, 3, 1, 'Chaussures de Sport'),
(34, 19, 2, 2, 'Jean Slim Noir'),
(35, 19, 1, 2, 'T-shirt Blanc'),
(36, 19, 3, 1, 'Chaussures de Sport'),
(37, 20, 2, 1, 'Jean Slim Noir'),
(38, 20, 3, 1, 'Chaussures de Sport'),
(39, 21, 2, 1, 'Jean Slim Noir'),
(40, 21, 3, 1, 'Chaussures de Sport'),
(41, 22, 1, 1, 'T-shirt Blanc'),
(42, 22, 2, 1, 'Jean Slim Noir'),
(43, 22, 3, 1, 'Chaussures de Sport'),
(44, 23, 6, 1, 'Cravate en Soie'),
(45, 23, 7, 1, 'Sac à Main'),
(46, 23, 8, 1, 'Chapeau Panama'),
(47, 24, 1, 6, 'T-shirt Blanc'),
(48, 25, 2, 2, 'Jean Slim Noir'),
(49, 25, 3, 1, 'Chaussures de Sport'),
(50, 25, 1, 1, 'T-shirt Blanc');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `total_price`, `order_date`) VALUES
(1, 130.00, '2023-11-13 21:38:56'),
(2, 180.00, '2023-11-13 21:41:04'),
(3, 180.00, '2023-11-13 21:41:05'),
(4, 180.00, '2023-11-13 21:41:05'),
(5, 180.00, '2023-11-13 21:41:06'),
(6, 180.00, '2023-11-13 21:41:06'),
(7, 180.00, '2023-11-13 21:41:06'),
(8, 180.00, '2023-11-13 21:41:07'),
(9, 250.00, '2023-11-13 21:42:04'),
(10, 250.00, '2023-11-13 21:51:46'),
(11, 290.00, '2023-11-13 22:00:19'),
(12, 70.00, '2023-11-13 22:04:30'),
(13, 290.00, '2023-11-13 22:10:54'),
(14, 140.00, '2023-11-13 22:13:35'),
(15, 70.00, '2023-11-13 22:14:56'),
(16, 70.00, '2023-11-13 22:22:50'),
(17, 190.00, '2023-11-13 22:23:21'),
(18, 160.00, '2023-11-13 22:29:34'),
(19, 230.00, '2023-11-13 22:34:00'),
(20, 140.00, '2023-11-13 22:45:28'),
(21, 140.00, '2023-11-13 22:47:29'),
(22, 160.00, '2023-11-13 22:48:24'),
(23, 120.00, '2023-11-13 22:53:29'),
(24, 120.00, '2023-11-13 23:04:53'),
(25, 210.00, '2023-11-13 23:26:09');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `inventory` varchar(255) NOT NULL,
  `image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `inventory`, `image`) VALUES
(1, 'T-shirt Blanc', 20, '93', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(2, 'Jean Slim Noir', 50, '73', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(3, 'Chaussures de Sport', 90, '49', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(4, 'Veste en Cuir', 200, '25', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(5, 'Robe d\'Été', 30, '60', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(6, 'Cravate en Soie', 25, '40', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(7, 'Sac à Main', 60, '30', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(8, 'Chapeau Panama', 35, '20', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(9, 'Écharpe en Laine', 30, '45', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(10, 'Ceinture en Cuir', 40, '70', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(11, 'Montre Classique', 150, '15', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(12, 'Bottes en Cuir', 100, '40', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(13, 'Lunettes de Soleil', 80, '50', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(14, 'Chemise à Carreaux', 45, '55', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(15, 'Pull-over Gris', 65, '35', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(16, 'Short en Jean', 40, '60', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(17, 'Sandales d\'Été', 50, '40', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(18, 'Bijoux Fantaisie', 15, '85', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(19, 'Pantalon Chino', 55, '50', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png'),
(20, 'Blouse Florale', 40, '40', 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
