package us.com.rclabs.app.controller;

import us.com.rclabs.app.model.Item;
import us.com.rclabs.app.repository.ItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controlador responsável por gerenciar operações relacionadas a itens.
 * Fornece endpoints para listar, criar e visualizar itens.
 */
@Controller
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    /**
     * Lista todos os itens cadastrados.
     * 
     * @param model O modelo para adicionar atributos
     * @return A view que exibe a lista de itens
     */
    @GetMapping
    public String listItems(Model model) {
        model.addAttribute("items", itemRepository.findAll());
        return "item-list";
    }

    /**
     * Exibe o formulário para criar um novo item.
     * Esta rota tem prioridade sobre a rota com path variable {id}.
     * 
     * @param model O modelo para adicionar atributos
     * @return A view com o formulário de item
     */
    @GetMapping("/new")
    public String showNewItemForm(Model model) {
        model.addAttribute("item", new Item());
        return "item-form";
    }

    /**
     * Processa o envio do formulário de novo item.
     * 
     * @param item   O item a ser criado, com validação
     * @param result O resultado da validação
     * @param model  O modelo para adicionar atributos
     * @return Redireciona para a lista de itens ou exibe novamente o formulário com
     *         erros
     */
    @PostMapping("/new")
    public String createNewItem(@Valid Item item, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "item-form";
        }
        itemRepository.save(item);
        return "redirect:/items";
    }

    /**
     * Retorna os dados de um item específico por ID como JSON.
     * Marcado com @ResponseBody para indicar que retorna dados, não uma view.
     * 
     * @param id O ID do item a ser buscado
     * @return O item encontrado ou uma exceção se não existir
     */
    @GetMapping("/{id}")
    @ResponseBody
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }
}
