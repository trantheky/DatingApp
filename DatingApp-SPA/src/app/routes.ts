import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolve } from './_resolvers/member-detail.resolver';
import { MemberListResolve } from './_resolvers/member-list.resolver';
import { MemberEditResolve } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolve} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolve} },
            { path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolve}, 
                                   canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent }            
        ]
    },    
    { path: '**', redirectTo: '', pathMatch: 'full' }
]