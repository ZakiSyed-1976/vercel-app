import pool from '$lib/db/mysql.js';

export async function load({cookies}) {
    
    try {
        let sql = `SELECT * FROM SZ_FORM_FIELD`;
        let [ formFields ] = await pool.query(sql);
        console.log(`/form/+page.server.js:: load() formFields `, JSON.stringify(formFields));
        return {
            success: true,
            formFields
        }

    }catch(err) {
        console.error(`/form/+page.server.js:: load() Error while loading form fields, reason `, err);
        return {
            success: false,
            message: `Error Occured while loading form fields, reason ${err}`
        }
    }
}

export const actions = {
    saveRecord: async (event) => {

        let tableName = 'employee'
        let field = '';
        let fieldName;
        let insertSQL  = `INSERT INTO ${tableName} (`;
        let quotations = '';
        let values = [];
        try {

            let formData = await event.request.formData();
            console.log(`/form/+page.server.js :: saveRecord formData `, formData);

            let sql = `SELECT * FROM SZ_FORM_FIELD`;
            let [ formFields ] = await pool.query(sql);
            for(let i = 0; i< formFields.length; i++){
                field = formFields[i];
                fieldName = field.PLACE_HOLDER.replaceAll(" ",'_').toLowerCase();
                if( i != 0) {
                    insertSQL += ',';
                    quotations += ','
                }
                values.push(formData.get(fieldName));
                insertSQL = insertSQL + fieldName;
                quotations += '?'
            };
            insertSQL += `) VALUES ( ${quotations})`
            console.log(insertSQL);
            console.log(`values `, values);

            let [ result ] = await pool.query(insertSQL, values);
            console.log(JSON.stringify(result));
            return {
                success: true
            }

        }catch(err) {
            console.error(`/form/+page.server.js :: saveRecord Error while INSERT, reason `, err);
            return {
                success: false,                
            }
        }

    }    
};