from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import unittest
import time
import random
import string
import os

def random_string(length):
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def random_phone():
    return ''.join(random.choices(string.digits, k=8))

def random_email():
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"]
    username = random_string(random.randint(5, 10))
    domain = random.choice(domains)
    return f"{username}@{domain}"

class TestJodori(unittest.TestCase):
    def setUp(self):
        # Inicializar el WebDriver de Chrome
        self.driver = webdriver.Chrome()
        self.driver.get("https://banguto.mnz.dom.my.id/")
        
    def test_01_register(self):
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        register_anchor = self.driver.find_element(By.CLASS_NAME, "align-center")
        register_anchor.click()

        name_field = self.driver.find_element(By.ID, "name")
        surname_field = self.driver.find_element(By.ID, "surname")
        phone_field = self.driver.find_element(By.ID, "phone")
        email_field = self.driver.find_element(By.ID, "email")
        username_field = self.driver.find_element(By.ID, "username")
        password_field = self.driver.find_element(By.ID, "password")

        name_field.send_keys(random_string(10))
        surname_field.send_keys(random_string(10))
        phone_field.send_keys(random_phone())
        email_field.send_keys(remail)
        username_field.send_keys(random_string(10))
        password_field.send_keys(rpassword) 
        
        register_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        register_button.click()

        self.assertIn("https://banguto.mnz.dom.my.id/mensaje", self.driver.current_url)

    def test_02_login(self):
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        username_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")

        username_field.send_keys(remail)
        password_field.send_keys(rpassword)

        login_form_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        login_form_button.click()

        self.assertIn("https://banguto.mnz.dom.my.id/admin", self.driver.current_url)
    
    def test_03_create_product(self):
        #Login
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        username_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")

        username_field.send_keys(remail)
        password_field.send_keys(rpassword)

        login_form_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        login_form_button.click()

        # Product creation
        create_link = self.driver.find_element(By.LINK_TEXT, "Nuevo Producto")
        create_link.click()

        name_field = self.driver.find_element(By.ID, "name")
        price_field = self.driver.find_element(By.ID, "price")
        image_field = self.driver.find_element(By.ID, "imagen")
        category_field = self.driver.find_element(By.ID, "categoryID")
        description_field = self.driver.find_element(By.ID, "description")

        name_field.send_keys("Gatico Hambuguesa")
        price_field.send_keys("10000")
        
        project_root = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(project_root, 'foto-random.jpg')
        image_field.send_keys(file_path)

        select = Select(category_field)
        select.select_by_value("1")

        description_field.send_keys("Gato hamburguesa")

        create_button = self.driver.find_element(By.CLASS_NAME, "form__submit--orange")
        create_button.click()

        alert = self.driver.switch_to.alert
        alert.accept()

        self.assertIn("https://banguto.mnz.dom.my.id/admin?result=1", self.driver.current_url)
    
    def test_04_edit_product(self):
        #Login
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        username_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")

        username_field.send_keys(remail)
        password_field.send_keys(rpassword)

        login_form_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        login_form_button.click()

        # Product edition
        edit_icon = self.driver.find_element(By.CLASS_NAME, 'icon-update')
        edit_icon.click()

        name_field = self.driver.find_element(By.ID, "name")
        quantity_field = self.driver.find_element(By.ID, "cantidad")

        name_field.clear()
        name_field.send_keys("Gatico Hambuguesa [EDITADO]")
        quantity_field.clear()
        quantity_field.send_keys("10")

        update_button = self.driver.find_element(By.CLASS_NAME, "form__submit--orange")
        update_button.click()

        alert = self.driver.switch_to.alert
        alert.accept()

        self.assertIn("https://banguto.mnz.dom.my.id/admin?result=2", self.driver.current_url)

    def test_05_view_products(self):
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        products_link = self.driver.find_element(By.LINK_TEXT, "Productos")
        products_link.click()

        self.assertIn("https://banguto.mnz.dom.my.id/productos", self.driver.current_url)

    def test_06_delete_product(self):
        #Login
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        username_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")

        username_field.send_keys(remail)
        password_field.send_keys(rpassword)

        login_form_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        login_form_button.click()

        # Product deletion
        delete_icon = self.driver.find_element(By.CLASS_NAME, 'icon-delete')
        delete_icon.click()

        alert = self.driver.switch_to.alert
        alert.accept()

        self.assertIn("https://banguto.mnz.dom.my.id/admin?result=3", self.driver.current_url)

    def test_07_fail_create(self):
        #Login
        check_button = self.driver.find_element(By.XPATH, "//a[contains(text(), '✅ I understand, I trust this site.')]")
        check_button.click()

        login_button = self.driver.find_element(By.CLASS_NAME, "login")
        login_button.click()

        username_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")

        username_field.send_keys(remail)
        password_field.send_keys(rpassword)

        login_form_button = self.driver.find_element(By.CLASS_NAME, "form__submit")
        login_form_button.click()

        # Product creation
        create_link = self.driver.find_element(By.LINK_TEXT, "Nuevo Producto")
        create_link.click()

        create_button = self.driver.find_element(By.CLASS_NAME, "form__submit--orange")
        create_button.click()

        alert = self.driver.switch_to.alert
        alert.accept()

        self.assertIn("https://banguto.mnz.dom.my.id/admin/crear", self.driver.current_url)

    def tearDown(self):
        # Cierra el navegador después de cada prueba
        self.driver.quit()

if __name__ == "__main__":
    remail = random_email()
    rpassword = random_string(10)
    unittest.main()
