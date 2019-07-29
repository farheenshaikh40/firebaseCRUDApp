import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  formSubmitted:boolean;
  formControls = this.customerService.form.controls;
  showSuccessMsg:boolean;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.customerService.form.valid){
      if(this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerService.form.value)
        this.showSuccessMsg = true;
        setTimeout(() => this.showSuccessMsg = false, 3000);
      }else{
        this.customerService.updateCustomer(this.customerService.form.value)
      }
      // this.customerS
      this.formSubmitted = false
      this.customerService.form.reset();
      this.customerService.form.setValue({
        $key: null,
        fullName:'',
        email:'',
        mobile:'',
        location:''
      })
    }
  }

}
