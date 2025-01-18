declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Cypress {
      dayjs: typeof import('dayjs');
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable {
      getByTestId(value: string): Chainable<JQuery<Node>>;
    }
  }
}

export {};
