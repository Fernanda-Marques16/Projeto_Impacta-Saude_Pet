import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import Formulario from "./components/formularios/formVacina";
import FormVermifugo from "./components/formularios/formVermifugo";
import FormConsulta from "./components/formularios/formConsulta";
import FormMedicamentos from "./components/formularios/formMedicamento";
import FormAntipulgas from "./components/formularios/formAntipulagas";

function App() {
  const [values, setValues] = useState({});
  const [listPets, setListPets] = useState([]);
  const [selectedForm, setSelectedForm] = useState("formVacina");
  const [showRegisterContainer, setShowRegisterContainer] = useState(true);

  const handleAddValues = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      nome: values.name,
      raca: values.raca,
      idade: values.idade,
      sexo: values.sexo,
    }).then(() => {});
  };

  const handleMenuClick = (formName) => {
    setSelectedForm(formName);
    setShowRegisterContainer(false);
  };

  const handleCadastrarPetClick = () => {
    setSelectedForm("formVacina");
    setShowRegisterContainer(true);
  };

  return (
    <>
      <header>
        <h1>Saúde Pet</h1>
      </header>
      <nav>
        <ul className="menu">
          <li>
            <a href="#" onClick={handleCadastrarPetClick}>Cadastrar Pet</a>
          </li>
          <li>
            <a href="#">Selecionar Pet</a>
          </li>
          <li>
            <a href="#">Cadastrar na agenda</a>
            <ul>
              <li>
                <a href="#" onClick={() => handleMenuClick("formVermifugo")}>
                  Vermifugo
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleMenuClick("formVacina")}>
                  Vacinas
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleMenuClick("formConsulta")}>
                  Consulta
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleMenuClick("formMedicamentos")}>
                  Medicamentos
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleMenuClick("formAntipulgas")}>
                  Antipulga
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Links</a>
          </li>
          <li>
            <a href="#">Anotações</a>
          </li>
        </ul>
      </nav>
      <main>
        {showRegisterContainer && (
          <div className="register-container">
            <h2>Cadastrar Pet</h2>
            <form>
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  placeholder="Nome do Pet"
                  onChange={handleAddValues}
                />
              </label>
              <label>
                Raça:
                <input
                  type="text"
                  name="raca"
                  placeholder="Raça do Pet"
                  onChange={handleAddValues}
                />
              </label>
              <label>
                Idade:
                <input
                  type="text"
                  name="idade"
                  placeholder="Idade do Pet"
                  onChange={handleAddValues}
                />
              </label>
              <label>
                Sexo:
                <input
                  type="text"
                  name="sexo"
                  placeholder="Sexo do Pet"
                  onChange={handleAddValues}
                />
              </label>
              <button className="register-button" onClick={handleClickButton}>
                Cadastrar
              </button>
            </form>
          </div>
        )}

        {selectedForm === "formVacina" && !showRegisterContainer && <Formulario />}
        {selectedForm === "formVermifugo" && <FormVermifugo />}
        {selectedForm === "formConsulta" && <FormConsulta />}
        {selectedForm === "formMedicamentos" && <FormMedicamentos />}
        {selectedForm === "formAntipulgas" && <FormAntipulgas />}

        {listPets.map((pet) => (
          <Card
            key={pet.idpet}
            pet={pet}
            listPets={listPets}
            setListPets={setListPets}
            id={pet.idpet}
            nome={pet.nome}
            raca={pet.raca}
            idade={pet.idade}
            sexo={pet.sexo}
          />
        ))}
      </main>
    </>
  );
}

export default App;
