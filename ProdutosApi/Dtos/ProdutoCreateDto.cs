using System.ComponentModel.DataAnnotations;

namespace ProdutosApi.Dtos;

public class ProdutoCreateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(150)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
    public decimal Preco { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "O estoque não pode ser negativo.")]
    public int Estoque { get; set; }

    [Required(ErrorMessage = "O código de barras é obrigatório.")]
    [MaxLength(50)]
    public string CodigoBarras { get; set; } = string.Empty;
}