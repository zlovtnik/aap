package us.com.rclabs.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import us.com.rclabs.app.model.Item;

/**
 * Repositório para acesso a dados de Item.
 * Fornece métodos para persistência e consulta de itens no banco de dados.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
