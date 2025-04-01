package us.com.rclabs.app.config;

import us.com.rclabs.app.interceptor.RequestLoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração do Spring MVC.
 * Registra interceptors e outras configurações da web.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * Adiciona interceptors à aplicação.
     * Neste caso, registra o interceptor de logging de requisições.
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestLoggingInterceptor());
    }
}
