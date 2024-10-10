import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastrar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-tarefas.component.html',
  styleUrl: './cadastrar-tarefas.component.css'
})
export class CadastrarTarefasComponent {

    //atributos
    categorias: any[] = [];
    mensagem: string = '';

    //método construtor (injeção de dependência)
    constructor(
      private httpClient: HttpClient
    ) {}

    //criando a estrutura do formulário
    form = new FormGroup({
      nome : new FormControl(''),
      data : new FormControl(''),
      hora : new FormControl(''),
      prioridade : new FormControl(''),
      categoriaId : new FormControl('')
    });

    //Função executada no momento em que o componente for inicializado
    ngOnInit() {
      //fazendo uma requisição GET para o endpoint de consulta de categorias
      this.httpClient.get(environment.apiTarefas + 'api/categorias')
        .subscribe({
          next: (data) => {
            this.categorias = data as any[];
          }
        });
    }

    //Função para capturar o evento de SUBMIT do formulário
    onSubmit() {
        //enviando os dados do formulário para a API
        this.httpClient.post(environment.apiTarefas + 'api/tarefas', this.form.value)
          .subscribe({ //aguardando a resposta da API
            next: (data: any) => { //capturando um objeto JSON da API
              //lendo a mensagem obtida da API
              this.mensagem = data.mensagem;
              //limpar os campos do formulário
              this.form.reset();
            },
            error: (e) => { //capturando resposta de erro
              console.log(e.error); //imprimindo a resposta obtida
            }
          })
    }
}
