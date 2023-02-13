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
	avatar text,
	created_day timestamp,
	country_id int,
	singer_id int,
	CONSTRAINT fk_albums_countries
	FOREIGN KEY (country_id) 
	REFERENCES countries(_id),
	
	CONSTRAINT fk_albums_singers
	FOREIGN KEY (singer_id) 
	REFERENCES singers(_id)
);

create table singers (
	_id serial PRIMARY key,
	name varchar(255),
	avatar text,
	description text,
	effect boolean,
	created_day timestamp,
	country_id int,
	
	CONSTRAINT fk_singers_countries
	FOREIGN KEY (country_id) 
	REFERENCES countries(_id)
);

create table countries (
	_id serial PRIMARY key,
	name varchar(255),
	created_day timestamp
);

create table songs (
	_id serial PRIMARY key,
	name varchar(255),
	link varchar(255),
	description text,
	category_id int,
	album_id int null,
	country_id int,
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
	REFERENCES albums(_id),
	
	CONSTRAINT fk_songs_countries
    FOREIGN KEY(country_id) 
	REFERENCES countries(_id)
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

create table song_review (
	_id serial PRIMARY key,
    created_day timestamp,
    user_id int,
    review text,
    song_id int,
    status int,
    CONSTRAINT fk_songreview_song FOREIGN KEY (song_id)
	REFERENCES songs(_id),
    
    CONSTRAINT fk_songreview_user FOREIGN KEY (user_id)
	REFERENCES users(_id)
)

create table song_review_children (
	_id serial PRIMARY key,
	review_id int,
	user_id int,
	review text,
	status int,
	created_day timestamp,
	CONSTRAINT fk_songreviewchildren_songreview FOREIGN KEY (review_id)
	REFERENCES song_review(_id),
	
	CONSTRAINT fk_songreviewchildren_user FOREIGN KEY (user_id)
	REFERENCES users(_id)
);

CREATE EXTENSION unaccent;

create table keyword_search (
	_id serial NOT null PRIMARY KEY,
	keyword text,
	search_number int,
	created_day timestamp
)

create table playlist (
	_id serial NOT null PRIMARY KEY,
	user_id int,
	name varchar(255),
	created_day timestamp,
	CONSTRAINT fk_playlist_user FOREIGN KEY (user_id)
	REFERENCES users(_id)
);

create table playlist_detail (
	playlist_id int,
	song_id int,
	created_day timestamp,
	primary key (playlist_id, song_id),
	
	CONSTRAINT fk_playlistdetail_playlist FOREIGN KEY (playlist_id)
	REFERENCES playlist(_id),
	CONSTRAINT fk_playlist_song FOREIGN KEY (song_id)
	REFERENCES songs(_id)
);
    
create table report_song_list (
	_id serial NOT null PRIMARY KEY,
	user_id int,
	song_id int,
	reason text,
	created_day timestamp,
	CONSTRAINT fk_reportsonglist_user FOREIGN KEY (user_id)
	REFERENCES users(_id),
	CONSTRAINT fk_reportsonglist_song FOREIGN KEY (song_id)
	REFERENCES songs(_id)
);

create table user_flow (
	user_id int,
	followed int,
	created_day timestamp,
	primary key (user_id, followed),
	CONSTRAINT fk_userflow_user FOREIGN KEY (user_id)
	REFERENCES users(_id),
	CONSTRAINT fk_followed_user FOREIGN KEY (followed)
	REFERENCES users(_id)
);



CREATE TABLE user_chat (
  _id serial NOT null PRIMARY KEY,
  user_id int NOT NULL,
  owner_reply int DEFAULT NULL,
  message text NOT NULL,
  created_day timestamp,
  
  CONSTRAINT fk_userChat_user FOREIGN KEY (user_id)
	REFERENCES users(_id),
  CONSTRAINT fk_ownerReply_user FOREIGN KEY (owner_reply)
	REFERENCES users(_id)
)





