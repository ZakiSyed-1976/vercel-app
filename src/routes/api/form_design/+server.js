import { json } from '@sveltejs/kit';

import pool from '$lib/db/mysql';

export async function POST( { request }) {
    
    const formFields = await request.json();

    console.log(`+server.js:: POST formFields `, formFields);

    let sql = `INSERT INTO SZ_FORM_FIELD(FIELD_ID, LABEL, PLACE_HOLDER, TYPE, DATA_TYPE, EDITABLE, MANDATORY, MAX_SIZE, MIN_SIZE, CREATED_BY, UPDATED_BY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {

        let connection = await pool.getConnection();

        await connection.beginTransaction();

        for(let i =0; i<formFields.length; i++) {
            let field = formFields[i];
            let result  = await connection.query(sql, [field.id, field.label, field.placeHolder, field.type, field.subType,  field.editable, field.mandatoryFlag, field.maxSize, field.minSize, 1, 1 ]);
            console.log(`/api/form_design/+server.js :: POST rows inserted `, result);

        }
        await connection.commit();
        return json({
            success: true
        });    
    }catch(err) {
        console.error(`/api/form_design/+server.js :: POST Error while saving form fields, reason `, err);
        await connection.rollback();
        return json({
            success: false
        });
    }

    
}