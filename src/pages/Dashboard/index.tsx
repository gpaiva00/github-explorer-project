import React, { FC, useState, useEffect, FormEvent, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { AppContext } from '../../contexts/AppContext';

import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface InputProps {
  newValue: string;
}

const Dashboard: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userRepositories, setUserRepositories] = useState<Repository[]>([]);
  const [suggestions, setSuggestions] = useState<Repository[]>([]);
  const [inputValue, setInputValue] = useState(
    () => localStorage.getItem('@Githubexplorer:inputValue') || ''
  );

  const { favorites, setFavorites } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  async function handleSearchByUser(): Promise<void> {
    const [user] = inputValue.split('/');

    if (!user) return;

    setIsLoading(true);

    const { data } = await api.get<Repository[]>(`users/${user.trim()}/repos`);

    setUserRepositories([...userRepositories, ...data]);
    setErrorMessage('');
    setIsLoading(false);
  }

  // eslint-disable-next-line consistent-return
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const [user, repository] = inputValue.split('/');
    const searchTermIsNotValid = !user.length && !repository.length;

    if (searchTermIsNotValid)
      return setErrorMessage('Digite o usuário "/" repositório');

    localStorage.setItem('@Githubexplorer:inputValue', inputValue);

    history.push(`/repository/${inputValue}`);
  }

  function onChange(
    event: React.SyntheticEvent<HTMLElement>,
    value: InputProps
  ): void {
    if (value.newValue.indexOf('/') !== -1 && !userRepositories.length)
      handleSearchByUser();

    if (!value.newValue.length) {
      localStorage.setItem('@Githubexplorer:inputValue', '');
      setUserRepositories([]);
    }

    setInputValue(value.newValue);
  }

  function getSuggestions(value: string): Repository[] {
    if (value.indexOf('/') === -1) return [];

    const [, repository] = value.split('/');
    const repositoryName = repository.trim().toLowerCase();
    const repositoryLength = repositoryName.length;

    // eslint-disable-next-line consistent-return
    return value.indexOf('/') === -1
      ? []
      : userRepositories.filter(
          (repo) =>
            repo.name.toLowerCase().slice(0, repositoryLength) ===
            repositoryName
        );
  }

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Nome de usuário / nome do repositório',
    value: inputValue,
    onChange,
  };

  useEffect(() => {
    localStorage.setItem(
      '@Githubexplorer:repositories',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleSubmit} hasError={!!errorMessage}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.full_name}
          renderSuggestion={(suggestion: Repository) => (
            <div>{suggestion.name}</div>
          )}
          inputProps={inputProps}
        />

        <button type="submit">
          {isLoading ? (
            <Loader
              type="Oval"
              color="#fff"
              height={40}
              width={40}
              timeout={3000}
            />
          ) : (
            'Pesquisar'
          )}
        </button>
      </Form>

      {errorMessage && <Error>{errorMessage}</Error>}

      <Repositories>
        <strong className="title">Favoritos</strong>

        {!favorites.length && <p>Não há favoritos por enquanto.</p>}
        {favorites.map((repository) => (
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
