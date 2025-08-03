import React from 'react'
import AddCard from './AddCard'



describe('<AddCard />', () => {
  it('Exibe erros quando os campos não são informados ', () => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Número do cartão é obrigatório')
    .should('be.visible')

    cy.contains('Nome do titular é obrigatório')
    .should('be.visible')

    cy.contains('Data de expiração é obrigatória')
    .should('be.visible')

    cy.contains('CVV é obrigatório')
    .should('be.visible')

    cy.contains('Selecione um banco')
    .should('be.visible')
  })
})