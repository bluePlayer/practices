-- MySQL dump 10.13  Distrib 5.5.41, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: tabellarius
-- ------------------------------------------------------
-- Server version	5.5.41-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `cover` varchar(200) DEFAULT NULL,
  `year` date NOT NULL,
  `type` enum('album','compilation','single') NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'EO-EO','Nepravda pa toa e nepravda','1981-01-01','album','pop rock',1),(2,'Frank','Island','2002-03-01','album','blues',2),(3,'Vivir','Fonovisa','1997-01-08','album','latino',3),(4,'Cvetak zanovetak','Cvetak zanovetak','1988-03-08','album','turbofolk',4),(5,'Angele','Zovem da ti chuem glas','2007-03-08','album','pop',5);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `album_song`
--

DROP TABLE IF EXISTS `album_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album_song` (
  `album_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  KEY `album_id` (`album_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `album_song_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `album_song_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_song`
--

LOCK TABLES `album_song` WRITE;
/*!40000 ALTER TABLE `album_song` DISABLE KEYS */;
INSERT INTO `album_song` VALUES (1,5,1),(2,2,2),(3,3,1),(4,4,2),(5,1,1);
/*!40000 ALTER TABLE `album_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `country_id` int(11) NOT NULL,
  `short_bio` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Leva Patika','1979-10-10',1,'In the late 70s’, located in Skopje (then placed in Former Yugoslavia), some of the regional greatest musical talents got together and formed a band. It went by the name Leva patika (Left Shoe). It was originally formed by Granit Thaqi (vocals), Ramiz Jusufi – Ciki (keyboards), Aljo Ismaili (bass), Dragan Gruevski (guitar), and Boshko Donevski (drums). '),(2,'Amy Jane Winehouse','2003-01-01',2,'Amy Jade Winehouse (14 September 1983 – 23 July 2011) was an English singer and songwriter. She was known for her deep expressive contralto vocals and her eclectic mix of musical genres, including soul (sometimes labelled as blue-eyed soul and neo soul), rhythm and blues, and jazz.'),(3,'Enrique Inglesias','1994-01-01',3,'Enrique Miguel Iglesias Preysler; born 8 May 1975), known professionally as Enrique Iglesias, is a Spanish singer, songwriter, actor and record producer. He is widely regarded as the King of Latin Pop.'),(4,'Svetlana Ceca Razhnatovich','1988-01-01',4,'Svetlana Ceca Ražnatovi? (ro?ena Veli?kovi?, 14. juna 1973. u Žitora?i) srpska je pop-folk peva?ica koja se smatra jednom od najve?ih zvezda u jugoisto?noj Evropi. Uživa ogromnu popularnost na podru?ju bivše Jugoslavije, ali i kritike zbog toga što je bila udata za kontroverznog vo?u srpskih paravojnih formacija Željka Ražnatovi?a Arkana.'),(5,'Antonia Shola','2006-01-01',5,'Born in Zagreb to Kaja and Marko Šola, both whom hailed from Tomislavgrad, she graduated sociology and Croatian culture before turning to show business. In 1998, she won the regional contest of Miss Croatia as Miss Istria and Kvarner.');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abbrev` varchar(5) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'MK','Macedonia'),(2,'EN','Britain'),(3,'SP','Spain'),(4,'SR','Serbia'),(5,'CR','Croatia');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `lyrics` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'Zovem da ti chiem glas','3:15','Mislim na tebe, sunce izlazi,dal* ti falim kao meni ti. Pjesme ljubavne,dal* te podsjete sto smo bili jedno drugome. Promjenila sam se neces me prepoznati, kad ti kazem koliko znacis mi. REF. Zovem da ti cujem glas, da te podjetim na nas da te pitam kako si sto je novoljubavi, zovem da ti kazem sve tvoja sam i volim te i da nemam nikoga samo tebe jednoga! Mislim na tebe, sunce izlazi, dal* ti falim kao meni ti. Promjenila sam se neces me prepoznati, kad ti kazem koliko znacis mi. REF. Zovem da ti cujem glas, da te podsjetim na nas da te pitam kako si sto je novo ljubavi, zovem da ti kazem sve tvoja sam i volim te i da nemam nikoga samo tebe jednoga!'),(2,'Know you know','3:03','\"Know You Now\" You\'re just a little boy underneath that hat. You need your nerve to hide your ego - don\'t come with thatYou think everything is handed to you free But it\'s not that easy, no I gotta know you now We may never meet again I gotta know you now and then My girl says I\'m too sensitive to ride with you But I\'m not listening to her, mm hm Yes I\'m perceptive so when I\'ve dance with you you\'ll whisk your head back the way it were As you were I gotta know you no We may never meet again I gotta know you now and then [Ad lib] Oh, I\'m not ruling you out I\'m just in doubt as to what you say you\'re all about, yeah I gotta know you now We may never meet again I gotta show you now and them I gotta know you now and then I gotta know you now We may never meet again I gotta know you now We may never meet again I gotta know you now We may never meet again I gotta know you now We may never meet again '),(3,'Enamorada Por Primer Ver','4:28','\"Enamorado Por Primera Vez\" \nCuanto silencio \nEn esta vieja habitacion \ndesde que te fuiste de mi vida\nsigo esperando\nque el viento sople a mi favor\ny que traiga de vuelta\nla pasion que se robo\nY cuantos momentos\nque vivimos tu y yo\ny quien lo diria\nqueesto acabaria\npero sigo insistiendo\nque todo tiene solucion\nhasta un ciego veria\nque marcharte fue un error\nPorque tu\neressolopara mi\nuna mirada y ya cai\nenamarado por primera vez\nYo solo vivo para ti\ndesde el momento que te vi\nenamarado por primera vez\nCuantos promesas\nhas quedado sin cumplir\nse han convertido en suenos\nsin un fin\npero sigo insistiendo\nque algun dia volveras\ny que traeras de vuelta\nnuestra felicidad\nY cuantos mementos\nque vivimos tu y yo\ny quien lo diria\nque esto acabaria\nperosigo insistiendo\nque todo tiene solucion\nhasta un ciego veria\nque marcharte fue un error\nPorque tu\neres solo para mi\nunamirada y ya cai\nenamarado por primera vez\nYo solo vivo para ti\ndesde el momento que te vi\nenamorado por primera vez\nTu eres solo para mi\nuna mirada y ya cai\nenamarado por primera vez\nYo solo vivo para ti\ndesde el momento que te vi\nenamorado por primera vez\nTu eres solo para mi\nuna mirada y ya cai\nenamarado por primera vez\nYo solo vivo para ti\ndesde el momento que te vi\nenamorado por primera vez\nEnamorado por primera vez\nEnamorado por primera vez\n'),(4,'Желим те у младости','3:50','Osvajas me ti polako,\nNemirno je srce moje,\nPa se pita zbog mladosti,\nSta je moje, sta je tvoje.\n\nRef.\nHej, zelim te u mladosti,\nDaj, daj mi malo radosti,\nHocu da se opustim,\nPrestani, prestani s tim.\n\nZelela sam da uzivam,\nPored tebe bez problema,\nAl\' se bojim u ljubavi\nDa bez toga srece nema.\n\nRef.\n\nOstavljas me da razmisljam,\nSta ce biti medju nama,\nMislis da sam ravnodusna,\nBitis\' tobom ili sama.\n\nRef.\n'),(5,'Nepravda','3:45',' Sakam BMW Alpina ama nemam ni za Drina\nMamo Mamo spasi me\nSakam zenska luda fina da bide kako Lina\nMamo Mamo spasi me\n\nNeparavda pa toa e nepravda\nImas ti nemam jas\nSite velat deka mnogu baram\no baram baram no nemam!\n\nSakam sakam da sum slaven na segde da sum glaven\nMamo mamo spasi me\nUh sto sakam da sum slaven kaj Keti da sum glaven\nMamo mamo spasi me\n\nNeparavda pa toa e nepravda\nImas ti nemam jas\nSite velat deka mnogu baram\no baram baram no nemam!\n');
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-25 15:51:38
