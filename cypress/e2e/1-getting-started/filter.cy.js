describe('Product Finder - Filter', () => {
  before(()=>{
    cy.visit('http://localhost:5173/');
  });
  
  it('Should search by fund name', ()=>{
    cy.get('[data-cy=dropdown-btn]').last().click();
    cy.get('[data-cy=dropdown-input]').last().click();
    cy.get('[data-cy=apply-filter]').click();
    cy.get('tbody').contains('FactorFX UCITS ETF');
  });
})