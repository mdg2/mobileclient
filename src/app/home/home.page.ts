import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController, private actionSheet: ActionSheetController){}

  async presentAlert() {
    const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Post your message',
        animated:true,
        inputs: [{
          placeholder: 'Name',
          id: 'name'
        },
        {
          name: 'Message',
          id: 'message',
          type: 'text',
          placeholder: 'Your message'
        }
      ],
      buttons:[
        {
          text: 'Submit',
          role: 'cancel',
          handler: () => {
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            const node = document.createElement("div");
            node.class = 'ion-padding';
            let text = document.createTextNode(name + ": " + message);
            node.appendChild(text);
            let cardContent = document.createElement("ion-card-content");
            cardContent.appendChild(node);
            let card = document.createElement("ion-card");
            card.appendChild(cardContent);
            document.getElementById("content").appendChild(card);
          }
        }
      ]
    });

    await alert.present();
  }


}
