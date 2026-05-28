import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage       from '../pages/HomePage';
import DetailPage     from '../pages/DetailPage';
import LoginPage      from '../pages/LoginPage';
import MyPage         from '../pages/MyPage';
import NotFoundPage   from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,         element: <HomePage /> },
      { path: 'detail/:id', element: <DetailPage /> },
      { path: 'login',      element: <LoginPage /> },
      { path: 'mypage',     element: <MyPage /> },
      { path: '*',          element: <NotFoundPage /> },
    ],
  },
]);

export default router;
