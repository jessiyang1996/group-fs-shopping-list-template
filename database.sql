-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "shopping_list" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(80) NOT NULL,
	"quantity" decimal NOT NULL,
	"unit" varchar(20),
	"purchased" BOOLEAN DEFAULT false
);

INSERT INTO "shopping_list" ("name", "quantity", "unit")
VALUES ();

SELECT * FROM "shopping_list";