let addNewProductHandler = require("../handlers/product/addNewProductHandler").addNewProductHandler;

const method = "GET"

const event = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjNWU0MTg0M2M1ZDUyZTY4ZWY1M2UyYmVjOTgxNDNkYTE0NDkwNWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1kb2thbi1lMjQ2MyIsImF1ZCI6ImUtZG9rYW4tZTI0NjMiLCJhdXRoX3RpbWUiOjE3MjU5MDU0MjYsInVzZXJfaWQiOiJzcmNnaEphM3lrT2FGVHFCN0JGRk4zQ21YM3UyIiwic3ViIjoic3JjZ2hKYTN5a09hRlRxQjdCRkZOM0NtWDN1MiIsImlhdCI6MTcyNTkwNjE0MiwiZXhwIjoxNzI1OTA5NzQyLCJwaG9uZV9udW1iZXIiOiIrMjAxMTEyMjgyMjE4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjAxMTEyMjgyMjE4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.eZtq6oL14Ge8Dpqo9W2nkm7lQw-QNlfmnAJFlw61ZMBdHXhF3EGkhQRVFOJ3HxbHljL38g-X5h4hPk0u-iBIhAADN5QvVapEr7tISIOttHJfowDG1eJPX9p3FG6iWya6vXnt2iCCK_oz1mMG-7QdAJol02PG5ZCMbWyat9RQzCOKhJkPig7MPZyezYCZ1OgiJlGMpHS1ENsS_xe5873JnU662ucFxQbqENRCSs_gFoMfr7-02Cdz5ns2TqBrmG7crdx9Jd7GPX4EC_l30_J5tcPXegUPp_3j0xLv3CNTopWLhVPnJvjGEF5vGCN1ZAqoCjD1kvYM8fk3dM57-lTnDg"  
    },
    body:{
        "product_name" : "test",
        "product_description":   "test",
        "product_price": "1",
        "product_quantity": "1,5",
        "product_width": "1,5",
        "product_height": "1,5",
        "product_weight": "1,5",
        "product_length": "1,5",
        "product_discount": "1,5",
        "marketplace_id": "1",
        "marketplace_name": "Bride's ",
        "marketplace_lat": "0,0",
        "marketplace_lng": "0,0",
        "date_added": "1,0",
        "date_modified": "111,0",
        files:[
            {
                "fileName" : "",
                "fileContent": "",
                "contentType": "image/png"
            }
        ]

    }
}

async function test() {
    try {
        
        const result = await addNewProductHandler(event);
        console.log(result);
        
        return result;
    } catch (error) {
        console.error("Error executing handler:", error);
        throw error;
    }
}

exports.default = test();