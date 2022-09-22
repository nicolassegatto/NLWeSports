import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import logoIMG from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}:GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.100.35:3333/games').then(res => res.json()).then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoIMG} style={styles.logo} />
        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
        <FlatList contentContainerStyle={styles.contentList} showsHorizontalScrollIndicator={false} horizontal data={games} keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)}/>
          )} />
      </SafeAreaView>
    </Background>
  );
}