import React, { useEffect, useState } from "react";
import api from "./api";
import ProdutoForm from "./components/ProdutoForm";
import ProdutoList from "./components/ProdutoList";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro("");

      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      setErro("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="container">
      <h1>CRUD de Produtos</h1>

      <ProdutoForm onCreated={carregarProdutos} />

      {loading ? (
        <p>Carregando produtos...</p>
      ) : erro ? (
        <p className="mensagem erro">{erro}</p>
      ) : (
        <ProdutoList produtos={produtos} onDeleted={carregarProdutos} />
      )}
    </div>
  );
}

export default App;