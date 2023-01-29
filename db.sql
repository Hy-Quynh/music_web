create table users (
	_id serial PRIMARY key,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	status boolean,
	rank varchar(10),
	birdthday timestamp,
	created_day timestamp
);

create table admins (
	_id serial PRIMARY key,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	status boolean,
	created_day timestamp
);

insert into admins(name, email, password, status, created_day) values('admin', 'admin@gmail.com', '$2b$10$FOEdPgsOy1l9zEq3IPGhH.s76HoZoEmDjlweU6guLkaGN7DXzIne.', true, Now());

create table categorys (
	_id serial PRIMARY key,
	name varchar(255),
	description text,
	created_day timestamp
);

create table albums (
	_id serial PRIMARY key,
	name varchar(255),
	description text,
	created_day timestamp
);

create table singers (
	_id serial PRIMARY key,
	name varchar(255),
	avatar text,
	description text,
	created_day timestamp
);

create table songs (
	_id serial PRIMARY key,
	name varchar(255),
	link varchar(255),
	description text,
	category_id int,
	album_id int null,
	status boolean,
	view int,
	favourite int,
	created_day timestamp,
	avatar text,
	
	CONSTRAINT fk_songs_categorys
    FOREIGN KEY(category_id) 
	REFERENCES categorys(_id),
	
	CONSTRAINT fk_songs_albums
    FOREIGN KEY(album_id) 
	REFERENCES albums(_id)
)

create table song_singer (
	song_id int,
	singer_id int,
	created_day timestamp,
	primary key (song_id, singer_id),
	
	CONSTRAINT fk_songSinger_songs
    FOREIGN KEY(song_id) 
	REFERENCES songs(_id),
	
	CONSTRAINT fk_songSinger_singers
    FOREIGN KEY(singer_id) 
	REFERENCES singers(_id)
)





