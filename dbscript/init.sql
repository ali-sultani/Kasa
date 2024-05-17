-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 26 juin 2023 à 04:31
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `management`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `num_categorie` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `nom_categorie` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num_parent_categorie` binary(16) DEFAULT NULL, -- Référence à la catégorie parent s'il y a lieu
  `image` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`num_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`num_categorie`, `nom_categorie`, `num_parent_categorie`, `image`) VALUES
(0xd37513b7a9b011ed890026c4633eef42, 'Nettoyage', NULL, "sous-categorie-menage.jpg"),
(0x6fc568a6660611eeb8f60242ac160002, 'Déménagement', NULL, "categorie-demenagement.jpg"),
(0x7deede34660611eeb8f60242ac160002, 'Animaux', NULL, "categorie-animaux.jpg"),
(0x8b45227b660611eeb8f60242ac160002, 'Rénovation', NULL, "categorie-renovation.jpg"),
(0x94a628f9660611eeb8f60242ac160002, 'Transport', NULL, "categorie-transport.jpg"),
(0x9d8e3c06660611eeb8f60242ac160002, 'Aide à domicile', NULL, "categorie-aide-a-domicile.jpg"),
(0x94d6cf36660b11eeb8f60242ac160002, 'Cuisine', 0x9d8e3c06660611eeb8f60242ac160002, "sous-categorie-cuisine.jpg"),
(0x9b5732a5660b11eeb8f60242ac160002, 'Réparation', 0x9d8e3c06660611eeb8f60242ac160002, "sous-categorie-reparation.jpg"),
(0x9f3ed69b660b11eeb8f60242ac160002, 'Installation', 0x9d8e3c06660611eeb8f60242ac160002, "service-demenagement-montage-meuble.jpg"),
(0xa418fc00660b11eeb8f60242ac160002, 'Ameublement', 0x9d8e3c06660611eeb8f60242ac160002, "service-demenagement-montage-meuble.jpg"),
(0xa861d5fb660b11eeb8f60242ac160002, 'Ménage', 0x9d8e3c06660611eeb8f60242ac160002, "sous-categorie-menage.jpg"),
(0xac1f6474660b11eeb8f60242ac160002, 'Autres', 0x9d8e3c06660611eeb8f60242ac160002, "sous-categorie-autres.jpg"),
(0xa65ef7bc660611eeb8f60242ac160002, 'Jardinage', NULL, "categorie-jardinage.jpg"),
(0xb0b9b972660611eeb8f60242ac160002, 'Coach de bien être', NULL, "categorie-bien-etre.jpg");

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `num_service` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `num_categorie` binary(16) NOT NULL,
  `nom_service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`num_service`),
  KEY `num_categorie` (`num_categorie`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`num_service`, `num_categorie`, `nom_service`, `image`, `description`) VALUES
(0x3bd629f3a9b011ed890026c4633eef49, 0x6fc568a6660611eeb8f60242ac160002, "Déménagement résidentiel", "service_de_Demenagement_residentiel.jpg", "Profitez d'un déménagement en toute tranquillité avec notre service de déménagement résidentiel. Nous prenons en charge le transport de vos biens en toute sécurité vers votre nouvelle demeure."),
(0x31b576ac660711eeb8f60242ac160002, 0x6fc568a6660611eeb8f60242ac160002, "Déménagement et ameublement", "service-demenagement-montage-meuble.jpg", "Simplifiez votre déménagement en optant pour notre service de déménagement avec démontage et montage de meubles. Nous prenons soin de démonter et remonter vos meubles pour vous."),
(0x76d99485dc1a41a1a3215f581ccc8b95, 0x6fc568a6660611eeb8f60242ac160002, "Aide à un déménagement", "service-demenagement-montage-meuble.jpg", "Si vous avez besoin d'un coup de main pour votre déménagement, notre service d'aide au déménagement est là pour vous. Nous vous assistons dans le chargement et le déchargement de vos affaires."),
(0x653eae5f660711eeb8f60242ac160002, 0x7deede34660611eeb8f60242ac160002, "Garde de chien", "service-garde-de-chien.jpg", "Lorsque vous êtes loin de chez vous, notre service de garde de chien à domicile prend soin de votre compagnon à quatre pattes. Votre chien reste dans un environnement familier."),
(0x749ef34a660711eeb8f60242ac160002, 0x7deede34660611eeb8f60242ac160002, "Garde de chat", "service-garde-de-chat.jpg", "Nos gardiens de chat à domicile veillent sur votre félin pendant votre absence. Votre chat peut rester chez lui tout en bénéficiant de soins et de compagnie."),
(0x7fda5a55660711eeb8f60242ac160002, 0x7deede34660611eeb8f60242ac160002, "Promenade de chien", "service-garde-de-chien.jpg", "Offrez à votre chien la promenade qu'il mérite avec notre service de promenade de chiens. Votre animal de compagnie peut faire de l'exercice et socialiser en toute sécurité."),
(0x8b3a1c68660711eeb8f60242ac160002, 0x7deede34660611eeb8f60242ac160002, "Toilettage pour chien", "service_de_toilletage_chien.jpg", "Votre chien mérite d'être choyé. Notre service de toilettage pour chien le dorlote avec des soins de beauté, la coupe de ses poils et bien plus encore."),
(0x6a09f8f7660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Rénovation de salle de bain", "service-renovation-salle-de-bain.jpg", "Transformez votre salle de bain en un espace de rêve grâce à notre service de rénovation. Nous modernisons et améliorons votre salle de bain pour qu'elle soit à la hauteur de vos attentes."),
(0x89e7a87a660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Rénovation de sous-sol", "service_de_renovation_sous_sol.jpg", "Donnez une nouvelle vie à votre sous-sol avec notre service de rénovation. Transformez cet espace en une zone utilisable et agréable."),
(0x93487a19660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Rénovation de l'intérieur", "service_de_renovation_sous_sol.jpg", "Vous voulez rafraîchir votre intérieur ? Notre service de rénovation de l'intérieur vous permet de donner un nouveau souffle à votre maison."),
(0x9a38113b660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Rénovation de l'extérieur", "service_de_renovation_exterieure.jpg", "Améliorez l'aspect extérieur de votre maison avec notre service de rénovation extérieure. Nous prenons en charge les travaux d'embellissement de votre extérieur."),
(0x9f8011c7660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Peinture intérieure", "service-peinture-interieure.jpg", "Changez la couleur de vos murs avec notre service de peinture intérieure. Rafraîchissez l'apparence de votre maison avec une nouvelle couche de peinture."),
(0xa498d5f7660811eeb8f60242ac160002, 0x8b45227b660611eeb8f60242ac160002, "Décoration intérieure", "service_de_decoration_interieure.jpg", "Transformez votre espace en un lieu élégant et confortable grâce à notre service de décoration intérieure. Nos experts en décoration donnent vie à vos idées."),
(0xf6b46f3b660811eeb8f60242ac160002, 0x94a628f9660611eeb8f60242ac160002, "Transport vers l'aéroport", "service_de_transport_aeroport.jpg", "Voyagez sans tracas avec notre service de transport vers l'aéroport. Nous assurons un transport fiable et ponctuel pour vous conduire à l'aéroport en toute sérénité."),
(0xfeafa12f660811eeb8f60242ac160002, 0x94a628f9660611eeb8f60242ac160002, "Courses", "service-course.jpg", "Économisez du temps et de l'énergie en confiant vos courses à notre service d'accompagnement en courses. Nous faisons les courses pour vous, selon vos préférences."),
(0x062c92d4660911eeb8f60242ac160002, 0x94a628f9660611eeb8f60242ac160002, "Livrer un colis", "service-livraison-colis.jpg", "Besoin de livrer un colis en toute sécurité ? Notre service de livraison de colis s'occupe de la distribution de vos envois de manière efficace et fiable."),
(0x136e932f660c11eeb8f60242ac160002, 0x94d6cf36660b11eeb8f60242ac160002, "Cuisinier personnel", "service_de_cuisine_a_domicile.jpg", "Éblouissez vos invités avec un service de cuisine personnalisé pour vos événements spéciaux. Nos chefs préparent des plats délicieux pour satisfaire tous les palais."),
(0x18dafd5d660c11eeb8f60242ac160002, 0x94d6cf36660b11eeb8f60242ac160002, "Cours de cuisine à domicile", "service_de_cours_de_cuisine.jpg", "Apprenez à cuisiner comme un chef chez vous grâce à nos cours de cuisine à domicile. Nos chefs expérimentés vous guident dans la préparation de plats délicieux."),
(0x1d0836ba660c11eeb8f60242ac160002, 0x94d6cf36660b11eeb8f60242ac160002, "Livraison de repas faits maison", "service_de_livraison_de_repas_fais_maison.jpg", " Profitez de repas faits maison sans cuisiner. Notre service de livraison de repas vous apporte des plats préparés avec soin directement à votre porte."),
(0x3ee7ea9e660c11eeb8f60242ac160002, 0xac1f6474660b11eeb8f60242ac160002, "Coiffeur/Coiffeuse", "service-coiffeur.jpg", "Transformez votre coiffure avec notre service de coiffure professionnel. Nos coiffeurs et coiffeuses talentueux vous aident à obtenir le look que vous désirez."),
(0x42af35ba660c11eeb8f60242ac160002, 0xac1f6474660b11eeb8f60242ac160002, "Maquilleur/Maquilleuse", "service-maquilleuse.jpg", "Pour des occasions spéciales ou simplement pour vous sentir magnifique au quotidien, notre service de maquillage vous offre un maquillage professionnel adapté à vos besoins."),
(0x692fa530660c11eeb8f60242ac160002, 0x9b5732a5660b11eeb8f60242ac160002, "Réparation de plomberie", "service-plomberie.jpg", "Lorsque des problèmes de plomberie surviennent, notre service de réparation de plomberie intervient rapidement pour résoudre les fuites, les blocages et plus encore."),
(0x6f348da8660c11eeb8f60242ac160002, 0x9b5732a5660b11eeb8f60242ac160002, "Réparation de toiture", "service_de_reparation_toiture.jpg", "Protégez votre maison des intempéries avec notre service de réparation de toiture. Nous réparons les dommages et assurons l'étanchéité de votre toit."),
(0x747353ed660c11eeb8f60242ac160002, 0x9b5732a5660b11eeb8f60242ac160002, "Réparation de chauffage et de climatisation", "service_de_reparation_chauffage_et_climatisation.jpg", "Gardez votre confort toute l'année avec notre service de réparation de chauffage et de climatisation. Nous réparons et entretenons vos systèmes de chauffage et de climatisation."),
(0x795beaeb660c11eeb8f60242ac160002, 0x9b5732a5660b11eeb8f60242ac160002, "Réparation d’électroménagers", "service-reparation-electro.jpg", " Lorsque vos électroménagers font des siennes, notre service de réparation d’électroménagers intervient pour les remettre en état de fonctionnement."),
(0xa62cf722660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Machine à laver", "service_de_renovation_sous_sol.jpg", "Réparez votre machine à laver avec notre service dédié. Nous nous occupons de résoudre les problèmes de lavage et d'entretien."),
(0xab94f9a5660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Lave-vaisselle", "service_de_renovation_sous_sol.jpg", " Lorsque votre lave-vaisselle tombe en panne, notre service de réparation s'en charge. Vous pourrez bientôt profiter d'une vaisselle étincelante."),
(0xafb7d711660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Réfrigérateur", "service_de_renovation_sous_sol.jpg", "Un réfrigérateur en panne peut causer des désagréments. Notre service de réparation de réfrigérateurs rétablit rapidement la fraîcheur dans votre cuisine."),
(0xb3dd26bd660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Four", "service_de_renovation_sous_sol.jpg", "Ne laissez pas un four défectueux gâcher vos repas. Notre service de réparation de fours remet en état votre appareil pour une cuisson parfaite."),
(0xb80433e1660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Pose d’une télévision", "sous-categorie-reparation.jpg", "Profitez de votre téléviseur avec notre service de pose de télévision. Nous installons votre téléviseur sur le mur pour une expérience de visionnage optimale."),
(0xbcd38ed6660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Serrure", "sous-categorie-reparation.jpg", "Protégez votre maison avec des serrures en bon état. Notre service de réparation de serrures garantit la sécurité de votre domicile."),
(0xc0768be0660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Abris de jardin", "categorie-jardinage.jpg", "Offrez-vous un espace extérieur supplémentaire avec notre service de construction d'abris de jardin. Nous créons un espace de rangement ou de loisirs dans votre jardin."),
(0xc41ba42b660c11eeb8f60242ac160002, 0x9f3ed69b660b11eeb8f60242ac160002, "Trampoline", "categorie-jardinage.jpg", "Les enfants (et les adultes) s'amuseront avec notre service d'installation de trampolines. Offrez des heures de divertissement avec un trampoline dans votre jardin."),
(0x908da78f660d11eeb8f60242ac160002, 0xa418fc00660b11eeb8f60242ac160002, "Montage de meubles", "service-demenagement-montage-meuble.jpg", "Économisez du temps et des efforts en laissant notre service de montage de meubles assembler vos nouveaux achats. Nous assemblons des meubles de manière professionnelle."),
(0x956969af660d11eeb8f60242ac160002, 0xa418fc00660b11eeb8f60242ac160002, "Montage de lit", "service-demenagement-montage-meuble.jpg", "Notre service de montage de lits s'occupe de l'assemblage de votre lit pour que vous puissiez profiter d'une bonne nuit de sommeil."),
(0x990324bd660d11eeb8f60242ac160002, 0xa418fc00660b11eeb8f60242ac160002, "Montage de canapé", "service-demenagement-montage-meuble.jpg", "Laissez notre service de montage de canapés vous aider à assembler votre canapé, offrant ainsi un espace de détente confortable dans votre maison."),
(0xc4b4070a660d11eeb8f60242ac160002, 0x9d8e3c06660611eeb8f60242ac160002, "Ménage à domicile", "sous-categorie-menage.jpg", "Profitez d'une maison propre et bien entretenue grâce à notre service de ménage à domicile. Nos professionnels du nettoyage laissent chaque coin de votre maison impeccable."),
(0xc8cda99e660d11eeb8f60242ac160002, 0x9d8e3c06660611eeb8f60242ac160002, "Nettoyage de vitres", "sous-categorie-menage.jpg", "Offrez à vos fenêtres une brillance éclatante avec notre service de nettoyage de vitres. Nous éliminons la saleté et les traces pour une vue claire."),
(0xcd468c7b660d11eeb8f60242ac160002, 0x9d8e3c06660611eeb8f60242ac160002, "Nettoyage de tapis", "sous-categorie-menage.jpg", "Vos tapis méritent d'être propres et frais. Notre service de nettoyage de tapis élimine les taches et les odeurs pour redonner de la beauté à vos sols."),
(0x529a718f660911eeb8f60242ac160002, 0xa65ef7bc660611eeb8f60242ac160002, "Tondre la pelouse", "service_de_tonte_de_pelouse.jpg", "Laissez notre service de tonte de pelouse prendre en charge l'entretien de votre jardin. Votre pelouse restera propre et bien entretenue."),
(0x5a0764c9660911eeb8f60242ac160002, 0xa65ef7bc660611eeb8f60242ac160002, "Pose de gazon", "service_de_pose_de_gazon.jpg", "Transformez votre espace extérieur avec notre service de pose de gazon. Nous installons une pelouse verdoyante pour un jardin accueillant."),
(0x5eed391a660911eeb8f60242ac160002, 0xa65ef7bc660611eeb8f60242ac160002, "Ramassage de feuilles", "service_de_ramassage_de_feuille.jpg", "En automne, les feuilles mortes s'accumulent. Notre service de ramassage de feuilles élimine ce désordre pour un jardin propre et soigné."),
(0x63a72e9b660911eeb8f60242ac160002, 0xa65ef7bc660611eeb8f60242ac160002, "Déneiger", "service_de_deneigement.jpg", "L'hiver peut apporter de la neige encombrante. Notre service de déneigement vous débarrasse de la neige pour un accès sûr à votre maison."),
(0x67d7c77c660911eeb8f60242ac160002, 0xa65ef7bc660611eeb8f60242ac160002, "Entretien de piscine extérieur", "service_entretien_piscine_exterieur.jpg", "Profitez d'une piscine en parfait état grâce à notre service d'entretien de piscine extérieure. Nous assurons la propreté et la sécurité de votre espace de baignade."),
(0xc9aeecca660911eeb8f60242ac160002, 0xb0b9b972660611eeb8f60242ac160002, "Coaching sportif personnel", "service-coach-sportif.jpg", "Atteignez vos objectifs de remise en forme avec notre service de coaching sportif personnel. Nos coachs vous guident vers une vie plus saine."),
(0xcef079d3660911eeb8f60242ac160002, 0xb0b9b972660611eeb8f60242ac160002, "Coaching en nutrition", "service_de_coach_en_nutrition.jpg", "Améliorez votre alimentation avec notre service de coaching en nutrition. Nous vous aidons à adopter des habitudes alimentaires équilibrées."),
(0xd3f83787660911eeb8f60242ac160002, 0xb0b9b972660611eeb8f60242ac160002, "Coaching en yoga", "service_de_coach_en_yoga.jpg", "Trouvez la paix intérieure et la sérénité avec notre service de coaching en yoga et en méditation. Nos instructeurs vous guident dans la pratique de la relaxation.");

-- --------------------------------------------------------

--
-- Structure de la table `exigence`
--
-- Cette table sert à stocker les exigences spécifiques à chaque service
DROP TABLE IF EXISTS `exigence`;
CREATE TABLE IF NOT EXISTS `exigence` (
  `num_exigence` binary(16) NOT NULL,
  `num_service` binary(16) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`num_exigence`),
  FOREIGN KEY (`num_service`) REFERENCES `service` (`num_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `exigence` (`num_exigence`, `num_service`, `description`) VALUES
