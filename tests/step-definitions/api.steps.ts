import { Given, When, Then } from "@cucumber/cucumber";
import { APIClass } from "../page-objects/api/apiClass";

const apiCall = new APIClass()

Given('create user using api call', async function () {
    await apiCall.createUser()
});

When('Add a list of Book against the user', async function () {
    await apiCall.generateToken()
    await apiCall.getBooks()
    await apiCall.addBooksAgainstUser()
});

Then('Remove one of added Book', async function () {
    await apiCall.removeBookagainstUser()
  });
