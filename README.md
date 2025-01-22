# Anota+

- O **Anota+BackEnd** é uma API REST desenvolvida em Node.js e Express.js para gerenciar recados de usuários. Ele permite que os usuários realizem cadastro, login e gerenciem suas notas com segurança e eficiência.

- Ele é ideal para aplicações que precisam de um backend simples e eficiente para gerenciamento de dados relacionados a notas ou recados. O projeto utiliza bcrypt para segurança de senhas e UUID para geração de IDs únicos.

## 🚀 Funcionalidades

- Cadastro de usuários com senha criptografada.
- Login de usuários com validação de credenciais.
- Criação, listagem, edição e exclusão de recados.
- Paginação de recados para melhor performance.
- Detalhamento de recados individuais.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Criação de APIs REST.
- **UUID**: Geração de identificadores únicos.
- **Bcrypt**: Hashing de senhas para segurança.
- **Cors**: Permissão de requisições de diferentes origens.
- **Axios**: Integração entre frontend e backend.

  
## 📄 Endpoints da API

### **Usuários**

- **POST /users/signup**

  Cadastra um novo usuário.
  
  **Exemplo de Corpo**:
  ```json
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }
