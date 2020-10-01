import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();
  
  private appareils = [
    {
      id: 1,
      name: "Television",
      status: "allume"
    },
    {
      id: 2,
      name: "Ordinateur",
      status: "allume"
    },
    {
      id: 3,
      name: "Machine a laver",
      status: "eteint"
    }
  ];

  constructor(private httpClient: HttpClient) {}

  /*Mise à jour du contenu du parametre appareils*/
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allume';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'eteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allume';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'eteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: "",
      status: ""
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  };

  saveAppareilToServer() {
    this.httpClient
      .put("https://http-client-demo-c26f0.firebaseio.com/appareils.json", this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement OK');
        },
        (error) => {
          console.log('Erreur de sauvegarde' + error);
        }
      );
  }

  getAppareilFromServer() {
    this.httpClient
      .get<any[]>("https://http-client-demo-c26f0.firebaseio.com/appareils.json")
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur de chargement' + error);
        }
      );
  }

}
