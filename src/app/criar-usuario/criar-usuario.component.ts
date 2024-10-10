import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ) {}

  //estrutura do formulário
  form = new FormGroup({  
    nome : new FormControl(''),
    email : new FormControl(''),
    senha : new FormControl('')
  });

  //função para capturar o SUBMIT do formulário
  onSubmit() {
    
    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //fazendo uma requisição para o serviço de criação de usuários da API
    this.httpClient.post(environment.apiUsuario + "api/usuarios/criar", this.form.value)
      .subscribe({ //capturando a resposta da API
        next: (data: any) => { //recebendo resposta de sucesso da API
          this.mensagemSucesso = `Parabéns ${data.nome}, sua conta de usuário foi criada com sucesso.`;
          this.form.reset(); //limpar o formulário
        },
        error: (e) => { //recebendo resposta de erro da API
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
      });
  }
}
