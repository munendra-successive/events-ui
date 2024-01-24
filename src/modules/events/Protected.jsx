import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const navigate = useNavigate();


  const isAuthenticated = localStorage.getItem("authorization")

  if (!isAuthenticated) {
    navigate('/');
    return null; 
  }

  return <>{children}</>;
};

export default Protected;
