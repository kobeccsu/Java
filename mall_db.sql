-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: mall
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `policyname` varchar(200) DEFAULT NULL,
  `uid` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_policyname` (`policyname`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (1,'rr3434t','cfe7071d-61b1-11ea-ada3-80e82c9e4843'),(2,'g4g45g45g','d52c9d79-61b1-11ea-ada3-80e82c9e4843'),(3,'gfsfer','dab1c2e7-61b1-11ea-ada3-80e82c9e4843'),(5,'brgbrtbr','e5478654-61b1-11ea-ada3-80e82c9e4843'),(6,'btenyerfg','e7a70772-61b1-11ea-ada3-80e82c9e4843'),(7,'s1111','fcdcae68-61b2-11ea-ada3-80e82c9e4843'),(8,'sdsgs','11640c5e-61b3-11ea-ada3-80e82c9e4843'),(10,'nyyumyu','38e3ffb7-61b3-11ea-ada3-80e82c9e4843'),(12,'gfnfgnh','3d374462-61b3-11ea-ada3-80e82c9e4843'),(13,'gnhfgngnh','3ec09a16-61b3-11ea-ada3-80e82c9e4843'),(14,'tjmthnghn','4132f44f-61b3-11ea-ada3-80e82c9e4843'),(15,'dfgdhtr','3ff2c260-61d5-11ea-ada3-80e82c9e4843'),(16,'nfgn44','46bf46ec-61d5-11ea-ada3-80e82c9e4843'),(17,'fwrgerer','68e13c34-61d5-11ea-ada3-80e82c9e4843'),(18,'bgrnrtnrtn','6b1ffec7-61d5-11ea-ada3-80e82c9e4843'),(19,'ntrhntrerh','6d2e4eb4-61d5-11ea-ada3-80e82c9e4843'),(20,'ntrnmtymrym','6f3a2eab-61d5-11ea-ada3-80e82c9e4843'),(22,'nerntth','72a02e4f-61d5-11ea-ada3-80e82c9e4843'),(23,'nenrthrth','743ba9ab-61d5-11ea-ada3-80e82c9e4843'),(24,'ernthrhh','75d85c6d-61d5-11ea-ada3-80e82c9e4843'),(28,'afsdfasf','bd8293c1-61d8-11ea-ada3-80e82c9e4843'),(29,'sdfgsdg','c0d19f61-61d8-11ea-ada3-80e82c9e4843'),(30,'bfgbgerg','c3385b89-61d8-11ea-ada3-80e82c9e4843');
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `rolename` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_policy_ref`
--

DROP TABLE IF EXISTS `role_policy_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_policy_ref` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `policy_id` int(11) DEFAULT NULL,
  `role_uid` char(36) DEFAULT NULL,
  `policy_uid` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_policy_ref`
--

LOCK TABLES `role_policy_ref` WRITE;
/*!40000 ALTER TABLE `role_policy_ref` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_policy_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user_ref`
--

DROP TABLE IF EXISTS `role_user_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user_ref` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_uid` char(36) DEFAULT NULL,
  `user_uid` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user_ref`
--

LOCK TABLES `role_user_ref` WRITE;
/*!40000 ALTER TABLE `role_user_ref` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_user_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `uid` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'zhoulei','PNRqDNNzXvv+LbMIFRrwseGB/DMT6ORks6GPPO3/9h8=','o5nC7fpUMID7zVwNvD2Mk5op5QyO6E','14a4da8c-38d3-11ea-921b-80e82c9e4843');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-09 16:14:30
