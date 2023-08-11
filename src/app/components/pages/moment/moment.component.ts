import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moments';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;  //é o icon 'x'
  faEdit = faEdit;    //é o icon 'Lapis de edit'

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // pegar o id que está na url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
        .getMoment(id)
        .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluido com sucesso!");

    this.router.navigate(['/']);  //redireciona para a Home

  
  }

}
