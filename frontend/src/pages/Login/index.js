import React, { useState } from 'react';
import api from '../../services/api';

export default function Login() {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
     event.preventDefault();
  
     const response = await api.post('/sessions', { email });
  
     const { _id } = response.data;
  
     localStorage.setItem('user', _id);
     }

    return (
        <> 
        <p>
          texto <strong>texto</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email*">E-MAIL *</label>
          <input 
          type="email"
          id="email" 
          placeholder="Seu melhor e-mail" 
          value={email}
          onChange={event => setEmail(event.target.value)} 
          />

          <button className="btn" type="submit">Entrar</button>
          </form>
          </>
    )
}