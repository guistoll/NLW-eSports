import { useEffect, useState } from 'react'

import { GameBanner } from './components/GameBanner'

import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []) // if [] is empty, this code will execute ONCE.

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black my-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id} // Warning: Each child in a list should have a unique "key" prop.
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <CreateAdBanner />
    </div>
  )
}

export default App
