'use client';
import Head from "next/head";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Login.module.css';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		
		if (!token) {
			router.push('/login');
		}else{
			router.push('/dashboard');
		}
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try{
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if(response.ok){
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				router.push('/dashboard');
			}else{
				setError(data.message || 'Login failed');
			}
		}catch (err){
			setError('An error occurred during login');
			console.error('Login error:', err);
		}finally{
			setIsLoading(false); 
		}
	};

	return (
		<>
			<Head>
				<title>Login | Voxby</title>
				<meta name="description" content="Login page for Voxby" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.loginContainer}>
			<div className={`${styles.card} ${styles.fadeIn}`}>
				<h2 className={styles.title}>Welcome Back</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}
					<div className={styles.inputGroup}>
						<label htmlFor="email" className={styles.label}>Email</label>
						<input id="email" type="email" className={styles.input} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} required />
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password" className={styles.label}>Password</label>
						<input id="password" type="password" className={styles.input} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required />
					</div>
					<button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
				</form>
			</div>
			</div>
		</>
	);
}