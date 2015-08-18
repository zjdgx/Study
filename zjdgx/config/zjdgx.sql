create table user (
	id int(4) not null primary key auto_increment,
	name char(20) not null,
	email char(40),
	phone char(12),
	password char(20) not null,
	register_date datetime not null
);