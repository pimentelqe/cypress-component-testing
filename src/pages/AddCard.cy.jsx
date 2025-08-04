import React from 'react'
import AddCard from './AddCard'

Cypress.Commands.add('alertErrorHaveText', (expectedText) => {
  cy.contains('.alert-error', expectedText)
    .should('be.visible')
})


describe('<AddCard />', () => {
  it('Exibe erros quando os campos não são informados ', () => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)

    cy.contains('button', 'Adicionar Cartão').click()

    const alerts = ['Número do cartão é obrigatório',
      'Nome do titular é obrigatório',
      'Data de expiração é obrigatória',
      'CVV é obrigatório',
      'Selecione um banco'
    ]

    alerts.forEach((alert) => {
      cy.alertErrorHaveText(alert)

    })

  })

  it.only('deve cadastrar um novo cartão de crédito', () => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)

    const myCard = {
      number: '4000051230000072',
      holderName: 'Fernando Pimentel',
      expirationDate: '12/35',
      cvv: '136',
      bank: 'nubank'
    }
    cy.get('[data-cy="number"]').type(myCard.number)
    cy.get('[data-cy="holderName"]').type(myCard.holderName)
    cy.get('[data-cy="expirationDate"]').type(myCard.expirationDate)
    cy.get('[data-cy="cvv"]').type(myCard.cvv)

    cy.get(`[data-cy="bank-${myCard.bank}"]`).click()

    cy.intercept('POST', 'http://wallet.cardfify.dev/api/cards', (req) => {
      req.reply({
        statusCode: 201,
        body: myCard
      })
    }).as('addCard')

    cy.get('[data-cy="saveMyCard"]').click()

    cy.wait('@addCard')

  })


})