describe('Product Finder - Search', () => {
  before(()=>{
    cy.visit('http://localhost:5173/');
  });
  
  it('Should search by fund name', ()=>{
    cy.get('[data-cy=search-input]').clear().type('Arca');
    cy.get('tbody').contains('NYSE Arca Biotechnology UCITS ETF');
  });
})