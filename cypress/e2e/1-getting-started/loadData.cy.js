describe('Product Finder - loading data', () => {
  beforeEach(() => {
   
    cy.visit('http://localhost:5173/')
  })

  it('displays list of data', () => {
    
    cy.get('tbody tr').should('have.length', 11)

    cy.get('tbody tr td').first().should('have.text', 'NASDAQ Cybersecurity UCITS ETF')
    cy.get('tbody tr td').last().should('have.text', 'Index')
  })
})