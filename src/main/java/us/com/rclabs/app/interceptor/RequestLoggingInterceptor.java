package us.com.rclabs.app.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * Interceptor para registrar informações sobre requisições HTTP.
 * Loga detalhes antes e depois do processamento de cada requisição.
 */
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingInterceptor.class);

    /**
     * Executado antes do processamento da requisição.
     * Registra a URL da requisição.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        logger.info("Requisição URL: {}", request.getRequestURL());
        return true;
    }

    /**
     * Executado após o processamento da requisição, antes de renderizar a view.
     * Registra o status da resposta.
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) {
        logger.info("Status da resposta: {}", response.getStatus());
    }

    /**
     * Executado após a conclusão da requisição.
     * Registra exceções, se ocorrerem.
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) {
        if (ex != null) {
            logger.error("Ocorreu uma exceção: {}", ex.getMessage());
        }
    }
}
