document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
  
    cepInput.addEventListener("input", () => {
      const cep = cepInput.value.replace(/\D/g, "");
      if (cep.length === 8) {
        buscarCep(cep);
      } else {
        limparCampos();
      }
    });
  });
  
  function buscarCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
  
    fetch(url)
      .then((res) => res.json())
      .then((dados) => {
        if (dados.erro) {
          alert("CEP não encontrado!");
          limparCampos();
          return;
        }
  
        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("complemento").value = dados.complemento || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("uf").value = dados.uf || "";
        document.getElementById("ddd").value = dados.ddd || "";
      })
      .catch(() => {
        alert("Erro ao buscar o CEP.");
        limparCampos();
      });
  }
  
  function limparCampos() {
    const campos = ["rua", "complemento", "bairro", "cidade", "uf", "ddd"];
    campos.forEach((id) => (document.getElementById(id).value = ""));
  }
  