export class Role {
    static readonly ADMIN  = new Role(['Admin']);
    static readonly MODERATOR = new Role(['Admin', 'Moderator']);
    static readonly USER  = new Role(['Admin', 'Moderator', 'User']);
    static readonly NO_ROLE  = new Role([], false);
    static readonly ONLY_ANONYMOUS = new Role([], false, true);
  
    private constructor(public readonly roles: string[], public readonly hasRoles: boolean = true, public readonly onlyAnonymous = false) {
    }
  }