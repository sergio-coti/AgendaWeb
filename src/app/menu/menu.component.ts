import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //Função executada no momento em que o componente for inicializado
  ngOnInit() {

    //buscar os dados do usuário autenticado na local storage
    var data = localStorage.getItem('agendaapp');

    //verificar se algum usuário foi encontrado
    if(data != null) {
      this.isAuthenticated = true;
      this.nomeUsuario = JSON.parse(data).nome;
      this.emailUsuario = JSON.parse(data).email;
    }
  }

  //função para logout do usuário
  logout() {

    if(confirm('Deseja realmente sair do sistema?')) {
      localStorage.removeItem('agendaapp'); //apagando os dados da local storage
      location.href = '/'; //redirecionar para o raiz do projeto
    }
  }

}
