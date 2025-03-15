-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: curtainshop
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (2,1,3,2),(3,1,8,1),(4,1,20,2),(5,1,1,1),(6,1,2,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `address` text NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `id_status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `order_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (10,2,'вапппапрапрпар','Карта',1,'2025-03-15 18:12:47'),(11,2,'митмиттмитми','Карта',1,'2025-03-15 18:29:43');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (15,10,2,5,5999.99),(16,11,2,5,5999.99),(17,11,11,5,6499.99);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'new','Новое'),(2,'confirmed','Подтверждено'),(3,'canceled','Отменено');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` enum('На складе','Распродано') NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `high_res_image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Элегантные австрийские шторы','Австрийские','На складе',10.00,'150x250 см',7599.99,'/images/elegant_austrian.png','2025-03-04 19:09:54','Элегантные австрийские шторы, выполненные в классическом стиле, идеально подходят для создания уютной атмосферы в вашем доме.','/images/original_res/elegant_austrian.png'),(2,'Классические прямые шторы','Прямые','На складе',NULL,'200x280 см',5999.99,'/images/classic_straight.png','2025-03-04 19:09:54','Классические прямые шторы, идеально подходят для современного интерьера и дарят чувство простора.','/images/original_res/classic_straight.png'),(3,'Лондонские шторы с узором','Лондонские','На складе',15.00,'140x240 см',8299.99,'/images/london_patterned.png','2025-03-04 19:09:54','Лондонские шторы с изысканным узором, которые станут настоящим акцентом в вашем интерьере.','/images/original_res/london_patterned.png'),(4,'Фактурные плотные шторы','Фактурные','Распродано',NULL,'180x260 см',6999.99,'/images/textured_heavy.png','2025-03-04 19:09:54','Фактурные плотные шторы, создающие атмосферу уюта и уединенности.','/images/original_res/textured_heavy.png'),(5,'Римские шторы с паттерном','Римские','На складе',5.00,'120x220 см',4999.99,'/images/roman_patterned.png','2025-03-04 19:09:54','Римские шторы с узором, сочетающие стильный дизайн и удобство использования.','/images/original_res/roman_patterned.png'),(6,'Французские шторы с драпировкой','Французские','На складе',NULL,'160x250 см',10499.99,'/images/french_draped.png','2025-03-04 19:09:54','Французские шторы с драпировкой, придающие комнате утонченность и шик.','/images/original_res/french_draped.png'),(7,'Японские панельные шторы','Японские','Распродано',NULL,'90x300 см',7999.99,'/images/japanese_panel.png','2025-03-04 19:09:54','Японские панельные шторы, идеально подходящие для тех, кто ценит стиль и лаконичность.','/images/original_res/japanese_panel.png'),(8,'Скандинавские льняные шторы','Скандинавские','На складе',NULL,'150x260 см',6799.99,'/images/scandinavian_linen.png','2025-03-04 19:09:54','Скандинавские льняные шторы, создающие спокойную атмосферу в доме.','/images/original_res/scandinavian_linen.png'),(9,'Тюль с цветочным узором','Тюль','На складе',NULL,'300x280 см',3499.99,'/images/tulle_patterned.png','2025-03-04 19:09:54','Тюль с цветочным узором, которая добавит нежности и романтики в интерьер.','/images/original_res/tulle_patterned.png'),(10,'Австрийские шторы с бахромой и кистями','Австрийские','На складе',NULL,'160x270 см',8899.99,'/images/austrian_valance.png','2025-03-04 19:09:54','Элегантные австрийские шторы с бахромой и кистями, создающие роскошный акцент в интерьере.','/images/original_res/austrian_valance.png'),(11,'Минималистичные прямые шторы','Прямые','На складе',10.00,'220x300 см',6499.99,'/images/straight_minimalist.png','2025-03-04 19:09:54','Минималистичные прямые шторы, подходящие для современных интерьеров и создающие элегантный стиль.','/images/original_res/straight_minimalist.png'),(12,'Лондонские шторы с бархатом','Лондонские','Распродано',NULL,'150x250 см',7999.99,'/images/london_velvet.png','2025-03-04 19:09:54','Лондонские шторы с бархатным покрытием, придающие помещению роскошную атмосферу.','/images/original_res/london_velvet.png'),(13,'Фактурные шторы с узором','Фактурные','На складе',20.00,'170x280 см',7299.99,'/images/textured_patterned.png','2025-03-04 19:09:54','Фактурные шторы с узором, которые отлично подходят для создания теплой и уютной обстановки.','/images/original_res/textured_patterned.png'),(14,'Римские шторы с принтом','Римские','На складе',NULL,'130x230 см',5299.99,'/images/roman_printed.png','2025-03-04 19:09:54','Римские шторы с принтом — стильное и оригинальное решение для вашего окна.','/images/original_res/roman_printed.png'),(15,'Французские шторы с кружевом','Французские','На складе',5.00,'180x270 см',9599.99,'/images/french_lace.png','2025-03-04 19:09:54','Французские шторы с кружевом, добавляющие романтический шарм в интерьер.','/images/original_res/french_lace.png'),(16,'Японские шторы с графическим дизайном','Японские','Распродано',NULL,'100x280 см',8499.99,'/images/japanese_patterned.png','2025-03-04 19:09:54','Японские шторы с графическим дизайном, отлично дополняющие современный интерьер.','/images/original_res/japanese_patterned.png'),(17,'Скандинавские легкие шторы','Скандинавские','На складе',15.00,'140x260 см',5799.99,'/images/scandinavian_light.png','2025-03-04 19:09:54','Скандинавские легкие шторы, идеально подходящие для оформления светлого и воздушного пространства.','/images/original_res/scandinavian_light.png'),(18,'Тюль с вышивкой','Тюль','На складе',NULL,'280x290 см',3899.99,'/images/tulle_embroidered.png','2025-03-04 19:09:54','Тюль с вышивкой, создающий изысканную атмосферу в вашем доме.','/images/original_res/tulle_embroidered.png'),(19,'Ажурные вуалевые шторы','Вуалевые','На складе',NULL,'250x280 см',4099.99,'/images/voile_lace.png','2025-03-04 19:09:54','Ажурные вуалевые шторы, придающие комнате элегантность и легкость.','/images/original_res/voile_lace.png'),(20,'Блэкаут шторы для затемнения','Блэкаут','На складе',25.00,'200x300 см',9999.99,'/images/blackout_darkening.png','2025-03-04 19:09:54','Блэкаут шторы для затемнения, обеспечивающие надежную защиту от света и шума.','/images/original_res/blackout_darkening.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'user','Пользователь'),(2,'admin','Администратор');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_role` int NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'test1','$2b$10$/BA30P1k9bz3JoqlkeLEdOx34eYJl4gbN9fPRJLOSigqw5irorPI.','test','+987008','test@tesdt.com'),(2,1,'test2','$2b$10$D.ulNJfrScNjag4SvtVqGeMkHr4IjK5/8xWNBDadlRCLTabDaKehe','sdfdsfsdf','+7068678','swdfs@sdadsf.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-15 20:01:46
