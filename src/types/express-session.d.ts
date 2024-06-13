export interface LoggedOutSessionData {
  email?: string;
  needsInclusionconnectWelcomePage?: boolean;
  interactionId?: string;
  mustReturnOneOrganizationInPayload?: boolean;
  referrerPath?: string;
}

export type AmrValue =
  // Standard values are described here https://datatracker.ietf.org/doc/html/rfc8176#section-2
  | "pwd"
  | "totp"
  | "pop"
  | "mfa"
  // "email-link" is described as "mail" here https://docs.partenaires.franceconnect.gouv.fr/fs/fs-technique/fs-technique-amr/
  | "email-link"
  // "email-otp" and "uv" is used in MonComptePro for internal usage
  | "email-otp"
  | "uv";

export interface AuthenticatedSessionData {
  user: User;
  amr: AmrValue[];
}

declare module "express-session" {
  export interface SessionData extends LoggedOutSessionData {
    user?: User;
    temporaryEncryptedTotpKey?: string;
    amr?: AmrValue[];
  }
}
