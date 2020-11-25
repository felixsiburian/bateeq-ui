import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    this.data = {
      id: 1,
      tierName: "Gold",
      minimumShoppingAccumulation: 1000000,
      discountPrivilege: 0,
      termAndConditions:
        "1.Status Silver member akan langsung diperoleh\n2.Status Silver member akan langsung diperoleh\n3.Status Silver member akan langsung diperoleh",
    };
  }

  cancel(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  save(event) {
    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
      })
      .catch((e) => {
        if (e.statusCode == 500) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        } else {
          this.error = e;
        }
      });
  }
  // cancelCallback(event) {
  //     this.router.navigateToRoute('view', { id: this.data.Id });
  // }

  // saveCallback(event) {
  //     this.service.update(this.data)
  //         .then(result => {
  //             this.router.navigateToRoute('view', { id: this.data.Id });
  //         })
  //         .catch(e => {
  //             this.error = e;
  //         })
  // }
}
