import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

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
  const [inputValue, setInputValue] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@Githubexplorer:repositories'
    );

    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });

  const history = useHistory();

  async function handleSearchByUser(): Promise<void> {
    const [user] = inputValue.split('/');

    if (!user) return;

    const { data } = await api.get<Repository[]>(`users/${user.trim()}/repos`);

    setUserRepositories([...userRepositories, ...data]);
    setErrorMessage('');
  }

  async function addToFavorite(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      const { data: repo } = await api.get<Repository>(`repos/${inputValue}`);

      setRepositories([...repositories, repo]);
      setErrorMessage('');
    } catch {
      setErrorMessage('Não foi possível adicionar esse repositório');
    }
  }

  // eslint-disable-next-line consistent-return
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const [user, repository] = inputValue.split('/');
    const searchTermIsNotValid = !user.length && !repository.length;

    if (searchTermIsNotValid)
      return setErrorMessage('Digite o usuário "/" repositório');

    history.push(`/repository/${inputValue}`);
  }

  function onChange(
    event: React.SyntheticEvent<HTMLElement>,
    value: InputProps
  ): void {
    if (value.newValue.indexOf('/') !== -1 && !userRepositories.length)
      handleSearchByUser();

    if (!value.newValue.length) setUserRepositories([]);

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
      JSON.stringify(repositories)
    );
  }, [repositories]);

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
          getSuggestionValue={(suggestion: Repository) => suggestion.full_name}
          renderSuggestion={(suggestion: Repository) => (
            <div>{suggestion.name}</div>
          )}
          inputProps={inputProps}
        />

        <button type="submit">Pesquisar</button>
      </Form>

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
