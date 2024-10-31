import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    if(data && data.repositories ) {
      // console.log(data);
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  if(error) {
    console.error(error);
  }

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;