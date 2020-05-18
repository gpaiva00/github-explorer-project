import React, { FC, useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { Title, Form, Repositories, Error, SugestionList } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@Githubexplorer:repositories'
    );

    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });

  const activeSuggestion = 0;
  const filteredSuggestions = [
    'tagged-images',
    'github-explorer-project',
    'multiplication-table',
  ];

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!searchTerm) return setErrorMessage('Digite o usuário "/" repositório');

    try {
      const { data: repo } = await api.get<Repository>(`repos/${searchTerm}`);

      setRepositories([...repositories, repo]);
      setSearchTerm('');
      setErrorMessage('');
    } catch {
      setErrorMessage('Não foi possível buscar esse repositório');
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@Githubexplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!errorMessage} onSubmit={handleAddRepository}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite aqui o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <SugestionList>
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          // if (index === activeSuggestion) {
          //   className = "suggestion-active";
          // }

          return (
            <li
              // className={className}
              key={suggestion}
              // onClick={onClick}
            >
              {suggestion}
            </li>
          );
        })}
      </SugestionList>

      {errorMessage && <Error>{errorMessage}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
