class consulta{
    //consulta api, todas cidades
    static async todasCidades() {
      return await fetch(`http://127.0.0.1:8000/obter-cidades-estado?estado=sao paulo`)
      .then((response) => response.json())
      .then((data) => {return data})
    }
    //vetor onde contém todas as cidades
    static todasCidadesSaoPaulo = []
    //formata para dentro do vetor
    static async formatarCidades(data) {
      await data.cidades.forEach(element => {
        consulta.todasCidadesSaoPaulo.push(element)
      });
    }
  }
  
  function addCombo_box(){
    consulta.todasCidades()
    .then((data) => {
      consulta.formatarCidades(data);
      consulta.todasCidadesSaoPaulo.forEach((element) => {
        let selectElement = document.getElementById("cb_cidade");
        let option = document.createElement("option");
  
        option.value = element; // Defina o valor do <option>
        option.text = element;
        selectElement.appendChild(option);
      }) 
    })
  }
  addCombo_box();