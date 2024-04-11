const useRefreshToken = () => {
  // set auth

  const refresh = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/refresh', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      if (response.status === 200) {
        const res = await response.json();
        if (res) {
          console.log(res);
          setUser(res.username);
          setToken(res.accessToken);
          navigate('/dashboard');
          return;
        }
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
};
