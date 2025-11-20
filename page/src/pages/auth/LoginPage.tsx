import React, { useState, FormEvent, ChangeEvent } from 'react';
import './LoginPage.css';

interface FormErrors {
  email?: string;
  password?: string;
}

interface FormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de email
  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'El correo electrónico es requerido';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'El correo electrónico no es válido';
    }
    return undefined;
  };

  // Validación de contraseña
  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return undefined;
  };

  // Validar formulario completo
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Manejar cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name as keyof typeof touched]) {
      const error = name === 'email'
        ? validateEmail(value)
        : validatePassword(value);

      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Manejar cuando el usuario sale de un campo
  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    const error = field === 'email'
      ? validateEmail(formData[field])
      : validatePassword(formData[field]);

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí irá la lógica de autenticación
      console.log('Iniciando sesión con:', formData);

      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Implementar la lógica de autenticación real
      alert('Login exitoso! (Implementar lógica real de autenticación)');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrors({
        email: 'Credenciales inválidas. Por favor, verifica tus datos.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar navegación a recuperar contraseña
  const handleForgotPassword = () => {
    // TODO: Implementar navegación a página de recuperar contraseña
    console.log('Navegar a recuperar contraseña');
    alert('Redirigir a recuperar contraseña (Implementar navegación)');
  };

  // Manejar navegación a registro
  const handleRegister = () => {
    // TODO: Implementar navegación a página de registro
    console.log('Navegar a registro');
    alert('Redirigir a página de registro (Implementar navegación)');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Iniciar Sesión</h1>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Campo de Email */}
          <div className="form-group">
            <label htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              className={errors.email && touched.email ? 'input-error' : ''}
              placeholder="tu@email.com"
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.email && touched.email && (
              <span className="error-message" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div className="form-group">
            <label htmlFor="password">
              Contraseña
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={errors.password && touched.password ? 'input-error' : ''}
                placeholder="••••••••"
                aria-invalid={errors.password && touched.password ? 'true' : 'false'}
                aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                disabled={isSubmitting}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="error-message" id="password-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Enlace de recuperar contraseña */}
          <div className="forgot-password-wrapper">
            <button
              type="button"
              className="link-button"
              onClick={handleForgotPassword}
              disabled={isSubmitting}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Sección de registro */}
        <div className="register-section">
          <p>¿No tienes una cuenta?</p>
          <button
            type="button"
            className="register-button"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};
