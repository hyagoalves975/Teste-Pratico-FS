# Teste-Pratico-FS

# Projeto de Cadastro de Clientes com Beneficiários

Este projeto tem como objetivo alterar um sistema de cadastro de clientes, permitindo a adição de beneficiários para cada cliente. O sistema inclui validações de dados essenciais, principalmente para CPF, e segue padrões visuais consistentes para garantir uma interface intuitiva e uniforme.

---

## Funcionalidades

- **Cadastro de Cliente e Beneficiário**: Permite o registro de clientes e a adição de um ou mais beneficiários.
- **Validação e Formatação de CPF**:
  - O campo CPF adota a máscara padrão `999.999.999-99`.
  - Realiza a verificação de validade do CPF conforme o cálculo do dígito verificador.
  - Impede o cadastramento de CPFs duplicados:
    - Não permite a existência de mais de um beneficiário com o mesmo CPF para o mesmo cliente.
    - Garante a unicidade de CPF para clientes e beneficiários no banco de dados.

- **Integração Visual**:
  - Novos botões e campos seguem o estilo dos demais elementos da interface.
  - O campo CPF é obrigatório no cadastro de clientes e beneficiários, obedecendo ao padrão de formatação.

---

## Atualizações

As seguintes alterações foram implementadas para aprimorar o cadastro de beneficiários:

1. **Novo Botão de Salvamento**: O botão "Salvar" na tela de "Cadastrar Cliente" agora grava automaticamente o beneficiário associado ao cliente.
2. **Validação de CPF Exclusiva**: Implementamos uma verificação adicional para assegurar que não sejam cadastrados beneficiários com CPFs duplicados, tanto no nível de cliente quanto de beneficiário.
3. **Formatação e Validação Consistentes**: Os campos de CPF agora possuem um comportamento uniforme em todas as telas, aplicando a máscara padrão e validação de dígito verificador.
