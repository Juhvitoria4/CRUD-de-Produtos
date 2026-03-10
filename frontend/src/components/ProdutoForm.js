import React, { useState } from "react";
import api from "../api";

function ProdutoForm({ onCreated }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    codigoBarras: ""
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validarFormulario = () => {
    if (!form.nome.trim()) {
      return "O nome é obrigatório.";
    }

    if (!form.preco || Number(form.preco) <= 0) {
      return "O preço deve ser maior que zero.";
    }

    if (form.estoque === "" || Number(form.estoque) < 0) {
      return "O estoque não pode ser negativo.";
    }

    if (!form.codigoBarras.trim()) {
      return "O código de barras é obrigatório.";
    }

    return "";
  };

  const limparFormulario = () => {
    setForm({
      nome: "",
      descricao: "",
      preco: "",
      estoque: "",
      codigoBarras: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");

    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      setLoading(true);

      await api.post("/produtos", {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        codigoBarras: form.codigoBarras
      });

      setSucesso("Produto cadastrado com sucesso.");
      limparFormulario();

      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      const mensagemApi = error.response?.data?.mensagem;
      setErro(mensagemApi || "Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Cadastrar Produto</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Digite a descrição"
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Estoque</label>
          <input
            type="number"
            name="estoque"
            value={form.estoque}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Código de Barras</label>
          <input
            type="text"
            name="codigoBarras"
            value={form.codigoBarras}
            onChange={handleChange}
            placeholder="Digite o código de barras"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>

      {erro && <p className="mensagem erro">{erro}</p>}
      {sucesso && <p className="mensagem sucesso">{sucesso}</p>}
    </div>
  );
}

export default ProdutoForm;