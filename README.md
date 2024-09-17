# Project Setup and Testing Guide
===============================

## Installing Playwright
-------------------------

Install Playwright:
```bash
npm init playwright@latest
```

***Note** Here are a few ways to better readable reports. 

## Create Decorator that wraps a function and used for reporting purposes.
-------------------------
 * @example
 ```ts
    import { step } from './step_decorator';
    class MyTestClass {
        @step('optional step name')
        async myTestFunction() {
            // Test code goes here
        }
    }
 ```

## Use Playwright methods. https://playwright.dev/
-------------------------


1. Test.step. Declares a test step that is shown in the report.

* @example
 ```ts
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Log in', async () => {
    // ...
  });

  await test.step('Outer step', async () => {
    // ...
    // You can nest steps inside each other.
    await test.step('Inner step', async () => {
      // ...
    });
  });
});
```
2. Group tests. You can group tests to give them a logical name or to scope before/after hooks to the group.

 * @example
 ```ts
    import { test, expect } from '@playwright/test';

    test.describe('two tests', () => {
    test('one', async ({ page }) => {
        // ...
    });

    test('two', async ({ page }) => {
        // ...
    });
    });
 ```

3. Tag tests. 
Sometimes you want to tag your tests as @fast or @slow, and then filter by tag in the test report. Or you might want to only run tests that have a certain tag.
To tag a test, either provide an additional details object when declaring a test, or add @-token to the test title. Note that tags must start with @ symbol.

* @example
 ```ts
    import { test, expect } from '@playwright/test';

    test('test login page', {
    tag: '@fast',
    }, async ({ page }) => {
    // ...
    });

    test('test full report @slow', async ({ page }) => {
    // ...
    });
 ```
Run tests that have a particular tag with --grep command line option.
```bash
npx playwright test --grep-invert "@fast"
```
Skip tests with a certain tag:
```bash
npx playwright test --grep-invert "@fast"
```
To run tests containing either tag (logical OR operator):
```bash
npx playwright test --grep --% "@fast^|@slow"
```
Or run tests containing both tags (logical AND operator) using regex lookaheads:
```bash
npx playwright test --grep "(?=.*@fast)(?=.*@slow)"
```

4. Annotate tests.

* @example
 ```ts
import { test, expect } from '@playwright/test';

test('test login page', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  // ...
});
 ```

