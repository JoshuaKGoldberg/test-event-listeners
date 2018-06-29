export interface IEventListenerRegister<
    TEventName extends string = string,
    TListener extends Function = Function,
> {
    addEventListener: (eventName: TEventName, callback: TListener) => void;
    eventListeners: Map<TEventName, TListener[]>;
    fireEvent: (eventName: TEventName, ...args: any[]) => void;
}

export const createRegister = <
    TEventName extends string = string,
    TListener extends Function = Function,
>(): IEventListenerRegister<TEventName, TListener> => {
    const eventListeners = new Map<TEventName, TListener[]>();

    const addEventListener = (eventName: TEventName, callback: TListener): void => {
        const events = eventListeners.get(eventName);

        if (events === undefined) {
            eventListeners.set(eventName, [callback]);
        } else {
            events.push(callback);
        }
    };

    const fireEvent = (eventName: TEventName, ...args: any[]): void => {
        const events = eventListeners.get(eventName);

        if (events !== undefined) {
            for (const event of events) {
                event(...args);
            }
        }
    };

    return { addEventListener, eventListeners, fireEvent };
};
