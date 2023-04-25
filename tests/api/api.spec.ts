import { test, expect } from '@playwright/test'

//setting up a test suite that runs api calls in parallel.
//as each script will be using a different endpoint, these can all run in parallel of one another.
test.describe.parallel('API Testing', () => {
    //set up the root url our APIs will use.
    const rootURL = 'https://reqres.in/api'
    const GOOD = 200
    const NOT_FOUND = 404
    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${rootURL}/users/2`)
        expect(response.status()).toBe(GOOD)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${rootURL}/users/non-existant-user`)
        expect(response.status()).toBe(NOT_FOUND)
    })
})
