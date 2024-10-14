const { test, expect } = require('@playwright/test');

const randomEmail = `user${Math.random().toString(36).substring(2, 15)}@example.com`;
const username = randomEmail.split('@')[0];

// CP001

test('CP001', async ({ page }) => {
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');

  await page.click('a.action.align-center');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/register');

  await page.fill('#name', 'nombre');
  await page.fill('#surname', 'apellido');
  await page.fill('#phone', '12345678');
  await page.fill('#email', randomEmail);
  await page.fill('#username', username);
  await page.fill('#password', '123456');

  await page.click('input.form__submit');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/mensaje');
});

// CP002

test('CP002', async ({ page }) => {
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/login');

  await page.fill('#email', randomEmail);
  await page.fill('#password', '123456');

  await page.click('input.form__submit');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/admin');
});

// CP003

test('CP003', async ({ page }) => {
  // Login
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');
  
  await page.fill('#email', randomEmail);
  await page.fill('#password', '123456');
  await page.click('input.form__submit');

  // Nuevo producto
  await page.click('.orange-btn');

  await page.fill('#name', 'condones lizano');
  await page.fill('#price', '3000');
  await page.selectOption('#categoryID', '1');
  await page.fill('#description', 'descripcion');
  await page.setInputFiles('input[type="file"]', 'imagen-random.jpeg');

  await expect(page.locator('input[type="file"]')).toHaveValue('C:\\fakepath\\imagen-random.jpeg');

  // Aceptar la alerta de confirmación
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Está seguro que quiere crear el producto');
    await dialog.accept(); // Aceptar el diálogo de confirmación
  });

  await page.click('input.form__submit--orange');
  
  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/admin?result=1');
});

// CP004

test('CP004', async ({ page }) => {
  // Login
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');
  
  await page.fill('#email', randomEmail);
  await page.fill('#password', '123456');
  await page.click('input.form__submit');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/admin');

  // Editar un producto
  const editIcon = await page.locator('a.icon-update').first();
  await editIcon.click();

  // Completar los campos de edición
  await page.fill('#name', '[EDITADO]');
  await page.fill('#cantidad', '85');

  // Aceptar la alerta de confirmación
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Está seguro que quiere guardar los cambios');
    await dialog.accept(); // Aceptar el diálogo de confirmación
  });

  await page.click('input.form__submit--orange');

  // Verificar que la URL es la correcta después de editar el producto
  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/admin?result=2');
});

// CP005

test('CP005', async ({ page }) => {
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('text="Productos"');

  await expect(page).toHaveURL('https://banguto.mnz.dom.my.id/productos');

});

// CP006

test('CP006', async ({ page }) => {
  // Login
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');
  
  await page.fill('#email', randomEmail);
  await page.fill('#password', '123456');
  await page.click('input.form__submit');

  page.on('dialog', async dialog => {
    await dialog.accept(); // Aceptar el diálogo de confirmación
  });

  // Eliminación del producto
  await page.click('input.icon-delete[type="submit"]');

  // Verificar que el producto ya no aparece en la lista
  await expect(page.locator('text="Producto eliminado"')).not.toBeVisible();
});

// CP007

test('CP007', async ({ page }) => {
  // Login
  await page.goto('https://banguto.mnz.dom.my.id/');

  await page.click('text="✅ I understand, I trust this site."');

  await page.click('.login');
  
  await page.fill('#email', randomEmail);
  await page.fill('#password', '123456');
  await page.click('input.form__submit');

  // Creación de productos fallido
  await page.click('.orange-btn');

  await page.fill('#name', 'error');
  await page.fill('#price', '2000');

  page.on('dialog', async dialog => {
    await dialog.accept(); // Aceptar el diálogo de confirmación
  });

  await page.click('input.form__submit--orange[type="submit"]');

  // Verificar que aparece un mensaje de error
  await expect(page.locator('text="La descripcion es obligatoria"')).toBeVisible();
  await expect(page.locator('text="La imagen es obligatoria"')).toBeVisible();
  await expect(page.locator('text="Debe escoger una categoria"')).toBeVisible();
});

