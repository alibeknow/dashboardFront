import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch,connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';

import { signIn } from '../../../../actions/auth';
import useRouter from '../../../../utils/useRouter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'не указано' },
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
    try {
      await props.signIn( formState.values.username, formState.values.password)  
      router.history.push('/dashboards/history');
    } catch (error) {
      toast.error('Неверное имя пользователя и/или пароль',{ position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    }
    
    //router.history.push('/dashboards/history');
    
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
function mapDispatchToProps(dispatch){
  return {
    signIn:(username,password)=>dispatch(signIn(username,password))
  }
}
export default withRouter(connect(null,mapDispatchToProps)(LoginForm));
