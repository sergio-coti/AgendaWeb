import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //atributos
  mensagemErro: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {}

  //criando a estrutura do formulário
  form = new FormGroup({
    email : new FormControl(''),
    senha : new FormControl('')
  })

  //função para processar o SUBMIT do formulário
  onSubmit() {
    //fazendo a requisição para a API
    this.httpClient.post(environment.apiUsuario + "api/usuarios/autenticar", this.form.value)
      .subscribe({
        next: (data: any) => { //autenticação realizada com sucesso!

          //salvar as informações do usuário autenticado em uma local storage
          localStorage.setItem('agendaapp', JSON.stringify(data));

          //redirecionar para a página de consulta de tarefas da agenda
          location.href = '/app/consultar-tarefas';

        },
        error: (e) => {
          if (e.error.errors) {
            const mensagens = [];
            for (const campo in e.error.errors) {
              if (e.error.errors.hasOwnProperty(campo)) {
                mensagens.push(...e.error.errors[campo]);
              }
            }
            this.mensagemErro = mensagens.join(' ');
          } else if (e.error.mensagem) {
            this.mensagemErro = e.error.mensagem;
          } else {
            this.mensagemErro = 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.';
          }
          console.log(e.error);
        }
      })
  }
}
