describe('Recruitment Task', () => {

  before(function () {
    cy.fixture('testData.json').then(testData => this.testData = testData);
  });

  it('Opens Blog Post And Fills In The Request Demo Form', function () {
    
    cy.loadNoble9("/", this.testData.urls.crossOrginUrl, this.testData.navigation.homePage);
    cy.navigateMenu(this.testData.navigation.menuItem, this.testData.navigation.subPage);
    cy.openFirstBlogPost();
    cy.clickRequestDemo();
    cy.fillInReqestDemoForm(this.testData.contactDetails.email,
      this.testData.contactDetails.firstName,
      this.testData.contactDetails.lastName,
      this.testData.contactDetails.companyName,
      this.testData.contactDetails.jobTitle);
    cy.closeRequestDemoForm();
  });
});