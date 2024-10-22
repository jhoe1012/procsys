describe('PR Testing', () => {
  beforeEach(() => cy.login('dev.one@goldilocks.com', 'Pa$$w0rd!', 'Dev One'));
  it('load homepage', () => {
    //
    cy.visit('/');
    cy.getBySel('dashboard').should('contain', "You're logged in!");
  });
  it('load pr index', () => {
    cy.visit('/pr');
    cy.get('table').should('be.visible')
  });
});
