import { Router, urlencoded } from "express";
import nocache from "nocache";
import Provider from "oidc-provider";
import {
  interactionEndControllerFactory,
  interactionStartControllerFactory,
} from "../controllers/interaction";
import { checkUserSignInRequirementsMiddleware } from "../middlewares/user";

export const interactionRouter = (oidcProvider: Provider) => {
  const interactionRouter = Router();

  interactionRouter.use(nocache());

  interactionRouter.use(urlencoded({ extended: false }));

  interactionRouter.get(
    "/:grant",
    interactionStartControllerFactory(oidcProvider),
  );
  interactionRouter.get(
    "/:grant/login",
    checkUserSignInRequirementsMiddleware,
    interactionEndControllerFactory(oidcProvider),
  );

  return interactionRouter;
};

export default interactionRouter;
