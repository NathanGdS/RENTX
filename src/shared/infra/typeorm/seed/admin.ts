import { hashSync } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();

    const passHash = hashSync("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar)
         VALUES ('${id}', 'admin', 'admin@admin.com', '${passHash}', true, 'now()', 'XXXXXX', null)
        `
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
