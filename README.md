# Sistema de Gerenciamento de Itens

## Visão Geral

Este projeto é uma aplicação Spring Boot para gerenciamento de itens. Permite a criação, visualização e listagem de itens através de uma interface web simples.

## Tecnologias Utilizadas

- Java 21
- Spring Boot 3.4.4
- Spring MVC
- Spring Data JPA
- Thymeleaf (com Layout Dialect)
- Bootstrap 4.5.2
- Validação de Bean (Jakarta Validation)
- Oracle Database
- Lombok
- Jetty (servidor web)

## Requisitos

- JDK 21 ou superior
- Gradle 7.6 ou superior
- Banco de dados Oracle (pode ser modificado para outro SGBD)

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/fdc.git
   cd fdc
   ```

2. Configure a conexão com o banco de dados em `src/main/resources/application.properties`

3. Execute a aplicação:
   ```bash
   ./gradlew bootRun
   ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:8080
   ```

## Estrutura do Projeto

