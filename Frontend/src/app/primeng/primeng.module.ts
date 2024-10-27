import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuModule } from 'primeng/contextmenu';
import { BadgeModule } from 'primeng/badge';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';

import { AccordionModule } from 'primeng/accordion';


import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonModule,
    SidebarModule,
    MenubarModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ToastModule,
    MessagesModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    TooltipModule,
    ContextMenuModule,
    BadgeModule,
    ScrollPanelModule,
    DropdownModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    VirtualScrollerModule,
    TabViewModule,
    MenuModule,
    ProgressSpinnerModule,
    AccordionModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PrimengModule { }
