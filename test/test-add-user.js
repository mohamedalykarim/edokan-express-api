const { addNewUserHandler } = require("../handlers/user/addNewUserHandler");

let addNewMarketplaceHandler = require("../handlers/marketplace/addNewMarketplaceHandler").addNewMarketplaceHandler;

const method = "GET"

const event = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1kb2thbi1lMjQ2MyIsImF1ZCI6ImUtZG9rYW4tZTI0NjMiLCJhdXRoX3RpbWUiOjE3MjQ3MDEyOTIsInVzZXJfaWQiOiJzcmNnaEphM3lrT2FGVHFCN0JGRk4zQ21YM3UyIiwic3ViIjoic3JjZ2hKYTN5a09hRlRxQjdCRkZOM0NtWDN1MiIsImlhdCI6MTcyNTA0MzM2MywiZXhwIjoxNzI1MDQ2OTYzLCJwaG9uZV9udW1iZXIiOiIrMjAxMTEyMjgyMjE4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjAxMTEyMjgyMjE4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.cc_Cfvwf1pL-YANXGwekszlDOfmZZhTGGGO_Cgyx7oDriVuxqJ8UB9Z4dj-AdsVh5oqRU9iUqaZGJouGePzVk611Sw9QOdtTpX7szFd4djLdv-9SNl5piEVSVyOYuT7ClavfHh-uaaaiSWk1PPqRYmcKUUT45XVNkInTwZLG1YY7K9m9GypUJ-0AZ7bEBT5UG899NOAqhsnKHBDqwZcldt7fxI_8Um8CACOqVCU4rkLY-kF4EDRKEdzTP-h93kGM8tO4Ez-7cl_lHrIobn7pGWtGCE5XAzsSD_JjYgg-J3ZUKR5LOHhO75PIJqXJWMBGIlXCHuWI7MEb1h1oT5LBNw"  
    },
    body:{
        "username" : "Mohamed",
        "email" : "Test@test.test",
        "phone_number" : "+201112282218",
        "image_url" : "/url",
        "city_id" : 1,
        "city_name" : "Higaza"
    },
    pathParameters: {
        cityId: 1,
        owner: "XXXXXXXXXXXXXX"
    }
}

async function test() {
    try {
        
        const result = await addNewUserHandler(event);
        console.log(result);
        
        return result;
    } catch (error) {
        console.error("Error executing handler:", error);
        throw error;
    }
}

exports.default = test();