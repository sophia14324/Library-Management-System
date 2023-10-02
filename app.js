const express = require('express');
const pool = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/createandseedtables', async (req, res) => {
    const sql = 
    `
    CREATE DATABASE IF NOT EXISTS library;
    USE library;
    CREATE TABLE IF NOT EXISTS book_type(id INT AUTO_INCREMENT, type VARCHAR(255), PRIMARY KEY(id));
    CREATE TABLE IF NOT EXISTS book_sub_type(id INT AUTO_INCREMENT, sub_type VARCHAR(255), PRIMARY KEY(id));
    CREATE TABLE IF NOT EXISTS book_language(id INT AUTO_INCREMENT, language VARCHAR(255), PRIMARY KEY(id));
    CREATE TABLE IF NOT EXISTS book_location(id INT AUTO_INCREMENT, location VARCHAR(255), PRIMARY KEY(id));

    CREATE TABLE IF NOT EXISTS book (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(255),
        tittle VARCHAR (255),
        book_type_id INT NOT NULL,
        book_sub_type_id INT,
        book_language_id INT NOT NULL,
        book_location_id INT NOT NULL,
        FOREIGN KEY(book_type_id) REFERENCES book_type(id),
        FOREIGN KEY(book_sub_type_id) REFERENCES book_sub_type(id),
        FOREIGN KEY(book_language_id) REFERENCES book_language(id),
        FOREIGN KEY(book_location_id) REFERENCES book_location(id)
     );

    INSERT INTO book_type (id, type)
    VALUES
    (DEFAULT, 'Architecture'),
    (DEFAULT, 'Art'),
    (DEFAULT, 'Biography'),
    (DEFAULT, 'Cinema'),
    (DEFAULT, 'Communication'),
    (DEFAULT, 'Cultural Studies'),
    (DEFAULT, 'Engineering'),
    (DEFAULT, 'Fiction'),
    (DEFAULT, 'Food'),
    (DEFAULT, 'Games'),
    (DEFAULT, 'Geography'),
    (DEFAULT, 'architecture'),
    (DEFAULT, 'History'),
    (DEFAULT, 'Humor'),
    (DEFAULT, 'Literature'),
    (DEFAULT, 'Management'),
    (DEFAULT, 'Music'),
    (DEFAULT, 'Pets'),
    (DEFAULT, 'Philosophy'),
    (DEFAULT, 'Photography'),
    (DEFAULT, 'Politics'),
    (DEFAULT, 'Psychology'),
    (DEFAULT, 'Religion'),
    (DEFAULT, 'Reference'),
    (DEFAULT, 'Science'),
    (DEFAULT, 'Travel'),
    (DEFAULT, 'True Crime');

    INSERT INTO book_sub_type (id, sub_type)
    VALUES
    (DEFAULT, 'American'),
    (DEFAULT, 'American Revolution'),
    (DEFAULT, 'Ancient'),
    (DEFAULT, 'Antarctica'),
    (DEFAULT, 'Asia'),
    (DEFAULT, 'Biography'),
    (DEFAULT, 'Bridge'),
    (DEFAULT, 'Buddhism'),
    (DEFAULT, 'Business'),
    (DEFAULT, 'Cats'),
    (DEFAULT, 'Chess'),
    (DEFAULT, 'Christian'),
    (DEFAULT, 'Civil'),
    (DEFAULT, 'Civil War'),
    (DEFAULT, 'Construction'),
    (DEFAULT, 'Cookbook'),
    (DEFAULT, 'Dictionary'),
    (DEFAULT, 'Dogs'),
    (DEFAULT, 'Economics'),
    (DEFAULT, 'Europe'),
    (DEFAULT, 'Finance'),
    (DEFAULT, 'Football'),
    (DEFAULT, 'Health'),
    (DEFAULT, 'Hinduism'),
    (DEFAULT, 'History'),
    (DEFAULT, 'architecture'),
    (DEFAULT, 'Horses'),
    (DEFAULT, 'Landscape'),
    (DEFAULT, 'Langugae'),
    (DEFAULT, 'Law'),
    (DEFAULT, 'Mathematics'),
    (DEFAULT, 'Mechanical/Electrical'),
    (DEFAULT, 'Military'),
    (DEFAULT, 'Modern'),
    (DEFAULT, 'Mystery'),
    (DEFAULT, 'Mythology'),
    (DEFAULT, 'Oceania'),
    (DEFAULT, 'Opera'),
    (DEFAULT, 'Philosophy'),
    (DEFAULT, 'Physics'),
    (DEFAULT, 'Reference');
    (DEFAULT, 'Relations'),
    (DEFAULT, 'Russia'),
    (DEFAULT, 'South America'),
    (DEFAULT, 'Safety'),
    (DEFAULT, 'Vertinary'),
    (DEFAULT, 'Vietname'),
    (DEFAULT, 'Western'),
    (DEFAULT, 'Wine'),
    (DEFAULT, 'W.W.I'),
    (DEFAULT, 'W.W.II');

    INSERT INTO book_language (id, language)
    VALUES
    (DEFAULT, 'English'),
    (DEFAULT, 'French'),
    (DEFAULT, 'German'),
    (DEFAULT, 'Spanish'),
    (DEFAULT, 'Italian');
    
    INSERT INTO book_location (id, location)
    VALUES
    (DEFAULT, 'Bonus Room'),
    (DEFAULT, 'Den'),
    (DEFAULT, 'Dining Room'),
    (DEFAULT, 'Family Room'),
    (DEFAULT, 'Garage'),
    (DEFAULT, 'Kitchen'),
    (DEFAULT, 'Living Room'),
    (DEFAULT, 'Master Bedroom'),
    (DEFAULT, 'Office'), 
    (DEFAULT, 'Storage');

    INSERT INTO book (id, author, title, book_type_id, book_sub_type_id, book_language_id, book_location_id)
    VALUES
    (DEFAULT, 'MORGAN, Gwyn', '69 A. D. - The Yeah of Four Emperors', 12, 5, 1, 6),
    (DEFAULT, 'MANN, Charles', '1491 - New Revelations of the Americas before Columbus', 12, 3, 1, 6);


    `;
    let err;
    const result = await pool.query(sql).catch(e => err=e);
    if (err) {
        console.error('Sql error: ', err);
        res.send('Sql error: ' + err);
    }
    res.send('Tables successfully created and seeded...');
     
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});