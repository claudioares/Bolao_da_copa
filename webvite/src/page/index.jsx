import './styles.css';
import exempleCells from '../assets/img_cels_demo.svg';
import chacked from '../assets/chaked.svg';
import logo from '../assets/logo.svg';
import userAvatarExemple from '../assets/user_avatar_exemple.svg';
import api from '../service/api';
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
  const [poolCount, setPoolCount] = useState();
  const [guessCount, setGuessCount] = useState();
  const [usersCount, setUsersCount] = useState();
  const [poolTitle, setPoolTitle] = useState('');

  async function getPoolData () {
    try {
      const countPools = await api.get('/pools/count');
      const pools = countPools.data.count;
      setPoolCount(pools)

      const countGuesses = await api.get('/guesses/count');
      const  guesses = countGuesses.data.count;
      setGuessCount(guesses)

      const countUsers = await api.get('/users/count');
      const  users = countUsers.data.count;
      setUsersCount(users)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=> {
    getPoolData()
  }, []);

  async function setPoolSubmit (e) {
    e.preventDefault();

    try {
      const response = await api.post('/pools',{
        title: poolTitle,
      })

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      
      alert('Bolão criado com sucesso. O código foi copiado para área de transferência!')
      
    } catch (error) {
      alert('Falha ao criar o bolão. Tente novamente!');
      setPoolTitle('');
      console.log(error);
    }

    setPoolTitle('')
  }

  return (
    <div className='container_home'>
      <div className='container_left'>
        <img 
          src={logo} 
          alt='logo da aplocação'
          className='img_logo'
        />
        <h1>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='content_avatar_exemple_spans'>
          <img src={userAvatarExemple} alt='exemplos de avatares da aolicação' />
          <strong>
            <span>+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form 
          className='content_form'
          onSubmit={setPoolSubmit}
        >
          <input 
            type='text' 
            required 
            placeholder='Qual nome do seu bolão?'
            value={poolTitle}
            onChange={(e)=>setPoolTitle(e.target.value)}
          />
          <button>CRIAR SEU BOLÃO</button>
        </form>

        <p className='p'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='footer'>
          <div className='content_footer'>
            <img src={chacked} alt='icone de checagem' />
            <div className='content_info_footer'>
              <strong>+{poolCount}</strong>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='left_border_footer' />
          <div className='content_footer'>
            <img src={chacked} alt='icone de checagem' />
            <div className='content_info_footer'>
              <strong>+{guessCount}</strong>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </div>

      <div className='container_rigth'>
        <img src={exempleCells} alt='imagem de celulares' />
      </div>
    </div>
  )
}

export default Home;
