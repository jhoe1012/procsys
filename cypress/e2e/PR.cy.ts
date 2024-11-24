describe('PR Testing', () => {
  // beforeEach(() =>);
  it('load homepage', () => {
    //

    cy.login('dev.one@goldilocks.com', 'Pa$$w0rd!', 'Dev One')
    cy.visit('/');
    cy.getBySel('dashboard').should('contain', "You're logged in!");
  });

  it('Create a PR', () => {

  })
  // it('load pr index', () => {
  //   cy.visit('/pr');
  //   cy.get('table').should('be.visible')
  // });
});
