import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: `Desafio React JS ${Date.now()}`,
      url: "https://github.com/LHenrique42/gostack-reactjs-concepts",
      techs: ["NodeJS","ReactJS"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    }).catch(err => {
      console.log(err);
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      const repositoryIndex = repositories.findIndex(repository => 
        repository.id === id);
      const listRepositories = repositories.filter( repository => repository.id !== id );
      setRepositories(listRepositories);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorie => {
            return(
              <li key={repositorie.id}>
                <ul>{repositorie.title}</ul>
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            )
          }

          )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
