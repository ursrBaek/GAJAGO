import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setPublicReviewCount, setTrophyInfo, setUser } from './redux/actions/user_action';
import { countPublicReview, createScheduleInfo, createTrophyInfoObj, getPlanData } from './components/Schedule/utils';
import { Background } from './components/MainTemplate/styles';
import { setScheduleInfo } from './redux/actions/scheduleInfo_action';

import './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MainPage = lazy(() => import('./pages/MainPage'));
const LogInPage = lazy(() => import('./pages/LogInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const MyTripsPage = lazy(() => import('./pages/MyTripsPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const StoryPage = lazy(() => import('./pages/StoryPage'));

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setScheduleAndTrophyInfo = async (uid) => {
    try {
      const planArray = await getPlanData(uid);
      const scheduleInfo = createScheduleInfo(planArray);
      const trophyInfo = createTrophyInfoObj(scheduleInfo.schedulesByRegion.beforeToday);
      const publicReviewCount = countPublicReview(scheduleInfo.overallRegionalSchedule.beforeToday);
      dispatch(setScheduleInfo(scheduleInfo));
      dispatch(setTrophyInfo(trophyInfo));
      dispatch(setPublicReviewCount(publicReviewCount));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userInfo = {
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
      };
      if (user && user.displayName) {
        dispatch(setUser(userInfo));
        setScheduleAndTrophyInfo(user.uid);
        navigate('/');
      } else if (!user) {
        navigate('/login');
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isLoading ? (
    <Background>
      <div className="loading">loading..</div>
    </Background>
  ) : (
    <Suspense
      fallback={
        <Background>
          <div className="loading">loading..</div>
        </Background>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate replace to="/schedule" />} />
        <Route path="/schedule" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/myTrips" element={<MyTripsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
