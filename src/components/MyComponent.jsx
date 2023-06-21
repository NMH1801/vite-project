import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, logout } from '../redux/authSlice';
import { fetchDataAsync } from '../redux/fetchDataSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const products = useSelector((state) => state.fetchData.products);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const credentials = { username, password };
    dispatch(loginAsync(credentials));
  };

  const handleFetchData = () => {
    dispatch(fetchDataAsync());
  };

  const handleLogout = () => {
    dispatch(logout());
    // Xử lý đăng xuất (có thể gọi API để thông báo server về việc đăng xuất)
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Đăng xuất</button>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <p>Không có sản phẩm.</p>
          )}
          <button onClick={handleFetchData}>Lấy dữ liệu</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
