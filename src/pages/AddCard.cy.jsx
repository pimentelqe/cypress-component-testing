import React from 'react'
import AddCard from './AddCard'



describe('<AddCard />', () => {
  it('Exibe erros quando os campos não são informados ', () => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('.alert-error', 'Número do cartão é obrigatório')
      .should('be.visible')


    cy.contains('.alert-error', 'Nome do titular é obrigatório')
      .should('be.visible')

    cy.contains('.alert-error', 'Data de expiração é obrigatória')
      .should('be.visible')

    cy.contains('.alert-error', 'CVV é obrigatório')
      .should('be.visible')

    cy.contains('.alert-error', 'Selecione um banco')
      .should('be.visible')


  })
})