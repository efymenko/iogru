import { TokenEntryRootException } from './token-entry-root.exception';

export class TokenEntryNotFoundException extends TokenEntryRootException {}

export class RefreshTokenIsRevoked extends TokenEntryRootException {}
