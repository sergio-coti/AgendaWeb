import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})
export class ConsultarTarefasComponent {

  //atributos
  tarefas: any[] = []; //array de objetos JSON

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) { 
  }

  //objeto de formulário
  form = new FormGroup({
    dataMin : new FormControl(''),
    dataMax : new FormControl(''),
  });

  //função para capturar o SUBMIT do formulário
  onSubmit(){

    //pegando os valores dos campos do formulário
    let dataMin = this.form.value.dataMin;
    let dataMax = this.form.value.dataMax;

    //fazendo a requisição para o endpoint de consulta de tarefas
    this.httpClient.get(environment.apiTarefas + "api/tarefas/" + dataMin + "/" + dataMax)
      .subscribe({ //aguardando o retorno da API
        next: (data) => { //obtendo retorno de sucesso
          this.tarefas = data as any[]; //armazenando os dados obtidos da API
        },  
        error: (e) => { //obtendo retorno de erro
          console.log(e.error); //imprimindo no console
        }
      });
  }

  //função para capturar o evento de exclusão das tarefas
  onDelete(id: string) {

    //verificando se o usuário deseja excluir a tarefa
    if(confirm('Deseja realmente excluir a tarefa selecionada?')) {
      
      //enviando uma requisição para o endpoint de exclusão da api
      this.httpClient.delete(environment.apiTarefas + "api/tarefas/" + id)
        .subscribe({ //aguardando o retorno da API
          next: (data: any) => { //capturar resposta de sucesso
            alert(data.mensagem); //exibindo a mensagem obtida da API
            this.onSubmit(); //chamando a função de consulta novamente
          },
          error: (e) => { //capturar resposta de erro
            console.log(e.error); //imprimir no console
          }
        })
    }
  }


}
