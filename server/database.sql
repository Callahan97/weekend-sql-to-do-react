CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(35) NOT NULL,
    "location" VARCHAR(35) NOT NULL,
    "completed" BOOLEAN DEFAULT false
);

INSERT INTO "tasks" ("name", "location", "completed")
VALUES ('laundry', 'Home', false),
('Dishes', 'Home', false)
('Trash', 'Car', false);