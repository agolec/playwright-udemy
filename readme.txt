Step 1:

do npm init

Step 2: 

install prettier extension from the store.

Step 3: 

Set up .prettierc config file with options you want to use.

Step 4:
npm install @playwright/test

Step 5:

npx playwright install (I forget why we have to do both at this point.)

To Run Tests:

    for visual regression testing: run the commands in the package.json scripts section beginning with the label string 'tests:visual'.
        These tests use the config info found in the file 'visual.config.ts'.

    For end to end flow regression testing: run the commands in the package.json scripts section beginning with 'tests:e2e'
        These tests will use the config info found in the file 'end-to-end.config.ts'.

Setup of files.

Package.json - This is where you specify your script names along with the playwright commands that you would
type out to run the specific script you want, along with it's config name.

--config= is how you specify the config file you wish to use. No quotation marks between the value
of the directory name.

--project=<browsername> [Chromium, Webkit, Firefox] - Specifies the browser you wish to run.

<file name here>.config.ts - this could be the api.config.ts or end-to-end.config.ts files, etc.

your config files specify information about the test you wish to run. The script you choose to run in
your package.json file will be a config.ts file. From there, your config.js file will specify which
directory contains your spec file you are going to run.

To change screenshots when the CCS/HTML/presentation of a site has changed compared to existing screenshots/visual tests
    run the following command in the terminal, or set one up in the package.json file: 

    "playwright test --config=visual.config.ts --project=chromium --update=snapshots"

    the --update=snapshots tag will update any screenshots used to make comparison against the current state of the site.

