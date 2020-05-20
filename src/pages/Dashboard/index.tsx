import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
} from 'react';
import { Link } from 'react-router-dom';
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

interface inputProps {
  newValue: string;
}

const Dashboard: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userRepositories, setUserRepositories] = useState<Repository[]>([]);
  const [suggestions, setSuggestions] = useState<Repository[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@Githubexplorer:repositories'
    );

    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });

  async function handleSearchByUser(): Promise<void> {
    const [user] = searchTerm.split('/');

    if (!user) return;

    const { data } = await api.get<Repository[]>(`users/${user.trim()}/repos`);

    setUserRepositories([...userRepositories, ...data]);
  }

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

  function onChange(
    event: React.SyntheticEvent<HTMLElement>,
    value: inputProps
  ): void {
    if (value.newValue.indexOf('/') !== -1 && !userRepositories.length)
      handleSearchByUser();

    if (!value.newValue.length) setUserRepositories([]);

    setSearchTerm(value.newValue);
  }

  function getSuggestions(value: string): Repository[] {
    if (value.indexOf('/') === -1) return [];

    const inputValue = value.split('/')[1].trim().toLowerCase();
    const inputLength = inputValue.length;

    // eslint-disable-next-line consistent-return
    return value.indexOf('/') === -1
      ? []
      : userRepositories.filter(
          (repo) => repo.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Nome de usuário / nome do repositório',
    value: searchTerm,
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

      {/* onSubmit={handleAddRepository} */}
      <Form hasError={!!errorMessage}>
        {/* <input
          id="inputSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => handleSearchByUser(e)}
          placeholder="Digite aqui o nome do repositório"
        /> */}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion: Repository) => suggestion.name}
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
