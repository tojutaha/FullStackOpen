import React from 'react';
import Text from '../components/Text';
import theme from '../theme';
import { View, Image, StyleSheet } from 'react-native-web';

function AbbreviateNumber(number) {
  // none, thousand, million, billion, trillion, quadtrillion, quintillion, ...
  const abbreviations = ['', 'k', 'M', 'B', 'T', 'Q', 'QQ'];

  let index = 0;
  while (number >= 1000 && index < abbreviations.length - 1) {
    number /= 1000;
    index++;
  }

  const roundedNumber = index > 0 ? number.toFixed(1) : number.toFixed(0);
  return roundedNumber.toString() + abbreviations[index];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 10, 
  },
  languageLogo: {
    color: 'white',
    height: 30,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  containerStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  tabStats: {
    flexGrow: 1,
    color: "white",
    justifyContent: "space-around",
    paddingTop: 5,
    paddingLeft: 15,
  },
});

// eslint-disable-next-line react/prop-types
const Tab = ({ text, number, testID }) => (
  <View style={styles.tabStats}>
    <Text testID={testID} fontWeight="bold">{AbbreviateNumber(number)}</Text>
    <Text>{text}</Text>
  </View>
);

// eslint-disable-next-line react/prop-types
const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text fontWeight='bold' testID='fullName'>{item.fullName}</Text>
          <Text testID='description'>{item.description}</Text>
          <Text
            color='white'
            fontWeight='bold'
            style={[styles.languageLogo, { marginTop: 5 }]}
            testID='language'
          >
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.containerStats} testID='repositoryItem'>
        <Tab text='Stars' testID='stargazersCount' number={item.stargazersCount} />
        <Tab text='Forks' testID='forksCount' number={item.forksCount} />
        <Tab text='Reviews' testID='reviewCount' number={item.reviewCount} />
        <Tab text='Rating' testID='ratingAverage' number={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;