// Parte que seleciona a cidade do <select>
let cidadeSelecionada = "";
const selectElement = document.getElementById("cb_cidade");
selectElement.addEventListener("change", (event) => {
    cidadeSelecionada = event.target.value;
    console.log("Cidade selecionada:", cidadeSelecionada);
});

// Pegando o evento de clique
document.getElementById("btn").addEventListener("click", () => consultarAqi(cidadeSelecionada));

// Consulta da API
async function getApi(cidade) {
    return await fetch(`http://127.0.0.1:8000/obter-aqi?cidade=${encodeURIComponent(cidade)}&estado=sao%20paulo`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error("Erro ao consultar API:", error));
}

// Função disparada no evento de clique
function consultarAqi(cidade) {
    getApi(cidade)
        .then((data) => {
            const resultadoTxt01 = document.getElementById("resultado-aqi")
            const resultadoTxt02 = document.getElementById("resultado-text")

            console.log(data.estado)
            console.log(data.cidade)
            console.log(data.aqi)

            document.getElementById("aparecer").style.display = "block";
            document.getElementById("desaparecer").style.display = "none";


            if(data.aqi <= 50){
                resultadoTxt01.innerHTML = `Resultado da consulta AQI: ${data.aqi}`;
                resultadoTxt02.innerHTML = ResultadoMng.obj_boa.mng;
            }else if(data.aqi >= 51 && data.aqi <= 100){
                resultadoTxt01.innerHTML = `Resultado da consulta AQI: ${data.aqi}`;
                resultadoTxt02.innerHTML = ResultadoMng.obj_regular.mng;
            }else if(data.aqi >= 151 && data.aqi <= 200){
                resultadoTxt01.innerHTML = `Resultado da consulta AQI: ${data.aqi}`;
                resultadoTxt02.innerHTML = ResultadoMng.obj_ruim.mng;
            }else{
                resultadoTxt01.innerHTML = `Recomendações: Aqi maior que 200, PERIGO`;
                resultadoTxt02.innerHTML = ResultadoMng.obj_ruim.mng;
            }
        });
}

// Classe para gerenciar o resultado
class ResultadoMng {
    static obj_boa = {
        status: `Bom (0-50)`,
        mng: `Bom (0-50)<br><br>"Se o AQI está na faixa de 0 a 50, a qualidade do ar é excelente. É seguro para todos praticarem atividades ao ar livre como caminhadas, corridas e esportes. Aproveite para respirar o ar puro e exercitar-se fora de casa!"`
    };
    static obj_regular = {
        status: `Moderado (51-100)`,
        mng: `Moderado (51-100)<br><br>"Com um AQI entre 51 e 100, a qualidade do ar é aceitável, mas pessoas com asma ou outros problemas respiratórios devem ficar atentas a sintomas leves. Atividades ao ar livre ainda são seguras, mas é recomendado que pessoas sensíveis mantenham a intensidade das atividades em um nível moderado."`
    };
    static obj_ruim = {
        status: `Ruim (151-200)`,
        mng: `Ruim (151-200)<br><br>"Em um AQI entre 151 e 200, a qualidade do ar está prejudicial, especialmente para grupos sensíveis. É melhor evitar atividades físicas intensas ao ar livre. Pessoas com problemas respiratórios ou cardíacos devem permanecer em ambientes fechados sempre que possível ou optar por exercícios leves dentro de casa."`
    };
}