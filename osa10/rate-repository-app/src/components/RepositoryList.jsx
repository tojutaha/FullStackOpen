import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
// import Text from '../components/Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate, useParams } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, singleView }) => {

  const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const handlePress = (id) => {
      navigate(`/repo/${id}`);
    };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View>
            <Pressable onPress={() => handlePress(item.id)}>
              <RepositoryItem item={item} singleView={singleView} />
            </Pressable>
          </View>
        )
      }}
    />
  );
}

const RepositoryList = ({ singleView }) => {
  const { repositories } = useRepositories();
  const { id } = useParams();

  // If singleView is true, filter for the specific repository
  const filteredRepositories = singleView
    ? { edges: repositories.edges.filter(edge => edge.node.id === id) }
    : repositories;

  return <RepositoryListContainer repositories={filteredRepositories} singleView={singleView} />;
};

export default RepositoryList;