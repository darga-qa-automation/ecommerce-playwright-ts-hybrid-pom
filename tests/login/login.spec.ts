
import { test, expect } from '../../fixtures/baseTest';
import loginData from '../../test-data/loginData.json';

test('ECOM_TC_001 - Verify user can log in successfully', async ({
  page,
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('ECOM_TC_002 - Verify login fails with invalid credentials', async ({
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match'
  );
});
