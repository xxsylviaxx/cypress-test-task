import { Selectors } from "./selectors";


const selectors = new Selectors();
let blogPostTitleText

Cypress.Commands.add('loadNoble9', (baseUrl, crossDomainUrl, pageTitle) => { 
  cy.visit(baseUrl, {
      onBeforeLoad(win) {
      const postMessage = win.postMessage;
      win.postMessage = function(data, origin) {
        if (origin === crossDomainUrl) { 
          return true;
        }
        return postMessage.apply(this, arguments);
        };
      }
  });

  cy.get(selectors.titleLogo).should("have.attr", "title", pageTitle);
});

Cypress.Commands.add('navigateMenu', (menuItem, subPage) => {
  cy.contains(menuItem).click();
  cy.contains(subPage).click();
  cy.get(selectors.pageTitle).should('contain', subPage);
});

Cypress.Commands.add('openFirstBlogPost', function() { 
  cy.get(selectors.blogsSection).scrollIntoView();
  cy.get(selectors.blogPostTitle)
    .first()
    .invoke('text')
    .then(text => {
      blogPostTitleText = text;
      
      cy.get(selectors.learnMoreBtn)
        .first()
        .click();

      cy.get(selectors.blogPageTitle)
        .invoke('text')
        .should("contain", blogPostTitleText); 
    });
});
        
Cypress.Commands.add('clickRequestDemo', () => {
  cy.get(selectors.requestDemoBtn).click();
  cy.get(selectors.formIframe).should('be.visible');
});

Cypress.Commands.add('enterValue', (iframeContent, locator, value) => {
  cy.wrap(iframeContent)
    .find(locator) 
    .type(value);
});

Cypress.Commands.add('verifyValue', (iframeContent, locator, value) => {
  cy.wrap(iframeContent)
    .find(locator)
    .invoke('attr', 'value')
    .should('contain', value);
});

Cypress.Commands.add('fillInForm', (email, firstName, lastName, company, jobTitle) => {
  cy.get(selectors.formIframe)
    .then($iframe => {
      const iframeContent = $iframe
        .contents()
        .find(selectors.from);
      
      cy.enterValue(iframeContent, selectors.emailFld, email);
      cy.enterValue(iframeContent, selectors.firstNameFld, firstName);
      cy.enterValue(iframeContent, selectors.lastNameFld, lastName);
      cy.enterValue(iframeContent, selectors.companyNameFld, company);
      cy.enterValue(iframeContent, selectors.jobTitleFld, jobTitle);

      cy.verifyValue(iframeContent, selectors.emailFld, email);
      cy.verifyValue(iframeContent, selectors.firstNameFld, firstName);
      cy.verifyValue(iframeContent, selectors.lastNameFld, lastName);
      cy.verifyValue(iframeContent, selectors.companyNameFld, company);
      cy.verifyValue(iframeContent, selectors.jobTitleFld, jobTitle);
          
    }); 
});

Cypress.Commands.add('closeForm', () => {
  cy.get(selectors.formIframe)
    .then($iframe => {
      const buttonContainer = $iframe
        .contents()
        .find(selectors.closeBtnContainer);
      cy.wrap(buttonContainer)
        .find(selectors.closeFormBtn)
        .click();
    });
});

