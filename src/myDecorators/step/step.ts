import test from '@playwright/test'




export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMethodDecoratorContext

    ) {
        return function replacementFunction(...args: any) {
            const name =
                //@ts-ignore
                stepName || `${this.constructor.name + "." + (context.name as string)}`
            return test.step(name, async () => {
                //@ts-ignore
                return await target.call(this, ...args)
            })

        }
    }
}