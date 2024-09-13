let getUserByIdHandler = require("./handlers/user/getUserByIdHandler").getUserByIdHandler;
let addNewUserHandler = require("./handlers/user/addNewUserHandler").addNewUserHandler;

// const event = {
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1kb2thbi1lMjQ2MyIsImF1ZCI6ImUtZG9rYW4tZTI0NjMiLCJhdXRoX3RpbWUiOjE3MjQ2NzU3NzEsInVzZXJfaWQiOiJzcmNnaEphM3lrT2FGVHFCN0JGRk4zQ21YM3UyIiwic3ViIjoic3JjZ2hKYTN5a09hRlRxQjdCRkZOM0NtWDN1MiIsImlhdCI6MTcyNDgzMDQ0MCwiZXhwIjoxNzI0ODM0MDQwLCJwaG9uZV9udW1iZXIiOiIrMjAxMTEyMjgyMjE4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjAxMTEyMjgyMjE4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.Rht20Serf8BTy19LPOLpxHdhug7-zDdWSdLoV5f7wqmueV1Vow86VsnsVmjqETE_bdNQsMAyJ7XvuJg0D7YSEuDysj9RJpjIqNjiHjdHAVp84_86ugg1TdE5OMNheX9m8a12owmbqjm235T_44G7R6NrV2nxruYt8yb3PRqjN1kXzjNLaBc-xRjsng9sAKE8sJwekKPM_k32fk0FdQ0Prft8R1gEmmEBo_Ml-54dY6xbkxF0VNMa9DnoaLHvCM9et_JEVEL-rvF2FgTJIE9-H65JR4ezZ8CyXKtFeDMcr8LcdJsyJ6S5MvTUfIN7iwYIb884xSrc12Vs_MZ2LPQ0hg"
//     }
// };

// async function testHandler() {
//     try {
//         const result = await getUserByIdHandler(event);
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.error("Error executing handler:", error);
//         throw error;
//     }
// }

const event = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZS1kb2thbi1lMjQ2MyIsImF1ZCI6ImUtZG9rYW4tZTI0NjMiLCJhdXRoX3RpbWUiOjE3MjQ2NzU3NzEsInVzZXJfaWQiOiJzcmNnaEphM3lrT2FGVHFCN0JGRk4zQ21YM3UyIiwic3ViIjoic3JjZ2hKYTN5a09hRlRxQjdCRkZOM0NtWDN1MiIsImlhdCI6MTcyNDgzOTY2NSwiZXhwIjoxNzI0ODQzMjY1LCJwaG9uZV9udW1iZXIiOiIrMjAxMTEyMjgyMjE4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMjAxMTEyMjgyMjE4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.poQh6cxyanZPGRU8sf5msVtxl_nkBt__tAdX8aR7j-9Ffx-O1ICttQE2cxG-W9QuWXI23vZAhmGmrrLBvVOpm1Mz8__FX_duVXNbLOkxtwVAoNtU31G-TF2oUArZHjbmSmNk7-SWnPj-QfrsILTICtrnKYgzn2iQaoq-Io_z18iqh202A3EsOvRY34IlnbjuWkSsy4cDz2-odpb9x9dBx1ZaNa264jmhLTT5amRsxt_hUg7QU_Gu1IhsnYYu2DVqf3WK3OL11eBHNqSGmcPogouf8m6zfNDIGd_qA-Ww2Kq65YMOfgdy-knnV3Gpx3UK4Fe1Z48fcnimmyTq5QnS1g"  
    },
    body:{
        userName :"Demo Name",
        email : "test@test.test",
        phoneNumber : "+201111111111",
        imageUrl : "/DemoImgUrl",
        cityId : 1,
        cityName : "Demo City Name"
    }
};

async function testAddNewUserHandler() {
    try {
        const result = await addNewUserHandler(event);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error executing handler:", error);
        throw error;
    }
}

exports.default = testAddNewUserHandler();