# IntroductionToObservables

The aim of this little demo project is to help you understand how observables work behind the scenes and understand the core mechanismes behind `.subscribe()` and `.pipe()` along with a few rxjs operators.

If you want to dig deeper into the subject, you may have a look at these resources

- https://refactoring.guru/design-patterns/observer
- https://web.archive.org/web/20230209101338/https://indepth.dev/reference/rxjs/operators
- https://rxjs.dev/guide/operators

## Step 3

Now that we hav got used to the basic principles of observables, subscribes and pipes, we are going to have a look at what happens in real life and at what could be an implementation of an observable in an application

In this step, we will create a mediator file and a few components to make them interact with each other:

> create a `user.store.ts` file and add it to the app.config.ts providers

> create a user-form.component that will help us update the current user in the app.

> create a header.component that will simply display the user information

go to the newly created components and follow the instructions

When you are ready to go to the next step, you can use the commend `git checkout step_4`

## Step 2

In this step, we change our primitive observable value to an object and listen to it to transform that object into a primitive value.
This will help us have a look at a few operators and their usefullness.

When you are ready to go to the next step, you can use the commend `git checkout step_3`

## Step 1

In order to position yourself on this state of the app you may use the command `git checkout step_1` in your favorite terminal

### Summary

In this first step, we create an observable and set it to emit up to 6 times (`.next()`).
We will have a look at what happens at runtime by:  

- adding breakpoint in the debugger  
- changing the definition of the observable itself
- subscribing to it 0 to X times etc

When you are ready to go to the next step, you can use the commend `git checkout step_2`
