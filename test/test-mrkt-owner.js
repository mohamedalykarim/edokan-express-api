let getMarketplacesByCityIdAndOwner = require("./handlers/marketplace/getMarketplacesByCityIdAndOwner").getMarketplacesByCityIdAndOwner;

const method = "GET"

const event = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1kb2thbi1lMjQ2MyIsImF1ZCI6ImUtZG9rYW4tZTI0NjMiLCJhdXRoX3RpbWUiOjE3MjQ2NzU3NzEsInVzZXJfaWQiOiJzcmNnaEphM3lrT2FGVHFCN0JGRk4zQ21YM3UyIiwic3ViIjoic3JjZ2hKYTN5a09hRlRxQjdCRkZOM0NtWDN1MiIsImlhdCI6MTcyNDgzOTY2NSwiZXhwIjoxNzI0ODQzMjY1LCJwaG9uZV9udW1iZXIiOiIrMjAxMTEyMjgyMjE4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjAxMTEyMjgyMjE4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.poQh6cxyanZPGRU8sf5msVtxl_nkBt__tAdX8aR7j-9Ffx-O1ICttQE2cxG-W9QuWXI23vZAhmGmrrLBvVOpm1Mz8__FX_duVXNbLOkxtwVAoNtU31G-TF2oUArZHjbmSmNk7-SWnPj-QfrsILTICtrnKYgzn2iQaoq-Io_z18iqh202A3EsOvRY34IlnbjuWkSsy4cDz2-odpb9x9dBx1ZaNa264jmhLTT5amRsxt_hUg7QU_Gu1IhsnYYu2DVqf3WK3OL11eBHNqSGmcPogouf8m6zfNDIGd_qA-Ww2Kq65YMOfgdy-knnV3Gpx3UK4Fe1Z48fcnimmyTq5QnS1g"  
    },
    body:{
    },
    pathParameters: {
        cityId: 1,
        owner: "XXXXXXXXXXXXXX"
    }
}

async function test() {
    try {
        
        const result = await getMarketplacesByCityIdAndOwner(event);
        console.log(result);
        
        return result;
    } catch (error) {
        console.error("Error executing handler:", error);
        throw error;
    }
}

exports.default = test();