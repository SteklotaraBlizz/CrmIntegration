// container/container.ts
import { Deal } from "../models/index.js";
import { Contact } from "../models/index.js";
import { WebhookEvent } from "../models/index.js";

import { DealsService } from "../services/deal.service.js";
import { ContactsService } from "../services/contact.service.js";
import { WebhooksService } from "../services/webhook.service.js";

import { DealsController } from "../controllers/deal.controller.js";
import { ContactsController } from "../controllers/contact.controller.js";
import { WebhooksController } from "../controllers/webhook.controller.js";

/**
 * Кастомный DI контейнер для внедрения зависимостей
 */
export class Container {
  readonly Deal = Deal;
  readonly Contact = Contact;
  readonly WebhookEvent = WebhookEvent;

  private _dealsService: DealsService | undefined;
  get dealsService(): DealsService {
    if (!this._dealsService) {
      this._dealsService = new DealsService(this.Deal, this.Contact);
    }
    return this._dealsService;
  }

  private _contactsService: ContactsService | undefined;
  get contactsService(): ContactsService {
    if (!this._contactsService) {
      this._contactsService = new ContactsService(this.Contact);
    }
    return this._contactsService;
  }

  private _webhooksService: WebhooksService | undefined;
  get webhooksService(): WebhooksService {
    if (!this._webhooksService) {
      this._webhooksService = new WebhooksService(this.WebhookEvent);
    }
    return this._webhooksService;
  }

  private _dealsController: DealsController | undefined;
  get dealsController(): DealsController {
    if (!this._dealsController) {
      this._dealsController = new DealsController(this.dealsService);
    }
    return this._dealsController;
  }

  private _contactsController: ContactsController | undefined;
  get contactsController(): ContactsController {
    if (!this._contactsController) {
      this._contactsController = new ContactsController(this.contactsService);
    }
    return this._contactsController;
  }

  private _webhooksController: WebhooksController | undefined;
  get webhooksController(): WebhooksController {
    if (!this._webhooksController) {
      this._webhooksController = new WebhooksController(this.webhooksService);
    }
    return this._webhooksController;
  }
}

export const container = new Container();
