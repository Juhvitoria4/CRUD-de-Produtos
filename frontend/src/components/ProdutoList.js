import React from "react";
import api from "../api";

function ProdutoList({ produtos, onDeleted }) {
  const handleDelete = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir este produto?");
    if (!confirmar) return;

    try {
      await api.delete(`/produtos/${id}`);

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="card">
      <h2>Lista de Produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Código de Barras</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao || "-"}</td>
                <td>R$ {Number(produto.preco).toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>{produto.codigoBarras}</td>
                <td>
                  <button
                    className="btn-excluir"
                    onClick={() => handleDelete(produto.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProdutoList;