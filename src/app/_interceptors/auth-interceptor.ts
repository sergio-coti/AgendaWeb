import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verifica se a URL corresponde aos endpoints desejados
    const isApiEndpoint =
      req.url.includes('/api/categorias') || req.url.includes('/api/tarefas');

    if (isApiEndpoint) {
      // Obter os dados do localStorage
      const userData = localStorage.getItem('agendaapp');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          const token = parsedData.token;

          // Clonar a requisição e adicionar o cabeçalho Authorization
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });

          // Continuar com a requisição clonada
          return next.handle(clonedRequest);
        } catch (e) {
          console.error('Erro ao analisar os dados do usuário:', e);
          return next.handle(req); // Continua com a requisição original em caso de erro
        }
      }
    }

    // Se não for um dos endpoints desejados, prossegue com a requisição original
    return next.handle(req);
  }
}
