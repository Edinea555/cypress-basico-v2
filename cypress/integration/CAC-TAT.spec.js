

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('src/index.html')   
    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Edinéa')
          .get('#lastName').type('Conceição')
          .get('#email').type('edinea@gruporecursos.com.br')
          .get('select#product').select('Cursos').should('have.value','cursos')
          .get('#email-checkbox').click()
          .get('#open-text-area').type('Aprendendo Cypress')
          .get('.button').click()
          .should('be.visible','success')

        
    })

     it('marca o tipo de atendimento "Feedback"', function(){
         cy.get('input[type="radio"][value="feedback"]').check()
           .should('be.checked')


     })
     
     it('marca o tipo de atendimento "Feedback"', function(){

       cy.get('input[type="radio"]').should('have.length',3)
           .each(function($radio){
               cy.wrap($radio).check()
               cy.wrap($radio).check().should('be.checked')
       })
     })

     it('marca ambos checkboxers pepois desmarca o ultimo', function(){
         cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')

     })

     it('exibe mensagem de erro quando o telefone se torna obrigatorio, mas não é preenchido antes do envio do formulario', function(){
        cy.get('#firstName').type('Edinéa')
        .get('#lastName').type('Conceição')
        .get('#email').type('edinea@gruporecursos.com.br')
        .get('select#product').select('Cursos').should('have.value','cursos')
        .get('#phone-checkbox').check()
        .should('be.checked')
        .get('#open-text-area').type('Aprendendo Cypress')
        .get('.button').click()
        .should('be.visible','error')
    })
       it('seleciona um arquivo da pasta fixtures', function(){
           cy.get('input[type="file"]')
           .should('not.have.value')
           .selectFile('./cypress/fixtures/example.json')
           .should(function($input){
               console.log($input)
            cy.expect($input[0].files[0].name).to.equal('example.json')
           })
    
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
            console.log($input)
         cy.expect($input[0].files[0].name).to.equal('example.json')



    
    })
})

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json',{encoding:null}).as('exampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile({
            contents: '@exampleFile',
            fileName: 'example.json'
        })
        .should(function($input){
            console.log($input)
         cy.expect($input[0].files[0].name).to.equal('example.json')


    
    })
})
      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
           cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('testa a página da política de privavidade de forma independente', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
 })
    it.skip('simular viewport mobile', function(){
        cy.get()
     
})

})