(0xa775206f938c48e495d67b9aa49c188d, 0x3bd629f3a9b011ed890026c4633eef49, "comeWithTruck"),
(0x9d9ee17683d44d5ba02e1e296c13c4ef, 0x3bd629f3a9b011ed890026c4633eef49, "ownVehicle"),
(0x5b5b9770ba364f10bef33c6a7c4cfbdc, 0x3bd629f3a9b011ed890026c4633eef49, "ownMower"),
(0xf47ac10b58cc4372a5670e02b2c3d479, 0x3bd629f3a9b011ed890026c4633eef49, "Disposer d'un camion pour le transport."),
(0x6e6b4bfa16f74f65a2ec6778e788065f, 0x3bd629f3a9b011ed890026c4633eef49, "Avoir des équipements de levage pour les meubles lourds."),
(0x0a41c35c95a24f63b6c2929f5d342928, 0x3bd629f3a9b011ed890026c4633eef49, "Posséder des emballages et des fournitures de déménagement."),
(0x66de67ff5c7f4abfa4084804292cc84d, 0x3bd629f3a9b011ed890026c4633eef49, "Outils pour le démontage et le montage des meubles."),
(0x46d5b0f1ea0f47bba41cf54eeb04b0ac, 0x3bd629f3a9b011ed890026c4633eef49, "Emballages pour protéger les objets fragiles."),
(0xe1a9956cb3b8448a9f51fb9bbd6cd52e, 0x76d99485dc1a41a1a3215f581ccc8b95, "Capacité à soulever des objets lourds en toute sécurité."),
(0x00415a9b5d2344e3a02b9f6670b49728, 0x653eae5f660711eeb8f60242ac160002, "Espace sécurisé et adapté pour accueillir le chien."),
(0xc951c93eaa3149e3a418f6e65e498bfa, 0x653eae5f660711eeb8f60242ac160002, "Expérience dans la garde et les soins des chiens."),
(0xd7ebc421e1784744a01ee471d14a0197, 0x653eae5f660711eeb8f60242ac160002, "Capacité à fournir de l'exercice et de l'attention au chien."),
(0x049e90fca2084d3f8f2a0f71f1f672a5, 0x749ef34a660711eeb8f60242ac160002, "Connaissance du comportement des chats et capacité à s'en occuper."),
(0x6a00ed9051994c1a9b1b3a6e0c89f61e, 0x749ef34a660711eeb8f60242ac160002, "Environnement calme et adapté pour le chat."),
(0x0c9e9ac047374284b2fc6a4c9be6e14d, 0x7fda5a55660711eeb8f60242ac160002, "Connaissance des itinéraires sûrs pour les promenades."),
(0x6c5d7d68de8d4f8fb8bc2a80cb8a6f57, 0x8b3a1c68660711eeb8f60242ac160002, "Matériel de toilettage adapté."),
(0x8a5a8f7b28e34942a1424ddc7d9724b7, 0x8b3a1c68660711eeb8f60242ac160002, "Connaissance des techniques de toilettage et des besoins spécifiques des différentes races de chiens."),
(0xb342d1d9d3724d84a77ad85558b0782a, 0x6a09f8f7660811eeb8f60242ac160002, "Compétences en plomberie et en installation de sanitaires."),
(0x593fcd3a35b948ccac6d2f04161a1d4e, 0x6a09f8f7660811eeb8f60242ac160002, "Expérience dans la pose de carrelage et de revêtements de sol.");


