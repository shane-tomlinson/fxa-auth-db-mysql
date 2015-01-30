-- Add a lockedAt column for account locking.

ALTER TABLE accounts ADD COLUMN lockedAt BIGINT UNSIGNED DEFAULT NULL;

UPDATE dbMetadata SET value = '3' WHERE name = 'schema-patch-level';

