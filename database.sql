database name = todo_list



CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(80) NOT NULL,
    "status" BOOLEAN DEFAULT 'false',
    "notes" VARCHAR (256),
    "timeCreated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "timeCompleted" TIMESTAMP
);






