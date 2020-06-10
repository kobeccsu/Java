-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
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
-- Table structure for table `attr_val`
--

DROP TABLE IF EXISTS `attr_val`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attr_val` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `attr_id` int(11) DEFAULT NULL,
  `attr_value` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attr_val`
--

LOCK TABLES `attr_val` WRITE;
/*!40000 ALTER TABLE `attr_val` DISABLE KEYS */;
/*!40000 ALTER TABLE `attr_val` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attribute`
--

DROP TABLE IF EXISTS `attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `attr_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute`
--

LOCK TABLES `attribute` WRITE;
/*!40000 ALTER TABLE `attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'cedd86b6-a642-11ea-a551-345a26b20b20','Child1',6,1),(2,'e689c482-a642-11ea-a551-345a26b20b20','男鞋/運動/户外',6,0),(3,'f5a3de26-a642-11ea-a551-345a26b20b20','child1',1,1),(4,'ff222426-a642-11ea-a551-345a26b20b20','child2',1,1),(5,'09e4c102-a643-11ea-a551-345a26b20b20','grandchild1',4,1),(6,'c2e8974c-a6d3-11ea-a551-345a26b20b20','superroot',-999,0),(7,'6196c05e-a958-11ea-a551-345a26b20b20','child3',1,1),(8,'9d6a5796-a95b-11ea-a551-345a26b20b20','母嬰/玩具樂器/寵物生活',6,0),(9,'b451dbd2-a95b-11ea-a551-345a26b20b20','男裝/女裝/童裝/内衣',6,0),(10,'f59b3b56-a95b-11ea-a551-345a26b20b20','運動鞋包',2,0),(11,'fcde7946-a95b-11ea-a551-345a26b20b20','運動服飾',2,0),(12,'04c37904-a95c-11ea-a551-345a26b20b20','篮球鞋',10,0),(13,'0f3e6d9e-a95c-11ea-a551-345a26b20b20','BigType2',6,1),(14,'49704070-aa18-11ea-ada5-825d4a5ae777','T-shirt',11,0),(15,'69aa9408-aa18-11ea-ada5-825d4a5ae777','童車童床',8,0),(16,'7afe9380-aa18-11ea-ada5-825d4a5ae777','婴儿床',15,0),(17,'9dc4e586-aa18-11ea-ada5-825d4a5ae777','男裝',9,0),(18,'ab1a93a2-aa18-11ea-ada5-825d4a5ae777','休閑褲',17,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL,
  `goodsname` varchar(500) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(200) DEFAULT NULL,
  `banner_pic` blob,
  `detail_pic` blob,
  `buy_count` int(11) DEFAULT NULL,
  `buy_m_count` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `promotional_price` float DEFAULT NULL,
  `is_agent` tinyint(4) DEFAULT NULL,
  `is_promotion` tinyint(4) DEFAULT NULL,
  `is_market` tinyint(4) DEFAULT NULL,
  `is_hot` tinyint(4) DEFAULT NULL,
  `is_new` tinyint(4) DEFAULT NULL,
  `is_index` tinyint(4) DEFAULT NULL,
  `group_buy_id` int(11) DEFAULT NULL,
  `quick_buy_id` int(11) DEFAULT NULL,
  `goods_des` varchar(200) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `freight_tmlp_name` varchar(200) DEFAULT NULL,
  `freight_tmpl_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_attr`
--

DROP TABLE IF EXISTS `goods_attr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `attr_val_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_attr`
--

LOCK TABLES `goods_attr` WRITE;
/*!40000 ALTER TABLE `goods_attr` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods_attr` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (1,'REAL','cfe7071d-61b1-11ea-ada3-80e82c9e4843'),(3,'gfsfer','dab1c2e7-61b1-11ea-ada3-80e82c9e4843'),(5,'brgbrtbr','e5478654-61b1-11ea-ada3-80e82c9e4843'),(6,'btenyerfg','e7a70772-61b1-11ea-ada3-80e82c9e4843'),(7,'s1111','fcdcae68-61b2-11ea-ada3-80e82c9e4843'),(10,'nyyumyu','38e3ffb7-61b3-11ea-ada3-80e82c9e4843'),(12,'gfnfgnh','3d374462-61b3-11ea-ada3-80e82c9e4843'),(13,'gnhfgngnh','3ec09a16-61b3-11ea-ada3-80e82c9e4843'),(14,'tjmthnghn','4132f44f-61b3-11ea-ada3-80e82c9e4843'),(15,'dfgdhtr','3ff2c260-61d5-11ea-ada3-80e82c9e4843'),(16,'nfgn44','46bf46ec-61d5-11ea-ada3-80e82c9e4843'),(17,'fwrgerer','68e13c34-61d5-11ea-ada3-80e82c9e4843'),(18,'bgrnrtnrtn','6b1ffec7-61d5-11ea-ada3-80e82c9e4843'),(19,'ntrhntrerh','6d2e4eb4-61d5-11ea-ada3-80e82c9e4843'),(20,'ntrnmtymrym','6f3a2eab-61d5-11ea-ada3-80e82c9e4843'),(22,'nerntth','72a02e4f-61d5-11ea-ada3-80e82c9e4843'),(23,'nenrthrth','743ba9ab-61d5-11ea-ada3-80e82c9e4843'),(24,'ernthrhh','75d85c6d-61d5-11ea-ada3-80e82c9e4843'),(28,'afsdfasf','bd8293c1-61d8-11ea-ada3-80e82c9e4843'),(29,'sdfgsdg','c0d19f61-61d8-11ea-ada3-80e82c9e4843'),(30,'bfgbgerg','c3385b89-61d8-11ea-ada3-80e82c9e4843'),(31,'May9th','e337db97-91bc-11ea-a432-80e82c9e4843'),(32,'Niubility','ed378d80-9351-11ea-a432-80e82c9e4843');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'47274da5-6296-11ea-ada3-80e82c9e4843','zhoulei'),(3,'58e43cc4-6297-11ea-ada3-80e82c9e4843','ImReal'),(4,'5ab73b08-6297-11ea-ada3-80e82c9e4843','5htrgg'),(5,'5d0cd988-6297-11ea-ada3-80e82c9e4843','h5hgert5t'),(6,'5ed6376b-6297-11ea-ada3-80e82c9e4843','etyntryntymtym'),(7,'614987bb-6297-11ea-ada3-80e82c9e4843','vderteruu'),(11,'68ba027a-6297-11ea-ada3-80e82c9e4843','asdfasdfasd'),(12,'fcda1018-629a-11ea-ada3-80e82c9e4843','dfgdgdf'),(13,'0307e48e-629b-11ea-ada3-80e82c9e4843','dfgdfh'),(15,'3f76b1b8-6e6d-11ea-ada3-80e82c9e4843','fff'),(17,'71097538-7a26-11ea-b5ce-80e82c9e4843','RoleHasPolicy'),(18,'805f6e27-8059-11ea-b5ce-80e82c9e4843','Awesome'),(20,'96fd3b8d-82b3-11ea-b5ce-80e82c9e4843','Niubility'),(21,'5e22d3f9-8395-11ea-b5ce-80e82c9e4843','Admin'),(22,'2c2ca205-91a5-11ea-a432-80e82c9e4843','BySrpingBoot');
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_policy_ref`
--

LOCK TABLES `role_policy_ref` WRITE;
/*!40000 ALTER TABLE `role_policy_ref` DISABLE KEYS */;
INSERT INTO `role_policy_ref` VALUES (44,20,3,NULL,NULL),(45,20,6,NULL,NULL),(46,20,12,NULL,NULL),(47,20,8,NULL,NULL),(48,20,28,NULL,NULL),(49,20,1,NULL,NULL),(60,1,18,NULL,NULL),(61,1,2,NULL,NULL),(62,1,1,NULL,NULL),(63,1,3,NULL,NULL),(64,1,7,NULL,NULL),(65,21,5,NULL,NULL),(66,21,3,NULL,NULL),(67,21,2,NULL,NULL),(68,21,1,NULL,NULL),(69,18,1,NULL,NULL),(70,18,2,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user_ref`
--

LOCK TABLES `role_user_ref` WRITE;
/*!40000 ALTER TABLE `role_user_ref` DISABLE KEYS */;
INSERT INTO `role_user_ref` VALUES (21,4,1,NULL,NULL),(22,2,1,NULL,NULL),(23,1,1,NULL,NULL),(24,20,1,NULL,NULL),(25,17,1,NULL,NULL),(26,18,1,NULL,NULL),(27,21,1,NULL,NULL),(30,21,2,NULL,NULL),(31,18,2,NULL,NULL);
/*!40000 ALTER TABLE `role_user_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `theme` varchar(200) DEFAULT NULL,
  `is_closed` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'Shop2','Theme2',1),(3,'Shop1','Theme1',0);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'zhoulei','PNRqDNNzXvv+LbMIFRrwseGB/DMT6ORks6GPPO3/9h8=','o5nC7fpUMID7zVwNvD2Mk5op5QyO6E','14a4da8c-38d3-11ea-921b-80e82c9e4843'),(2,'normal','WeZlrZdXwFa11ZJ4VPgyf92PC03gY3Mhp+MDz9IHdmA=','43A1YlUwW7ZJMb9gYwQzPPr6Hgahar',NULL);
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

-- Dump completed on 2020-06-10 17:35:05
