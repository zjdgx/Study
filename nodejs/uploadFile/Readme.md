2016/09/24: 
    使用mysql
    
    CREATE TABLE `uploadfiles` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `timeUploaded` datetime NOT NULL,
      `fileName` varchar(100) NOT NULL,
      `path` varchar(100) DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8