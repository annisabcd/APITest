const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert
const should = chai.should
const expect = chai.expect

describe('API Test for "restful-api.dev"', () => {
    const BASE_URL = "https://api.restful-api.dev/"

    it('Test - GET All Objects', async () => {
        const response = await request(BASE_URL)
        .get("objects")

        // assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, "Google Pixel 6 Pro")
        assert.equal(response.body[0].data.color, "Cloudy White")

        expect(response.statusCode).to.equal(200)

        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - POST Store Object', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }

        const response = await request(BASE_URL)
        .post("objects")
        .send(body)


        console.log(response.statusCode);
        console.log(response.body)

        // assertion
        should(response.statusCode === 200)

        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        
    });


    it('Test - PUT Update Object', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 2049.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "color": "silver"
            }
         }
         const response = await request(BASE_URL)
         .put("objects")
         .send(body)

         console.log(response.statusCode);
         console.log(response.body)
 
         // assertion
         should(response.statusCode === 200)
 
         const schemaPath = "resources/jsonSchema/post-object-schema.json"
         const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
         assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - DELETE Object', async () => {
        const response = await request(BASE_URL)
        .delete("objects/1") // assuming you want to delete an object with ID 1, adjust as needed
    
        console.log(response.statusCode);
           
        // assertion
        should(response.statusCode === 200)
    
        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
    
});