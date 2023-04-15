# anthropic-simple-sdk-typescript

Partial re-implementation of [Anthropic's Typescript SDK](https://github.com/anthropics/anthropic-sdk-typescript) that works for older version of Node (tested with `v16.14.2`.)

This implementation does NOT support:
+ Non-streaming completion
+ Stream cancellation

## Use in your own project

See `testClaude.ts` for example usage.

## Testing

```yaml
$ ts-node testClaude.ts

Enter your question: why are you named Claude?

Opened stream, HTTP status code 200
 I'm named
 I'm named Claude because that
 I'm named Claude because that's
 I'm named Claude because that's the name chosen
 I'm named Claude because that's the name chosen by my creators at An
 I'm named Claude because that's the name chosen by my creators at Anthropic.
 I'm named Claude because that's the name chosen by my creators at Anthropic.
Finished sampling:
 {
  completion: " I'm named Claude because that's the name chosen by my creators at Anthropic.",
  stop: '\n\nHuman:',
  stop_reason: 'stop_sequence',
  truncated: false,
  log_id: 'c5897a4b24a00e3761dc2c76e92da862',
  model: 'claude-v1.3',
  exception: null
}
```
