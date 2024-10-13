describe('Tests Para Farmacia Jodori', () => {
  beforeEach(() => {
    cy.visit("https://banguto.mnz.dom.my.id/");
    cy.get('a').contains('✅ I understand, I trust this site.').click();
  });

  const randomEmail = `user${Math.random().toString(36).substring(2, 15)}@example.com`;
  const username = randomEmail.split('@')[0];

  it('1. Crear una cuenta', () => {
    cy.get('.login').click();
    cy.get('a.action.align-center').click();
    cy.url().should('eq', 'https://banguto.mnz.dom.my.id/register');

    cy.get('#name').type('yo');
    cy.get('#surname').type('apellido');
    cy.get('#phone').type('12345678');
    cy.get('#email').type(randomEmail);
    cy.get('#username').type(username);  
    cy.get('#password').type('123456');

    cy.get('input.form__submit').click();
  });

  it('2. Iniciar sesión', () => {
    cy.get('.login').click();
    cy.url().should('eq', 'https://banguto.mnz.dom.my.id/login');

    cy.get('#email').type(randomEmail);
    cy.get('#password').type('123456');

    cy.get('input.form__submit').click();
    cy.url().should('eq', 'https://banguto.mnz.dom.my.id/admin');
  });

  it('3. Crear un producto', () => {
    cy.get('.login').click();
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('123456');
    cy.get('input.form__submit').click();

    cy.get('.orange-btn').first().click();
    cy.get('#name').type('yo');
    cy.get('#price').type('2000');
    cy.get('#categoryID').select('1');
    cy.get('#description').type('descripcion');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/foto-random.jpg', { force: true });
    cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\foto-random.jpg');

    cy.get('input.form__submit--orange[type="submit"][value="Crear"]').click();
  });

  it('4. Editar un producto', () => {
    cy.get('.login').click();
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('123456');
    cy.get('input.form__submit').click();

    cy.get('a.icon-update').first().click();
    cy.get('#cantidad').type('10');
    cy.get('input.form__submit--orange[type="submit"][value="Actualizar"]').click();
  });

  it('5. Visualizar productos', () => {
    cy.get('.logo').click();
    cy.url().should('eq', 'https://banguto.mnz.dom.my.id/');
    cy.contains('Productos').click(); 
    cy.url().should('eq', 'https://banguto.mnz.dom.my.id/productos');
  });

  it('6. Eliminar un producto', () => {
    cy.get('.login').click();
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('123456');
    cy.get('input.form__submit').click();

    cy.get('input.icon-delete[type="submit"]').first().click();
  });

  it('7. Fallar al intentar crear un producto incompleto', () => {
    cy.get('.login').click();
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('123456');
    cy.get('input.form__submit').click();

    cy.get('.orange-btn').first().click();
    cy.get('#name').type('error');
    cy.get('#price').type('2000');
    cy.get('input.form__submit--orange[type="submit"][value="Crear"]').click();
  });
});