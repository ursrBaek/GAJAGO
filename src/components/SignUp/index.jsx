import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { Message, StyledButton } from '../LogIn/styles';
import '../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import md5 from 'md5';
import { getDatabase, ref, set } from 'firebase/database';

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [mismatchError, setMismatchError] = useState(false);
  const [pwMinLengthError, setPwMinLengthError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const isEmpty = useCallback(() => {
    return !(email && nickname.trim() && password && passwordConfirm);
  }, [email, nickname, password, passwordConfirm]);

  const initState = useCallback(() => {
    setEmail('');
    setNickname('');
    setPassword('');
    setPasswordConfirm('');
  }, [setEmail, setNickname]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordConfirm);
      if (e.target.value.length < 6) {
        setPwMinLengthError(true);
      } else {
        setPwMinLengthError(false);
      }
    },
    [passwordConfirm],
  );

  const onChangePasswordConfirm = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const auth = getAuth();
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log(createdUser);

        await updateProfile(auth.currentUser, {
          displayName: nickname,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
        });

        await set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
          nickname: createdUser.user.displayName,
          image: createdUser.user.photoURL,
        });

        // 모든 input 초기화해주기
        initState();
        setSignUpSuccess(true);

        setLoading(false);
        setTimeout(() => {
          setSignUpSuccess(false);
        }, 4000);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setSignUpError('이미 가입된 이메일입니다.');
        } else {
          setSignUpError(error.code);
        }
        setLoading(false);
        setTimeout(() => {
          setSignUpError('');
        }, 5000);
      }
    },
    [email, nickname, password, initState],
  );

  return (
    <form onSubmit={onSubmit}>
      <h1 className="signUp">회원가입</h1>
      <label className="label">
        Email <input type="email" autoComplete="off" value={email} onChange={onChangeEmail} />
      </label>
      <label className="label">
        Nickname <input type="text" autoComplete="off" value={nickname} onChange={onChangeNickname} />
      </label>
      <label className="label">
        Password
        <input type="password" value={password} onChange={onChangePassword} />
      </label>
      <label className="label">
        Password Confirm
        <input type="password" value={passwordConfirm} onChange={onChangePasswordConfirm} />
      </label>
      <Message>
        {(pwMinLengthError && <span className="error">비밀번호는 6자 이상이어야 합니다.</span>) ||
          (mismatchError && <span className="error">비밀번호가 일치하지 않습니다.</span>) ||
          (signUpError && (
            <span className="error" title={signUpError}>
              {signUpError}
            </span>
          )) ||
          (signUpSuccess && <span className="success">회원가입이 완료되었습니다.</span>)}
      </Message>
      <StyledButton disabled={mismatchError || isEmpty() || loading || pwMinLengthError}>SIGN UP</StyledButton>
    </form>
  );
};

export default SignUp;