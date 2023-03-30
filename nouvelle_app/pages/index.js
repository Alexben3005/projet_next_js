import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/users.txt')
      .then((response) => response.text())
      .then((data) => {
        const userList = data
          .split('\n')
          .filter((line) => line.trim()) 
          .map((line) => {
            const [userEmail, userPassword] = line.trim().split(','); 
            return { email: userEmail, password: userPassword };
          });
        setUsers(userList);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        router.push(`/todolist?email=${email}`);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  };
  return (
    <div style={{ backgroundColor: "#F2F2F2", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}>
        <h1 style={{ textAlign: "center" }}>Page de connexion</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ display: "block" }}>Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}
          />
          <label htmlFor="password" style={{ display: "block" }}>Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "none", width: "100%" }}
          />
          <button type="submit" style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "#FFFFFF", border: "none", width: "100%" }}>Se connecter</button>
        </form>
      </div>
    </div>
  );
}