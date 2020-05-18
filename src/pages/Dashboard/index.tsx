import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { Title, Form, Repositories, Error, SugestionList } from './styles';

interface Repository {
  name: string;
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
  const [userRepositories, setUserRepositories] = useState<Repository[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@Githubexplorer:repositories'
    );

    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });

  async function handleSearchByUser(
    event: KeyboardEvent<HTMLInputElement>
  ): Promise<void> {
    const { keyCode } = event;

    if (keyCode !== 191) return;

    const [user] = searchTerm.split('/');

    if (!user) return;

    const { data } = await api.get<Repository[]>(`users/${user}/repos`);

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
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => handleSearchByUser(e)}
          placeholder="Digite aqui o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {userRepositories.length > 0 && (
        <SugestionList>
          {userRepositories.map((repository) => (
            <li key={repository.name}>{repository.name}</li>
          ))}
        </SugestionList>
      )}

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
