import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid"

import { newConnection } from "../index"

async function createAdm() {
    const connection = await newConnection("localhost");
    
    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(
        `INSERT INTO users(id, name, email, password, "admin", created_at, driver_license)
        values(${id}, 'Administrador', 'admin@gmail.com', '${password}', true, 'now()', 'XXXXX' )
        `
    )

    await connection.close();

}
createAdm().then(() => console.log('User admin created!'))