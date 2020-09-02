BEGIN TRANSACTION;

INSERT INTO users (joined, name, email, entries) VALUES ('2020-07-05', 'Test', 'test@gmail.com', 8);
INSERT INTO login (email, hash) VALUES ('test@gmail.com', '$2a$10$7/z49xxvj.Kv2CC2mH.wxu7EFpuo51remQ4b0yMKrNrzlp4EzuWVS');

COMMIT;