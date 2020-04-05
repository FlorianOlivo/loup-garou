import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useUser} from '../services/User';
import StyledButton from '../components/StyledButton';
import { Paper } from '@material-ui/core';
import firebase from '../services/Firebase';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

const CodePage = ({setGame}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const {user} = useUser();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .firestore()
      .collection('game')
      .where('code', '==', parseInt(code))
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const newData = {...doc.data()};
          newData.players = [...newData.players, {uid: user.uid, name}];
          firebase
            .firestore()
            .collection('game')
            .doc(doc.id)
            .update(newData);

          firebase
            .firestore()
            .collection('user')
            .doc(user.uid)
            .update({gameId: doc.id});

          history.push('/wait');
        });
      })
    .catch(console.log);
  };
   return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <Grid container direction="column">
          <Input
            className={classes.input}
            type="text"
            name="code"
            placeholder="Ajouter le code de la partie"
            onChange={e => setCode(e.target.value)}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon/>
              </InputAdornment>
            }
          />
          <Input
            className={classes.input}
            type="text"
            name="name"
            placeholder="Ajouter votre nom"
            onChange={e => setName(e.target.value)}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <StyledButton
            className={classes.button}
          >
            Démarrer
          </StyledButton>
        </Grid>
      </Paper>
    </form>
  );
};

export default CodePage;