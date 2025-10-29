'use client';
import { useEffect, useState } from 'react';
import styles from './perfil.module.css';
import { IonIcon } from '@ionic/react';
import { personCircleOutline, createOutline } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function Perfil() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [nome, setNome] = useState('[Sem nome]');
  const [email, setEmail] = useState('[Sem email]');
  const [senha, setSenha] = useState('********');
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [novoValor, setNovoValor] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('usuario_id');
    const nomeLS = localStorage.getItem('usuario_nome');
    const emailLS = localStorage.getItem('usuario_email');
    setUsuarioId(id);
    setNome(nomeLS || '[Sem nome]');
    setEmail(emailLS || '[Sem email]');
  }, []);

  const handleEditar = (campo) => {
    setEditandoCampo(campo);
    if (campo === 'senha') setNovoValor('');
    else setNovoValor(campo === 'nome' ? nome : email);
  };

  const handleSalvar = async () => {
    if (!novoValor.trim()) return alert('Preencha o campo.');

    const dados = {
      nome: editandoCampo === 'nome' ? novoValor : nome,
      email: editandoCampo === 'email' ? novoValor : email,
      senha: editandoCampo === 'senha' ? novoValor : undefined,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resultado = await res.json();

      if (res.ok) {
        alert(`${editandoCampo} atualizado com sucesso!`);
        if (editandoCampo === 'nome') {
          setNome(novoValor);
          localStorage.setItem('usuario_nome', novoValor);
        } else if (editandoCampo === 'email') {
          setEmail(novoValor);
          localStorage.setItem('usuario_email', novoValor);
        } else {
          setSenha('********');
        }
        setEditandoCampo(null);
      } else {
        alert('Erro: ' + (resultado.mensagem || resultado.erro));
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleExcluir = async () => {
    if (!confirm('Tem certeza que deseja excluir sua conta?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Conta excluída com sucesso!');
        localStorage.clear();
        window.location.href = '/entrar';
      } else {
        const json = await res.json();
        alert('Erro: ' + (json.mensagem || json.erro));
      }
    } catch {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const router = useRouter();
    const [showBox, setShowBox] = useState(false);
  

  return (
    <div>
    <div className={styles.headerContainer}>
      <header className={styles.headerMobile}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
          </button>
          <span className={styles.headerTitle}>Perfil</span>
        </div>
      </header>

      {/* Header Desktop */}
      <div className={styles.headerDesktop}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <Image src="/symbols/nav-arrow-left.svg" alt="Voltar" width={20} height={20} />
        </button>
        <h1 className={styles.headerTitle}>Perfil</h1>
      </div>
    </div>

    <div className={styles.profileContainer}>
      <div className={styles.profilePicture}>
        <IonIcon icon={personCircleOutline} className={styles.userIcon} />
        <IonIcon icon={createOutline} className={styles.editPhotoIcon} />
      </div>

      <div className={styles.profileInfo}>
        {/* Nome */}
        <p>
          <strong>Nome:</strong>{' '}
          {editandoCampo === 'nome' ? (
            <>
              <input
                type="text"
                value={novoValor}
                onChange={(e) => setNovoValor(e.target.value)}
                className={styles.inputEditar}
              />
              <button onClick={handleSalvar} className={styles.saveButton}>
                ✔️
              </button>
            </>
          ) : (
            <>
              <span>{nome}</span>
              <IonIcon
                icon={createOutline}
                onClick={() => handleEditar('nome')}
                className={styles.editIcon}
              />
            </>
          )}
        </p>

        {/* Email */}
        <p>
          <strong>Email:</strong>{' '}
          {editandoCampo === 'email' ? (
            <>
              <input
                type="text"
                value={novoValor}
                onChange={(e) => setNovoValor(e.target.value)}
                className={styles.inputEditar}
              />
              <button onClick={handleSalvar} className={styles.saveButton}>
                ✔️
              </button>
            </>
          ) : (
            <>
              <span>{email}</span>
              <IonIcon
                icon={createOutline}
                onClick={() => handleEditar('email')}
                className={styles.editIcon}
              />
            </>
          )}
        </p>

        {/* Senha */}
        <p>
          <strong>Senha:</strong>{' '}
          {editandoCampo === 'senha' ? (
            <>
              <input
                type="password"
                value={novoValor}
                onChange={(e) => setNovoValor(e.target.value)}
                className={styles.inputEditar}
                placeholder="Nova senha"
              />
              <button onClick={handleSalvar} className={styles.saveButton}>
                ✔️
              </button>
            </>
          ) : (
            <>
              <span>{senha}</span>
              <IonIcon
                icon={createOutline}
                onClick={() => handleEditar('senha')}
                className={styles.editIcon}
              />
            </>
          )}
        </p>

        <button onClick={handleExcluir} className={styles.deleteBtn}>
          <ion-icon name="trash-outline" className={styles.deleteicon}></ion-icon>  
          <strong>EXCLUIR CONTA</strong>
        </button>
      </div>
    </div>
    </div>
  );
}
