package us.com.rclabs.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Classe principal da aplicação Spring Boot.
 * Configura o escaneamento de componentes, entidades e repositórios.
 */
@SpringBootApplication
// Escaneia apenas o pacote base para evitar duplicações
@ComponentScan(basePackages = { "us.com.rclabs.app" })
@EntityScan(basePackages = { "us.com.rclabs.app.model" })
@EnableJpaRepositories(basePackages = { "us.com.rclabs.app.repository" })
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
}
