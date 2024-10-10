import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // Obter os dados do localStorage
    const userData = localStorage.getItem('agendaapp');
    
    if (!userData) {
      // Redirecionar para a página de login se não houver dados no localStorage
      this.router.navigate(['/app/autenticar-usuario']);
      return false;
    }

    try {
      // Converter os dados do localStorage em um objeto JSON
      const parsedData = JSON.parse(userData);

      // Verificar se a data de expiração ainda é válida
      const expirationDate = new Date(parsedData.dataHoraExpiracao);
      const currentDate = new Date();

      if (expirationDate > currentDate) {
        // Se a data de expiração for maior que a data atual, permitir acesso
        return true;
      } else {
        // Caso contrário, redirecionar para a página de login
        this.router.navigate(['/app/autenticar-usuario']);
        return false;
      }
    } catch (e) {
      // Se houver algum erro ao parsear os dados, redirecionar para o login
      console.error('Erro ao analisar os dados do usuário:', e);
      this.router.navigate(['/app/autenticar-usuario']);
      return false;
    }
  }
}