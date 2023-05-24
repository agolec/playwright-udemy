import { test, expect } from '@playwright/test'
import { baseURL } from '../api/base.url'

//setting up a test suite that runs api calls in parallel.
//as each script will be using a different endpoint, these can all run in parallel of one another.
test.describe.parallel('API Testing', () => {
    //set up the root url our APIs will use.
    //const baseURL = 'https://reqres.in/api'

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/non-existant-user`)
        expect(response.status()).toBe(404)
    })

    test.only('Simple API Test - Get User Detail', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })
})
