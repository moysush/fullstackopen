import ReactDOM from 'react-dom/client'
import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom"
import { IconButton, Toolbar, AppBar, Alert, FormControl, FormGroup, TextField, Button, Container, TableContainer, Table, TableRow, TableBody, TableCell } from '@mui/material'
import Paper from '@mui/material/Paper';

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

// for the specific note page
const Note = ({ notes }) => {
  // short way
  // const { id } = useParams()
  // const note = notes.find(n => n.id === Number(id))
  const match = useMatch('/notes/:id') // get the url?
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note =>
            <TableRow key={note.id}>
              <TableCell>
                {/* sending the page to respected id here */}
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <TextField size='small' label='username' component={Paper} />
          <TextField size='small' label='password' type='password' component={Paper} />
          <Button size='small' variant='contained' type="submit">login</Button>
        </FormGroup>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
      {message &&
        <Alert serverity="success">
          {message}
        </Alert>
      }
      <div>
        <AppBar position='static' sx={{ borderRadius: '5px' }}>
          <Toolbar>
            <IconButton component={Paper} size='large' edge='start' color='inherit' aria-label='menu'>
            </IconButton>
            <Button color='inherit' component={Link} to="/">
              home
            </Button>
            <Button color='inherit' component={Link} to="/notes">
              notes            </Button>
            <Button color='inherit' component={Link} to="/users">
              users
            </Button>
            {user
              ? <em>{user} logged in</em>
              : <Button color='inherit' component={Link} to="/login">
                login
              </Button>
            }
          </Toolbar>
        </AppBar>
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </Container>
  )
}

export default App
