import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import DashboardPage from '@/pages/Dashboard';
import CharactersPage from '@/pages/Characters';
import Creatures from '@/pages/Creatures';
import Lores from '@/pages/Lores';
import Rooms from '@/pages/Rooms';
import Rules from '@/pages/Rules';
import Container from '@/components/Container';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import LoreStoryPage from '@/pages/LoreStory';
import CreateCharacterPage from './pages/CreateCharacter';
import CharacterViewPage from './pages/CharacterView';
import InvitationsPage from './pages/Invitations';
import RoomView from './pages/RoomView';
import CreateCreaturePage from './pages/CreateCreature';
import CreatureView from './pages/CreatureView';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Container>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterViewPage />} />
          <Route path="/lore/story/:id" element={<LoreStoryPage />} />
          <Route path="/create-character" element={<CreateCharacterPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/invitations" element={<InvitationsPage />} />
          <Route path="/creatures" element={<Creatures />} />
          <Route path="/create-creature" element={<CreateCreaturePage />} />
          <Route path="/creatures/:id" element={<CreatureView />} />
          <Route path="/lores" element={<Lores />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomView />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App
