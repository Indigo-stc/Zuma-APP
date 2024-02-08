import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  menuItems?: any[];
  menuPermitido?: any[];


  //creacion de objeto de la clase persona;
  userC: any;

  //variables don de voy recibir el storage para el login
  id_user?: any;
  nombreUser?: any;

  isUserAdmin: boolean = false;
  isUserProf: boolean = false;
  isUserEstud: boolean = false;

  rolUser: any;


  constructor(private router: Router, private httpc: HttpClient) {
    console.log(this.menuItems);
  }



  ngOnInit(): void {
    this.getUser();
    this.rolUser = localStorage.getItem('rol');
  }

  public getUser() {
    // this.id_user = localStorage.getItem('id_cliente');
    this.rolUser = localStorage.getItem('rol');
    if (this.rolUser != null) {
      switch (this.rolUser) {
        case 'ADMIN':
          this.isUserAdmin = true;
          this.isUserProf = false;
          this.isUserEstud = false;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Profesores", url: "profesor", icono: 'far fa-user' },
              { titulo: "Materias", url: "materia", icono: 'fa fa-book' },
              { titulo: "Matrículas", url: "matricula", icono: 'far fa-file-alt' },
              { titulo: "Cursos", url: "curso", icono: 'fas fa-building' },
              { titulo: "Estudiantes", url: "estudiante", icono: 'fas fa-graduation-cap' },
              { titulo: "Periodo", url: "periodo", icono: 'far fa-calendar-alt' },
              { titulo: "Notas", url: "notas-estudiante", icono: 'far fa-sticky-note' },
              { titulo: "Calificacion", url: "calificacion", icono: 'far fa-clipboard-list' } 
            ]
          }]
          break;
        case 'ESTUDIANTE':
          this.isUserAdmin = false;
          this.isUserProf = false;
          this.isUserEstud = true;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Notas", url: "notas-estudiante", icono: 'far fa-sticky-note' } 

            ]
          }]
          break;
        case 'PROFESOR':
          this.isUserAdmin = false;
          this.isUserProf = true;
          this.isUserEstud = false;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Materias", url: "materia", icono: 'fa fa-book' },
              { titulo: "Estudiantes", url: "estudiante", icono: 'fas fa-graduation-cap' },
              { titulo: "Calificaciones", url: "calificacion", icono: 'fas fa-graduation-cap'}
            ]
          }]
          break;
      }
    } else {
    }
  }

  public logOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
