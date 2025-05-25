document.getElementById('form-mercadoria').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const quantidade = document.getElementById('quantidade').value;
    const unidade = document.getElementById('unidade').value;
  
    if (!nome || !categoria || !quantidade || !unidade) return;
  
    const tabela = document.getElementById('tabela-mercadorias').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
  
    novaLinha.innerHTML = `
      <td>${nome}</td>
      <td>${categoria}</td>
      <td>${quantidade}</td>
      <td>${unidade}</td>
      <td>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      </td>
    `;
  
    novaLinha.querySelector('.excluir').addEventListener('click', () => {
      tabela.deleteRow(novaLinha.rowIndex - 1);
      atualizarResumo();
    });
  
    novaLinha.querySelector('.editar').addEventListener('click', () => {
      document.getElementById('nome').value = novaLinha.cells[0].textContent;
      document.getElementById('categoria').value = novaLinha.cells[1].textContent;
      document.getElementById('quantidade').value = novaLinha.cells[2].textContent;
      document.getElementById('unidade').value = novaLinha.cells[3].textContent;
      tabela.deleteRow(novaLinha.rowIndex - 1);
      atualizarResumo();
    });
  
    document.getElementById('form-mercadoria').reset();
    atualizarResumo();
  });
  
  function atualizarResumo() {
    const tabela = document.getElementById('tabela-mercadorias').getElementsByTagName('tbody')[0];
    const totalItens = tabela.rows.length;
    let baixoEstoque = 0;
  
    for (let i = 0; i < tabela.rows.length; i++) {
      const quantidade = parseInt(tabela.rows[i].cells[2].textContent);
      if (quantidade < 5) {
        baixoEstoque++;
      }
    }
  
    document.getElementById('total-itens').textContent = totalItens;
    document.getElementById('baixo-estoque').textContent = baixoEstoque;
    document.getElementById('ultima-atualizacao').textContent = new Date().toLocaleString();
  }
  