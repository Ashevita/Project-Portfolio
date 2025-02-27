import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Un lien de réinitialisation a été envoyé à : ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Entrez votre email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
