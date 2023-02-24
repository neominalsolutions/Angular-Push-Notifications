import { Component } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { NewsletterService } from "./services/newsletter.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  sub: PushSubscription;
  readonly VAPID_PUBLIC_KEY =
    "BMloIXro0C20iV6Nlo90bBPKFv0RF9xuy-QOgOPLHZbUO8FRTLseMljQMxlZCjnZvTpbq-dEYbL3aqsJge5JbH0";

  constructor(
    private swPush: SwPush, // push service
    private newsletterService: NewsletterService
  ) {}

  subscribeToNotifications() {
    // server public key
    // push server'a subscribe ol (hangi uygulamadan web push server'ın client ile iletişime geçmesi için ortak bir shared key yapısı)
    // web pushlarda public keyler sunucu tarafındaki private bir anahtar üzerinden üretilir.
    // doğruluk kontrolü için public key header
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })

      .then((sub) => {
        this.sub = sub;
        console.log("subscribtion", sub);
        // observable olarak subscribe olup pushları dinliyoruz.
        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log("Sent push subscription object to server."),
          (err) =>
            console.log(
              "Could not send subscription object to server, reason: ",
              err
            )
        );
      })
      .catch((err) =>
        console.error("Could not subscribe to notifications", err)
      );
  }

  sendNewsletter() {
    this.newsletterService.send().subscribe((res) => {
      console.log("res", res);
    });
    // angular uygulamasından web push atuyoruz
  }
}
