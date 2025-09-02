import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });
    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

    it('Верный логин, верный пароль', function () {
       
         cy.get(main_page.email).type(data.login); // Найти поле e-mail, ввести логин
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю
        
     })

     it('Восстановление пароля', function () {
         
         cy.get(main_page.fogot_pass_btn).click(); // Нажать на кнопку Забыли пароль

         cy.get(recovery_page.email).type(data.login); //Ввести e-mail
         cy.get(recovery_page.send_button).click();//Нажать отправить код

         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //Проверяю совпадение текста
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю
        
})
         it('Ввести неправильный пароль', function () {
         
         cy.get(main_page.email).type(data.login); // Найти поле e-mail, ввести логин
         cy.get(main_page.password).type('qa_one_love'); // Найти поле пароль и ввести неправильный пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Такого логина или пароля нет');// Проверяю что после нажатия на кнопку войти , вижу текст
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю
         
        })

         it('Неверный логин, верный пароль', function () {
         
         cy.get(main_page.email).type('german@dolnikv.ru'); // Найти поле e-mail, ввести неверный логин
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю
         
     })

     it('Ввести логин без @, верный пароль', function () {
        
         cy.get(main_page.email).type('germandolnikv.ru'); // Найти поле e-mail, ввести логин без @
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

         cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю

         
     })

     it('Проверка на приведение к строчным буквам в логине', function () {
        
         cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Найти поле e-mail, ввести логин разным размером шрифта
         cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести пароль
         cy.get(main_page.login_button).click(); // Найти кнопку войти и нажать на нее

          cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible');// Текс виден пользователю
        
 }) 

   })
