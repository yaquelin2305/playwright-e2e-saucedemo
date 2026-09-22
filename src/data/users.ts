/**
 * Usuarios de prueba que ofrece SauceDemo. Cada uno simula un comportamiento distinto.
 * La contraseña se lee desde variables de entorno (buena práctica: nada sensible en el código).
 */
export const PASSWORD = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
  performanceGlitch: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const;

export type UserKey = keyof typeof USERS;
