import { hashSync } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const passHash = hashSync("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar)
             VALUES ('${id}', 'admin', 'admin@admin.com', '${passHash}', true, 'now()', 'XXXXXX', null)
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new Category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("Shouldn't be able to create a new Category that already exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
