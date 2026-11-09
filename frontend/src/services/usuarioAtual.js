
export function salvarUsuario(id) {
  localStorage.setItem('usuarioId', id);
}

export function obterUsuario() {
  return localStorage.getItem('usuarioId');
}
