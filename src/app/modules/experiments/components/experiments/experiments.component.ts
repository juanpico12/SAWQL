import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperimentDBService } from 'src/app/core/services/experiment-db.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { Experiment } from 'src/app/shared/models/experiment';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ExperimentsComponent implements OnInit {
  experiments : Experiment[] = [];
  public readonly EMAIL = 'email';
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,private experimentDBService : ExperimentDBService) { }

  ngOnInit(): void {
    this.form = this.createSearchExperimentsForm();

  }

  loadMore(e){
    if(e.target.scrollHeight  - (e.target.scrollTop + e.target.clientHeight) < 100)
      alert('Get more data')
   }

  onSearchExperiments(){
    console.log(this.form.get('email').value);
    this.experimentDBService.getExperiments(2,null,this.form.get('email').value)
  }

  createSearchExperimentsForm(): FormGroup {
    return this.formBuilder.group({
       [this.EMAIL]: ['', [CustomValidators.required('Mail de usuario requerido'),CustomValidators.email('Mail inválido')]],
    });
  }

}
