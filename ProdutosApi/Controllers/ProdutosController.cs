using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProdutosApi.Data;
using ProdutosApi.Dtos;
using ProdutosApi.Models;

namespace ProdutosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProdutosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetAll()
    {
        var produtos = await _context.Produtos
            .OrderByDescending(p => p.Id)
            .ToListAsync();

        return Ok(produtos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Produto>> GetById(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        return Ok(produto);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] ProdutoCreateDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var codigoExiste = await _context.Produtos
            .AnyAsync(p => p.CodigoBarras == dto.CodigoBarras);

        if (codigoExiste)
            return Conflict(new { mensagem = "Já existe um produto com esse código de barras." });

        var produto = new Produto
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Preco = dto.Preco,
            Estoque = dto.Estoque,
            CodigoBarras = dto.CodigoBarras
        };

        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Update(int id, [FromBody] ProdutoCreateDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        var codigoExiste = await _context.Produtos
            .AnyAsync(p => p.CodigoBarras == dto.CodigoBarras && p.Id != id);

        if (codigoExiste)
            return Conflict(new { mensagem = "Já existe outro produto com esse código de barras." });

        produto.Nome = dto.Nome;
        produto.Descricao = dto.Descricao;
        produto.Preco = dto.Preco;
        produto.Estoque = dto.Estoque;
        produto.CodigoBarras = dto.CodigoBarras;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);

        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}