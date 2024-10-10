import { Routes } from '@angular/router';
import { CadastrarTarefasComponent } from './cadastrar-tarefas/cadastrar-tarefas.component';
import { ConsultarTarefasComponent } from './consultar-tarefas/consultar-tarefas.component';
import { EditarTarefasComponent } from './editar-tarefas/editar-tarefas.component';
import { DashboardTarefasComponent } from './dashboard-tarefas/dashboard-tarefas.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { AutenticarUsuarioComponent } from './autenticar-usuario/autenticar-usuario.component';
import { AuthGuard } from './_guards/auth-guard';

export const routes: Routes = [
    {
        path : 'app/cadastrar-tarefas',
        component: CadastrarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'app/consultar-tarefas',
        component: ConsultarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'app/editar-tarefas/:id',
        component: EditarTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'app/dashboard-tarefas',
        component: DashboardTarefasComponent
    },
    {
        path : 'app/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path : 'app/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path : '', pathMatch : 'full', /* página default do projeto */
        redirectTo : '/app/autenticar-usuario'
    }
];
