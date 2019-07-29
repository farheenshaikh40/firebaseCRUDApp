import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customersArray= [];
  deleteMsg:boolean;
  // searchText:string ;
  searchText:string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(list => {
        console.log(list);
        this.customersArray = list.map(item => {
          console.log('item', item)
          console.log('item.payload.val', item.payload.val())
          return {
            $key:item.key,
            ...item.payload.val()
          }
        })
      });
  }

  onDelete($key){
    if(confirm('Do you really want to delete this record?')){
      this.customerService.deleteCustomer($key);
      this.deleteMsg = true;
      setTimeout(() => this.deleteMsg = false, 3000)
    }
  }

  filterCustomer(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
