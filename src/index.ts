import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { trimTrailingSlash } from "hono/trailing-slash";
import { env } from "@/config/env.js";
import {
	responseHTTPException,
	responseInternalServerError,
} from "@/handler/response.js";
import { todoApp } from "@/handler/todoHandler.js";
import { webhookApp } from "@/handler/webhook.js";

const app = new Hono();

app.use(logger());
if (env.NODE_ENV === "local") {
	app.use(prettyJSON({ force: true }));
}
app.use(trimTrailingSlash());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
app.route("/", todoApp);
app.route("/", webhookApp);

app.onError((err, c) => {
	console.error(err);

	if (err instanceof HTTPException) {
		return responseHTTPException(c, err);
	}

	return responseInternalServerError(c, err.message);
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
