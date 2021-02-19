BEGIN;

INSERT INTO users (joined, name, eMail, entries) VALUES ('2020-11-05', 'Test', 'test@gmail.com', 7);
INSERT INTO logIn (eMail, hash) VALUES ('test@gmail.com', '$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u');

COMMIT;