BEGIN TRANSACTION;

INSERT INTO users (joined, name, email, entries) VALUES ('2020-07-05', 'Jason', 'jb112@gmail.com', 8);
INSERT INTO login (email, hash) VALUES ('jb112@gmail.com', 'generate hash');

COMMIT;