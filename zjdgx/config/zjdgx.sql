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


create table student (
	id int(4) not null primary key auto_increment,
	name varchar(20) not null,
	password varchar(20) not null,
	phone varchar(12) not null,
	qq varchar(15),
	email varchar(40),
	weixin varchar(15),
	school varchar(100)
);

create table record (
	id int(4) not null primary key auto_increment,

	studentId
)



111
1: 小学 1: 年级 1： 数学
112
1: 小学 1: 年级 2： 语文

id, level, cityId, name, parentId
1.country 2.province, 3.city 4.county 5.town

create table city (
	id smallint(6) unsigned not null primary key auto_increment,
	cityId int(6) unsigned not null,
	level tinyint(1) unsigned not null,
	name varchar(20) not null,
	parentId int(6) unsigned not null default 0
)Engine=InnoDB;


//获取京东城市信息并生成SQL
//-----------------------------------
```
var pid = 49323, level = 5;
$.ajax({
	type: 'POST',
	url: 'http://easybuy.jd.com//address/getTowns.action',
	data: {countyId:pid},
	dataType: 'JSON',
	success: function (data) {
		for (var item in data) {
			console.log('insert into city (cityId, level, name, parentId) values(' + item + ', ' + level +', "' + data[item] + '", ' + pid + ');');
		}
	}
});
```
//-----------------------------------

#2015/11/16
	增加subject表
	create table subjects (
    	id int(4) unsigned not null primary key auto_increment,
    	type TINYINT(1) not null,
    	parentType TINYINT(1),
    	name varchar(10) not null
    )Engine=InnoDB;

    INSERT INTO subjects (type, name) VALUES(1, '小学');
    INSERT INTO subjects (type, name) VALUES(2, '初中');
    INSERT INTO subjects (type, name) VALUES(3, '高中');
    INSERT INTO subjects (type, name) VALUES(4, '语言');
    INSERT INTO subjects (type, name) VALUES(5, '音乐');
    INSERT INTO subjects (type, name) VALUES(6, '其他');

    ##小学
    INSERT INTO subjects (type, parentType, name) VALUES(11, 1, '数学');
    INSERT INTO subjects (type, parentType, name) VALUES(12, 1, '语文');
    INSERT INTO subjects (type, parentType, name) VALUES(13, 1, '英语');

    ##初中
    INSERT INTO subjects (type, parentType, name) VALUES(21, 2, '数学');
    INSERT INTO subjects (type, parentType, name) VALUES(22, 2, '语文');
    INSERT INTO subjects (type, parentType, name) VALUES(23, 2, '英语');
    INSERT INTO subjects (type, parentType, name) VALUES(24, 2, '物理');
    INSERT INTO subjects (type, parentType, name) VALUES(25, 2, '化学');
    INSERT INTO subjects (type, parentType, name) VALUES(26, 2, '政治');
    INSERT INTO subjects (type, parentType, name) VALUES(27, 2, '历史');
    INSERT INTO subjects (type, parentType, name) VALUES(28, 2, '生物');

	##高中
	INSERT INTO subjects (type, parentType, name) VALUES(31, 3, '数学');
	INSERT INTO subjects (type, parentType, name) VALUES(32, 3, '语文');
	INSERT INTO subjects (type, parentType, name) VALUES(33, 3, '英语');
	INSERT INTO subjects (type, parentType, name) VALUES(34, 3, '物理');
	INSERT INTO subjects (type, parentType, name) VALUES(35, 3, '化学');
	INSERT INTO subjects (type, parentType, name) VALUES(36, 3, '政治');
	INSERT INTO subjects (type, parentType, name) VALUES(37, 3, '历史');
	INSERT INTO subjects (type, parentType, name) VALUES(38, 3, '生物');

	##语言
	INSERT INTO subjects (type, parentType, name) VALUES(41, 4, '英语');
	INSERT INTO subjects (type, parentType, name) VALUES(42, 4, '日语');
	INSERT INTO subjects (type, parentType, name) VALUES(43, 4, '韩语');

	##音乐
	INSERT INTO subjects (type, parentType, name) VALUES(51, 5, '手提琴');
	INSERT INTO subjects (type, parentType, name) VALUES(52, 5, '钢琴');
	INSERT INTO subjects (type, parentType, name) VALUES(53, 5, '吉他');
	INSERT INTO subjects (type, parentType, name) VALUES(53, 5, '二胡');

	##其他
	INSERT INTO subjects (type, parentType, name) VALUES(61, 6, '书法');
	INSERT INTO subjects (type, parentType, name) VALUES(62, 6, '跆拳道');

#2015/11/02
	更新teacher表, 增加cityId
	create table teacher (
		id bigint(11) unsigned not null primary key auto_increment,
		name varchar(20) not null,
		sex TINYINT(1) not null,
		phone varchar(12) not null,
		email varchar(40),
		password varchar(20) not null,
		headIcon varchar(40),
		register_date datetime not null,
		teach_number int(4) not null default 0,
		location varchar(200) not null,
		cityId int(6) not null,
		subjects varchar(40) not null,
		school varchar(40) not null,
		type TINYINT(1) not null
	)Engine=InnoDB;

2015/10/24：
	//获取京东城市信息并生成SQL
	//-----------------------------------
	```
	var pid = 49323, level = 5;
	$.ajax({
		type: 'POST',
		url: 'http://easybuy.jd.com//address/getTowns.action',
		data: {countyId:pid},
		dataType: 'JSON',
		success: function (data) {
			for (var item in data) {
				console.log('insert into city (cityId, level, name, parentId) values(' + item + ', ' + level +', "' + data[item] + '", ' + pid + ');');
			}
		}
	});
	```
	//-----------------------------------

2015/10/22：

	增加课表数据库course
	create table course (
		id int(4) unsigned not null primary key auto_increment,
		name varchar(20) not null,
		level tinyint(2) unsigned not null,

	)Engine=InnoDB;

2015/10/19：
	更新数据库：id改成11位的
	create table teacher (
		id bigint(11) unsigned not null primary key auto_increment,
		name varchar(20) not null,
		sex TINYINT(1) not null,
		phone varchar(12) not null,
		email varchar(40),
		password varchar(20) not null,
		headIcon varchar(40),
		register_date datetime not null,
		teach_number int(4) not null default 0,
		location varchar(200) not null,
		subjects varchar(40) not null,
		school varchar(40) not null,
		type TINYINT(1) not null
	)Engine=InnoDB;

	create table record (
		id bigint(11) unsigned not null primary key auto_increment,
		teacherId bigint(11),
		studentId bigint(11) not null,
		suject varchar(20) not null,
		updateTime datetime,
		createTime datetime,
		workTime datetime not null,
		teacherScore smallint(1),
		assessment varchar(200),
		score int(3),
		FOREIGN key (teacherId) REFERENCES teacher(id),
		FOREIGN key (studentId) REFERENCES student(id)
	)Engine=InnoDB;

2015/10/16:
	create table for student.
	create table student (
		id bigint(11) unsigned not null primary key auto_increment,
		name varchar(20) not null,
		phone varchar(12) not null,
		qq varchar(15),
		email varchar(40),
		weixin varchar(15),
		school varchar(100)

)Engine=InnoDB;