import { useState, FormEvent } from "react";
import "./App.css";
import logoImg from "./assets/logo.png";

interface InfoProps {
    title: string;
    gasolina: string;
    alcool: string;
}

function App() {
    const [gasolinaInput, setGasolinaInput] = useState<string>("");

    const [alcoolInput, setAlcoolInput] = useState<string>("");

    const [info, setInfo] = useState<InfoProps>();

    function calcular(event: FormEvent) {
        event.preventDefault();

        const gasolinaValue = parseFloat(gasolinaInput);
        const alcoolValue = parseFloat(alcoolInput);

        if (isNaN(gasolinaValue) || isNaN(alcoolValue) || gasolinaValue === 0) {
            alert("Por favor, insira valores válidos.");
            return;
        }

        const calculo = alcoolValue / gasolinaValue;

        if (calculo <= 0.7) {
            setInfo({
                title: "Compensa usar Álcool",
                gasolina: formatarMoeda(gasolinaValue),
                alcool: formatarMoeda(alcoolValue),
            });
        } else {
            setInfo({
                title: "Compensa usar Gasolina",
                gasolina: formatarMoeda(gasolinaValue),
                alcool: formatarMoeda(alcoolValue),
            });
        }
    }

    function formatarMoeda(valor: number) {
        const valorFormatado = valor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        return valorFormatado;
    }

    return (
        <div>
            <main className="container">
                <img
                    className="logo"
                    src={logoImg}
                    alt="Logo de um combustivel"
                />
                <h1 className="title">Qual melhor opção?</h1>

                <form className="form" onSubmit={calcular}>
                    <label>Álcool (preço por litro):</label>
                    <input
                        className="input"
                        type="number"
                        placeholder="Valor do Álcool"
                        min="1"
                        step="0.01"
                        required
                        value={alcoolInput}
                        onChange={(e) => setAlcoolInput(e.target.value)}
                    />

                    <label>Gasolina (preço por litro):</label>
                    <input
                        className="input"
                        type="number"
                        placeholder="Valor da Gasolina"
                        min="1"
                        step="0.01"
                        required
                        value={gasolinaInput}
                        onChange={(e) => setGasolinaInput(e.target.value)}
                    />

                    <input className="button" type="submit" value="Calcular" />
                </form>

                {info && Object.keys(info).length > 0 && (
                    <section className="result">
                        <h2 className="result-title">{info.title}</h2>

                        <span>Álcool: {info.alcool}</span>

                        <span>Gasolina: {info.gasolina}</span>
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;
