import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';

import { login } from "../../../../actions/sessionActions";
import useRouter from "../../../../utils/useRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiURL = 'http://10.20.35.85:3000/providers/';

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'не указано' },
    // username: true
  },
  password: {
    presence: { allowEmpty: false, message: 'Необходимо заполнить поле' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const LoginForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const result = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: result ? false : true,
      errors: result || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(login());
    axios.get(apiURL, {
      auth: {
        username: formState.values.username,
        password: formState.values.password
      }}).then(function(response) {
        router.history.push('/');
      }).catch(function(error) {
        toast.error("Неверное имя пользователя и/или пароль",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
    });
    // getProviders(formState.values.username, formState.values.password);
  };

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div>
        <ToastContainer />
      </div>
      <div className={classes.fields}>
        <TextField
          error={hasError('username')}
          fullWidth
          helperText={hasError('username') ? formState.errors.username[0] : null}
          label="Учетная запись"
          name="username"
          onChange={handleChange}
          value={formState.values.username || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Пароль"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Вход
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