--
-- Structure de la table `jobber_exigence`
--

DROP TABLE IF EXISTS `jobber_exigence`;
CREATE TABLE IF NOT EXISTS `jobber_exigence` (
  `num_jobber` binary(16) NOT NULL,
  `num_exigence` binary(16) NOT NULL,
  PRIMARY KEY (`num_jobber`, `num_exigence`),
  FOREIGN KEY (`num_exigence`) REFERENCES `exigence` (`num_exigence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion de données de tests dans la table `jobber_exigence`
INSERT INTO `jobber_exigence` (`num_jobber`, `num_exigence`) VALUES
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0xa775206f938c48e495d67b9aa49c188d),
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0x9d9ee17683d44d5ba02e1e296c13c4ef),
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0x5b5b9770ba364f10bef33c6a7c4cfbdc),

(0x2e19af556b3a42c5b4c186c8cb8c4150, 0xa775206f938c48e495d67b9aa49c188d),
(0x2e19af556b3a42c5b4c186c8cb8c4150, 0x9d9ee17683d44d5ba02e1e296c13c4ef),
(0x2e19af556b3a42c5b4c186c8cb8c4150, 0x5b5b9770ba364f10bef33c6a7c4cfbdc),

(0xd7aeb0d91dd54d7e9e64152c6f5af42e, 0xa775206f938c48e495d67b9aa49c188d),
(0xd7aeb0d91dd54d7e9e64152c6f5af42e, 0x9d9ee17683d44d5ba02e1e296c13c4ef),
(0xd7aeb0d91dd54d7e9e64152c6f5af42e, 0x5b5b9770ba364f10bef33c6a7c4cfbdc),

(0xea22684b3ea84f8c8e0ddc61e3a9e579, 0xa775206f938c48e495d67b9aa49c188d),
(0xea22684b3ea84f8c8e0ddc61e3a9e579, 0x9d9ee17683d44d5ba02e1e296c13c4ef),
(0xea22684b3ea84f8c8e0ddc61e3a9e579, 0x5b5b9770ba364f10bef33c6a7c4cfbdc),

(0xf5308d14058b49a38a87ec39c1d0c2a5, 0xf47ac10b58cc4372a5670e02b2c3d479),
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0x6e6b4bfa16f74f65a2ec6778e788065f),
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0x0a41c35c95a24f63b6c2929f5d342928),
(0xf5308d14058b49a38a87ec39c1d0c2a5, 0x66de67ff5c7f4abfa4084804292cc84d),
(0x2e19af556b3a42c5b4c186c8cb8c4150, 0xe1a9956cb3b8448a9f51fb9bbd6cd52e),
(0x2e19af556b3a42c5b4c186c8cb8c4150, 0x593fcd3a35b948ccac6d2f04161a1d4e),
(0x2e19af556b3a42c5b4c186c8cb8c4150, 0xb342d1d9d3724d84a77ad85558b0782a),
(0xd7aeb0d91dd54d7e9e64152c6f5af42e, 0x593fcd3a35b948ccac6d2f04161a1d4e);

--
-- Structure de la table `jobber_service`
--

DROP TABLE IF EXISTS `jobber_service`;
CREATE TABLE IF NOT EXISTS `jobber_service` (
  `num_service` binary(16) NOT NULL,
  `num_jobber` binary(16) NOT NULL,
  PRIMARY KEY (`num_service`, `num_jobber`),
  FOREIGN KEY (`num_service`) REFERENCES `service` (`num_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion de données de tests dans la table `jobber_service`
INSERT INTO `jobber_service` (`num_service`, `num_jobber`) VALUES
(0x3bd629f3a9b011ed890026c4633eef49, 0xf5308d14058b49a38a87ec39c1d0c2a5),
(0x3bd629f3a9b011ed890026c4633eef49, 0x2e19af556b3a42c5b4c186c8cb8c4150),
(0x3bd629f3a9b011ed890026c4633eef49, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x653eae5f660711eeb8f60242ac160002, 0x8c14cf0c2d8c4ab1a8fe527b19520199),
(0x3bd629f3a9b011ed890026c4633eef49, 0xea22684b3ea84f8c8e0ddc61e3a9e579),
(0x3bd629f3a9b011ed890026c4633eef49, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0x76d99485dc1a41a1a3215f581ccc8b95, 0xea22684b3ea84f8c8e0ddc61e3a9e579),
(0x76d99485dc1a41a1a3215f581ccc8b95, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0x76d99485dc1a41a1a3215f581ccc8b95, 0x2e19af556b3a42c5b4c186c8cb8c4150),
(0x653eae5f660711eeb8f60242ac160002, 0x5d20e390394a4a6a9c7be94ac29be254),
(0x653eae5f660711eeb8f60242ac160002, 0xea22684b3ea84f8c8e0ddc61e3a9e579),
(0x749ef34a660711eeb8f60242ac160002, 0xf5308d14058b49a38a87ec39c1d0c2a5),
(0x749ef34a660711eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x749ef34a660711eeb8f60242ac160002, 0xea22684b3ea84f8c8e0ddc61e3a9e579),
(0x7fda5a55660711eeb8f60242ac160002, 0x5d20e390394a4a6a9c7be94ac29be254),
(0x7fda5a55660711eeb8f60242ac160002, 0xdde82d6a785911eeb34b0242ac190443),
(0x8b3a1c68660711eeb8f60242ac160002, 0x5d20e390394a4a6a9c7be94ac29be254),
(0x062c92d4660911eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x062c92d4660911eeb8f60242ac160002, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0x062c92d4660911eeb8f60242ac160002, 0x5d20e390394a4a6a9c7be94ac29be254),
(0x136e932f660c11eeb8f60242ac160002, 0xf5308d14058b49a38a87ec39c1d0c2a5),
(0x136e932f660c11eeb8f60242ac160002, 0x2e19af556b3a42c5b4c186c8cb8c4150),
(0x136e932f660c11eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x136e932f660c11eeb8f60242ac160002, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0x18dafd5d660c11eeb8f60242ac160002, 0x2e19af556b3a42c5b4c186c8cb8c4150),
(0x18dafd5d660c11eeb8f60242ac160002, 0xdde82d6a785911eeb34b0242ac190002),
(0x18dafd5d660c11eeb8f60242ac160002, 0xdde82d6a785911eeb34b0242ac190443),
(0x1d0836ba660c11eeb8f60242ac160002, 0xdde82d6a785911eeb34b0242ac190033),
(0x1d0836ba660c11eeb8f60242ac160002, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0x31b576ac660711eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x31b576ac660711eeb8f60242ac160002, 0x8c14cf0c2d8c4ab1a8fe527b19520199),
(0x42af35ba660c11eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0x42af35ba660c11eeb8f60242ac160002, 0xea22684b3ea84f8c8e0ddc61e3a9e579),
(0x42af35ba660c11eeb8f60242ac160002, 0xf5308d14058b49a38a87ec39c1d0c2a5),
(0xc9aeecca660911eeb8f60242ac160002, 0x90e3e4bc80cc45b9926755b65f3b7ff2),
(0xc9aeecca660911eeb8f60242ac160002, 0xd7aeb0d91dd54d7e9e64152c6f5af42e),
(0xc9aeecca660911eeb8f60242ac160002, 0xea22684b3ea84f8c8e0ddc61e3a9e579);



--
-- Structure de la table `demande_service`
--

DROP TABLE IF EXISTS `demande_service`;
CREATE TABLE IF NOT EXISTS `demande_service` (
  `num_demande_service` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `num_service` binary(16) NOT NULL,
  `num_client` binary(16) NOT NULL,
  `num_jobber` binary(16) NOT NULL,
  `tms_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tms_realisation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `adresse` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `taux_horaire` DECIMAL(10, 2) NOT NULL,
  `etat` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'EN_ATTENTE',
  `nbre_dheures_demandee` int NOT NULL,
  `nbre_heures_effectuee` int NOT NULL,
  PRIMARY KEY (`num_demande_service`),
  KEY `num_client` (`num_client`),
  FOREIGN KEY (`num_service`) REFERENCES `service` (`num_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demande_service`
--


INSERT INTO `demande_service` (`num_service`, `num_client`, `num_jobber`, `tms_creation`, `tms_realisation`, `adresse`, `taux_horaire`, `etat`, `nbre_dheures_demandee`) VALUES
(0x3bd629f3a9b011ed890026c4633eef49, 0x3bd629f3a9b011ed890026c4633eef42, 0xf5308d14058b49a38a87ec39c1d0c2a5, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 50, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0x3bd629f3a9b011ed890026c4633eef42, 0xf5308d14058b49a38a87ec39c1d0c2a5, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 50, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0x3bd629f3a9b011ed890026c4633eef42, 0xdde82d6a785911eeb34b0242ac190002, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 50, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0x3bd629f3a9b011ed890026c4633eef42, 0xdde82d6a785911eeb34b0242ac190033, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 25, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0x2e19af556b3a42c5b4c186c8cb8c4150, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 50, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0x2e19af556b3a42c5b4c186c8cb8c4150, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 50, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0x2e19af556b3a42c5b4c186c8cb8c4150, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 25, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120529, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 40, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120529, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 45, 'EN_COURS', 0),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120529, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, '2023-02-11 02:11:21', '2023-05-17 15:00:31', '', 25, 'EN_COURS', 0);

-- --------------------------------------------------------

--
-- Structure de la table `service_comment`
--
DROP TABLE IF EXISTS `service_comment`;
CREATE TABLE IF NOT EXISTS `service_comment` (
  `comment_id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `num_service` binary(16) NOT NULL,
  `num_client` binary(16) NOT NULL,
  `num_jobber` binary(16) NOT NULL,
  `comment_text` TEXT,
  `note` INT UNSIGNED,
  `comment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`num_service`) REFERENCES `service` (`num_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertion de données de tests dans la table `service_comment`
INSERT INTO `service_comment` (`num_service`, `num_client`, `num_jobber`, `comment_text`, `note`) VALUES 
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120751, 0xdde82d6a785911eeb34b0242ac190002, "Ce service de déménagement est vraiment excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120589, 0xdde82d6a785911eeb34b0242ac190002, "Ce service m'a facilité la vie!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0xdde82d6a785911eeb34b0242ac190002, "Excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120279, 0xdde82d6a785911eeb34b0242ac190033, "Merveilleux! Merci encore!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120529, 0xdde82d6a785911eeb34b0242ac190033, "Wow!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0xdde82d6a785911eeb34b0242ac190033, "Si simple!", 3),
(0x31b576ac660711eeb8f60242ac160002, 0xb7000b8c602811eeae970242ac120529, 0xdde82d6a785911eeb34b0242ac190443, "Ce service m'a facilité la vie!", 4),
(0x76d99485dc1a41a1a3215f581ccc8b95, 0xb7000b8c602811eeae970242ac120751, 0xdde82d6a785911eeb34b0242ac190443, "Excellent!", 5),
(0x653eae5f660711eeb8f60242ac160002, 0xb7000b8c602811eeae970242ac120279, 0xdde82d6a785911eeb34b0242ac190443, "Merveilleux! Merci encore!", 5),
(0x749ef34a660711eeb8f60242ac160002, 0xb7000b8c602811eeae970242ac120269, 0xdde82d6a785911eeb34b0242ac190002, "Wow!", 5),
(0x7fda5a55660711eeb8f60242ac160002, 0xb7000b8c602811eeae970242ac120589, 0xdde82d6a785911eeb34b0242ac190002, "Si simple!", 3),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120751, 0xf5308d14058b49a38a87ec39c1d0c2a5, "Ce service de déménagement est vraiment excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120589, 0x2e19af556b3a42c5b4c186c8cb8c4150, "Ce service m'a facilité la vie!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120269, 0x2e19af556b3a42c5b4c186c8cb8c4150, "Ce service m'a facilité la vie!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120529, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, "Excellent!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120279, 0x8c14cf0c2d8c4ab1a8fe527b19520199, "Excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120589, 0x90e3e4bc80cc45b9926755b65f3b7ff2, "Excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120751, 0x5d20e390394a4a6a9c7be94ac29be254, "Excellent!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120279, 0x2e19af556b3a42c5b4c186c8cb8c4150, "Excellent travail!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120589, 0x2e19af556b3a42c5b4c186c8cb8c4150, "Mon déménagement c'est super bien passé grâce à elle!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120751, 0x2e19af556b3a42c5b4c186c8cb8c4150, "Rien à dire! C'était super!", 5),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120279, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, "Excellent travail!", 4),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120589, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, "Mon déménagement c'est super bien passé grâce à lui!", 3),
(0x3bd629f3a9b011ed890026c4633eef49, 0xb7000b8c602811eeae970242ac120751, 0xd7aeb0d91dd54d7e9e64152c6f5af42e, "Rien à dire! C'était super!", 5);


--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `fkey_num_categorie` FOREIGN KEY (`num_categorie`) REFERENCES `categorie` (`num_categorie`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
