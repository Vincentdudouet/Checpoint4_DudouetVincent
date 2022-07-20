-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `simple-mvc`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE
  users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    job VARCHAR(100)NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    imgLink VARCHAR(255) DEFAULT NULL
  );

--
-- Contenu de la table `projects`
--

CREATE TABLE
  projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(155) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATETIME
  );

--
-- Contenu de la table `images`
CREATE TABLE 
images(
  id INT PRIMARY KEY AUTO_INCREMENT,
  alt TINYTEXT NOT NULL,
  imgLink VARCHAR(255) NOT NULL,
  projects_id INT NULL,
  users_id INT NULL
); 
 
--

--
-- Index pour la table `item`
--


--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `item`
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
