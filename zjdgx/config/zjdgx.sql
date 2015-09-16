create table user (
	id int(4) not null primary key auto_increment,
	name varchar(20) not null,
	email varchar(40),
	phone varchar(12),
	password varchar(20) not null,
	register_date datetime not null
);

/**
 * subjects: 11,12,13...,21,22,23,....
 *			11: 1小学, 1语文
 *			12: 1小学, 1数学......
 */
create table teacher (
	id int(4) not null primary key auto_increment,
	name varchar(20) not null,
	email varchar(40),
	phone varchar(12) not null,
	password varchar(20) not null,
	headIcon varchar(40),
	register_date datetime not null,
	teach_number int(4) not null default 0,
	location varchar(200) not null,
	subjects varchar(40) not null,
	school varchar(40) not null,
	type TINYINT(1) not null,
	sex TINYINT(1) not null
);

INSERT INTO teacher (name, email, phone, password, headIcon, register_date, teach_number, location, subjects, school, type, sex) values("张三", "zhangsan@163.com", "13532934532", "111111", null, CURRENT_TIMESTAMP(), 3, "青羊区高鹏大道234号", "21,22,23,32", "川师大", 0, 0);

INSERT INTO teacher (name, email, phone, password, headIcon, register_date, teach_number, location, subjects, school, type, sex) values("李四", "lisi@163.com", "13654682136", "222222", null, CURRENT_TIMESTAMP(), 5, "高新区天府大道4234号", "23,32", "电子科大", 0, 1);


INSERT INTO teacher (name, email, phone, password, headIcon, register_date, teach_number, location, subjects, school, type, sex) values("王五", "wangw@163.com", "13964682136", "333333", null, CURRENT_TIMESTAMP(), 5, "锦江区成龙大道4234号", "23,32", "西南科大", 1, 1);

INSERT INTO teacher (name, email, phone, password, headIcon, register_date, teach_number, location, subjects, school, type, sex) values("溜溜", "liuliu@163.com", "13665922136", "777777", null, CURRENT_TIMESTAMP(), 8, "金牛区经济数学大道4234号", "31,32", "西南财大", 1, 1);