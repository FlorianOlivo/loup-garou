import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useMasterGame, addPlayer } from '../services/MasterGame';
import Typography from '@material-ui/core/Typography';
import StyledButton from '../components/StyledButton';


const AddPlayerForm = () => {
  const [value, setValue] = useState('');
  const { game } = useMasterGame();
    console.log("master game id", game.id);
    console.log("master game set ", game.players);
    console.log("master game", game);

  const handleSubmit = e => {
    e.preventDefault();
    value && addPlayer(value, game);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ajouter le nom d'un joueur..."
        onChange={e => setValue(e.target.value)}
      />
      <button>+</button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    marginTop: '5em',
    width: '40vw',
    padding: '2em'
  },
  input: {
    marginBottom: '2em'
  },
  button: {
    margin: 0
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CreatePage = (props) => {
  const { game } = useMasterGame();
  const players = game.players || [];
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1>Vos amis peuvent se connecter avec le code</h1>
      <Typography variant="h1" component="h2">
        {game.code}
      </Typography>
      <div>
        {players.map((player, index) => (
          <div key={index}>
            {player.name}
          </div>
        ))}
      </div>
      <Link to="/night">
          <StyledButton>Démarrer la partie</StyledButton>
      </Link>
    </Paper>
  );
};

export default CreatePage;