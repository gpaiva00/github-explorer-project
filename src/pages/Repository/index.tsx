import React, { FC, useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Header, RepositoryInfo, Issues, NoIssues } from './styles';
import logoImg from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  forks_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

interface RouteParams {
  repositoryFullName: string;
}

const Repository: FC = () => {
  const { params } = useRouteMatch<RouteParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  /**
   * Duas requisições devem acontecer ao mesmo tempo pois uma não depende da outra
   * Para isso temos o promise all onde podemos passar um array de requisições
   * Interessante que temos também o Promise.race onde enviamos um array
   * de requisições e a primeira que retornar vai ser a selecionada como resposta
   * Caso de uso: Ao buscar um CEP, podemos requisitar de várias APIs e a que
   * retornar primeiro, usamos
   */
  useEffect(() => {
    async function loadRepositoryInfo(): Promise<void> {
      const [getRepository, getIssues] = await Promise.all([
        api.get<Repository>(`repos/${params.repositoryFullName}`),
        api.get<Issue[]>(`repos/${params.repositoryFullName}/issues`),
      ]);

      setRepository(getRepository.data);
      setIssues(getIssues.data);
    }

    loadRepositoryInfo();
  }, [params.repositoryFullName]);
  /**
   * plugin react-hooks nos avisa que se usarmos uma variavel dentro do useEffect
   * muito provavelmente precisamos colocá-la no array de depedencias
   * Pois nesse caso, se ela mudar, precisaremos fazer uma nova requisição
   */

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github explorer" />

        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {issues.length ? (
        <Issues>
          {issues.map((issue) => (
            <a
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))}
        </Issues>
      ) : (
        <NoIssues>
          <span>Sem issues por enquanto</span>
        </NoIssues>
      )}
    </>
  );
};

export default Repository;
