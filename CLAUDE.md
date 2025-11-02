# Claude Code Standards

## Commit Messages

- **One line only** - No multi-line commit messages
- **No bullet points** - Single sentence describing what we're doing
- **No attribution** - Don't mention tools, frameworks, or technical details
- **Focus on the goal** - Describe what we're trying to accomplish, not implementation details

### Good Examples

```
refactor(config): restructure project into npm workspaces
fix(lint): resolve ESLint parsing errors for Astro files
chore(deps): update dependencies to latest versions
```

### Bad Examples

```
refactor(config): restructure project into npm workspaces monorepo

- Migrate to npm workspaces with frontend/ and studio/ separation
- Isolate React to studio workspace
```

## Scope Requirements

Scope is mandatory. Allowed scopes:

- `config` - Configuration changes
- `deps` - Dependency updates
- `sanity` - Sanity CMS changes
- `components` - Component changes
- `pages` - Page changes
- `lib` - Library/utility changes
- `tests` - Test changes
- `docs` - Documentation changes
