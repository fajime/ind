import { Route, Routes } from 'react-router-dom';
import { Pruebas } from 'src/pages/pruebas';
import { Canvas, Docs, Home, Login, Posts, Tools, Usuarios } from '../pages';
import { PrivatedRoute } from './PrivatedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="prueba" element={<Pruebas />} />
      <Route path="canvas" element={<Canvas />} />
      <Route
        path="home"
        element={
          <PrivatedRoute>
            <Home />
          </PrivatedRoute>
        }
      >
        <Route path="canvas" element={<Canvas />} />
        <Route path="docs" element={<Docs />} />
        <Route path="tools" element={<Tools />} />
      </Route>
      <Route
        path="usuarios"
        element={
          <PrivatedRoute>
            <Usuarios />
          </PrivatedRoute>
        }
      />
      <Route
        path="posts"
        element={
          <PrivatedRoute>
            <Posts />
          </PrivatedRoute>
        }
      />
    </Routes>
  );
};
