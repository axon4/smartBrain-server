BEGIN;

INSERT INTO users (joined, name, "eMail", entries) VALUES ('2020-11-05', 'Test', 'test@test.test', 7);
INSERT INTO "logIn" ("eMail", hash) VALUES ('test@test.test', '$2a$10$6qGMFOWTquNEFuDTzzQg4.t0GQ7GnBeUckBwddJGkecI/FZoMPJ2u');

INSERT INTO users (joined, name, "eMail", entries) VALUES ('2023-11-18', 'Test2', 'test2@test.test', 8);
INSERT INTO "logIn" ("eMail", hash) VALUES ('test2@test2.test2', '$2a$10$O10.kVF.W9ipYyw.zJDec.eZikzeFOiUPYayT8cn5mnVgWeAnY9qq');

COMMIT;