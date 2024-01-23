document.addEventListener("DOMContentLoaded", function(){
    let data = new Date();
    function formatarData(data){
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");  
        const dia = String(data.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    let inputDate = document.getElementById("dateInput2");
    let dataFormatada = formatarData(data);
    inputDate.value = dataFormatada;
})

function validarData(data) {
  
    return !isNaN(new Date(data).getTime());
}

function pegarDatas(){
    let inputData1 = document.getElementById("dateInput1");
    let inputData2 = document.getElementById("dateInput2");


    let dataNascimento = inputData1.value;
    let dataComparacao = inputData2.value;


    
    if (!validarData(dataNascimento) || !validarData(dataComparacao)) {
        alert("Insira datas de nascimento e comparação válidas");
        return null;
    }

    if(dataNascimento === ""){
        alert("Insira uma data de nascimento");
        return null; 
    } else if(dataComparacao === ""){
        let dataAtual = new Date();
        let dataFormatada = dataAtual.toISOString().split('T')[0];
        dataComparacao = dataFormatada;
    }
   

    return {dataNascimento, dataComparacao};
}




function calcularIdadeDetalhada(dataNascimento, dataComparacao){
    let dataNascimentoObj = new Date(dataNascimento);
    let dataComparacaoObj = new Date(dataComparacao);

    let proximoAniversario = new Date(dataComparacaoObj.getFullYear(), dataNascimentoObj.getMonth(), dataNascimentoObj.getDate(), 0, 0, 0, 0);

    if (dataComparacaoObj > proximoAniversario) {
        proximoAniversario.setFullYear(proximoAniversario.getFullYear() + 1);
    }

   
    let tempoFaltaProAniversario = Math.ceil((proximoAniversario - dataComparacaoObj) / (24 * 60 * 60 * 1000));


    let diferenca = dataComparacaoObj - dataNascimentoObj;

    let idadeEmAnos = Math.floor(diferenca / (365.25 * 24 * 60 * 60 * 1000));
    let idadeEmMeses = Math.floor(diferenca / (30.44 * 24 * 60 * 60 * 1000));
    let idadeEmDias = Math.floor(diferenca / (24 * 60 * 60 * 1000));

    return {
        anos: idadeEmAnos,
        meses: idadeEmMeses,
        dias: idadeEmDias,
        aniversario: tempoFaltaProAniversario 
    };
}

function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}




let botao = document.getElementById("botao");

botao.addEventListener("click", () => {
    let datas = pegarDatas();
    let lista;

    if(datas !== null){
        let { dataNascimento, dataComparacao } = datas;
        let idadeDetalhada = calcularIdadeDetalhada(dataNascimento, dataComparacao);

        lista = document.createElement('ul');
        for (let propriedade in idadeDetalhada) {
            let item = document.createElement('li');
            let texto = document.createTextNode(`${capitalizarPrimeiraLetra(propriedade)}: ${idadeDetalhada[propriedade]}`);
            item.appendChild(texto);
            lista.appendChild(item);
        }
    }
    
    let content2 = document.getElementById("content-2");
    content2.innerHTML = ''; 
    content2.appendChild(lista);
});








