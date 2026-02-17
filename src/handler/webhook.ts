import {Hono} from "hono";

export const webhookApp = new Hono();

webhookApp.post("/webhook/payment_notification", async (c) => {
})
