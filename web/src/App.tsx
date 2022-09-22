import './styles/main.css';
import { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import axios from 'axios';

export interface GameList {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<GameList[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(gameArr => {setGames(gameArr.data)})
  }, []/*aqui passo nome das variaveis que quando alterar eu queira que meu estado recarregue, se deixar vazio ele renderizará apenas uma vez.*/)

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo}></img>
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(OBJ => {
          return (
            <GameBanner key={OBJ.id} bannerUrl={OBJ.bannerUrl} title={OBJ.title} adsCount={OBJ._count.ads} />
          )
        })}
      </div>

      <CreateAdBanner />

    </div>
  )
}

export default App