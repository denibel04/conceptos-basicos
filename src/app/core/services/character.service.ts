import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, findIndex } from 'rxjs';
import { Characters } from '../interface/characters';

@Injectable({
  providedIn: 'root'
})



export class CharacterService {

  id:number = 0;

  private _characters:BehaviorSubject<Characters[]> = new BehaviorSubject<Characters[]>([]);
  public characters$:Observable<Characters[]> = this._characters.asObservable();

  constructor() { }

  public getAll():Observable<Characters[]> {
    return new Observable(observer => {
      var _characters = [
        {id: 1, name:"Naruto", surname:"Uzumaki", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Etiam tempor orci eu lobortis. Amet volutpat consequat mauris nunc congue nisi. Rhoncus dolor purus non enim praesent elementum facilisis leo.", source:"Naruto Shippuden", sourceType: "Anime", sourceChapters:582, characterPhoto: new URL("https://i.pinimg.com/1200x/ee/61/37/ee61374e60f036d0d605c37b3a7bee8a.jpg")},
        {id: 2, name:"Geralt", surname:"De Rivia", source:"The Witcher", sourceType: "TV Series", sourceChapters:31, characterPhoto: new URL("https://acortar.link/qjSoZ4")},
        {id: 3, name:"Coco", surname:"", source:"Witch Hat Atelier", sourceType: "Manga", sourceChapters:81, characterPhoto: new URL("https://ramenparados.com/wp-content/uploads/2021/05/1622290109162-scaled.jpg")},
        {id: 4, name:"Scott", surname:"Pilgrim", source:"Scott Pilgrim vs the world", sourceType: "Comic", sourceChapters:6, characterPhoto: new URL("https://i.pinimg.com/474x/e7/5f/20/e75f20862542dca6a5c254f0f48975cd.jpg")},
      ]
      this.id=3;
      observer.next(_characters);
      this._characters.next(_characters);
      observer.complete();
    })
  }

  public updateCharacter(character:Characters):Observable<Characters[]> {
    return new Observable(observer => {
      var _characters = [...this._characters.value];
      var index = _characters.findIndex( chara => chara.id==character.id);
      if (index!=-1) {
        _characters[index] = character;
        this._characters.next(_characters);
        observer.next(_characters);
      } else {
        console.error("Character not found");
      }
      observer.complete();
    })
  }

  public deleteCharacter(character:Characters):Observable<Characters> {
    return new Observable(observer => {
      var _characters = [...this._characters.value];
      var index = _characters.findIndex(c=>c.id==character.id);
      if (index<0){
        console.error("Character not found")
      } else {
        _characters = [..._characters.slice(0,index),..._characters.slice(index+1)];
        this._characters.next(_characters);
        observer.next(character);
      }
      observer.complete();
    })
  }

  public addCharacter(character:Characters):Observable<Characters> {
    return new Observable(observer => {
      var _characters = [...this._characters.value];
      character.id = ++this.id;
      _characters.push(character);
      observer.next(character);
      this._characters.next(_characters);
      observer.complete();
    })
  }
}
